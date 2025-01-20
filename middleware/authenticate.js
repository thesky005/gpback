const jwt = require('jsonwebtoken');
const User = require('../model/userSchema');

const authenticate = async (req, res, next) => {
    try {
        // Ensure the token is present in cookies
        const token = req.cookies.jwtoken;

        if (!token) {
            return res.status(400).send('Unauthorized: No token provided');
        }

        // Verify the token
        const verifyToken = jwt.verify(token, process.env.SECRET_KEY);

        // Ensure the user exists and the token is valid
        const rootUser = await User.findOne({ _id: verifyToken._id, "tokens.token": token });

        if (!rootUser) {
            return res.status(400).send('Unauthorized: User not found');
        }

        // Attach user info and token to the request object
        req.token = token;
        req.rootUser = rootUser;
        req.userID = rootUser._id;

        next();
    } catch (err) {
        console.log(err);
        // Handle token verification errors and other potential issues
        if (err.name === 'JsonWebTokenError') {
            return res.status(400).send('Unauthorized: Invalid token');
        }
        return res.status(400).send('Unauthorized: Token verification failed');
    }
}

module.exports = authenticate;
