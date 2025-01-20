const jwt = require('jsonwebtoken');
const User = require('../model/userSchema');

const authenticate = async (req, res, next) => {
  try {
    // Log request details
    console.log('Request received for authentication');
    
    // Ensure the token is present in cookies
    const token = req.cookies.jwtoken;
    console.log('Token received from cookies:', token);

    if (!token) {
      console.log('No token found in cookies');
      return res.status(400).json({ error: 'Unauthorized: No token provided' });
    }

    // Verify the token
    let verifyToken;
    try {
      verifyToken = jwt.verify(token, process.env.SECRET_KEY);
      console.log('Token successfully verified:', verifyToken);
    } catch (err) {
      console.log('Error verifying token:', err);
      return res.status(400).json({ error: 'Unauthorized: Invalid token' });
    }

    // Ensure the user exists and the token is valid
    const rootUser = await User.findOne({ _id: verifyToken._id, "tokens.token": token });
    console.log('User found in database:', rootUser);

    if (!rootUser) {
      console.log('User not found or token mismatch');
      return res.status(400).json({ error: 'Unauthorized: User not found' });
    }

    // Attach user info and token to the request object
    req.token = token;
    req.rootUser = rootUser;
    req.userID = rootUser._id;

    console.log('Authentication successful, proceeding to next middleware');
    next();
  } catch (err) {
    console.log('Error in authentication middleware:', err);
    // Handle other errors and token verification failures
    if (err.name === 'JsonWebTokenError') {
      return res.status(400).json({ error: 'Unauthorized: Invalid token' });
    }
    return res.status(400).json({ error: 'Unauthorized: Token verification failed' });
  }
}

module.exports = authenticate;
