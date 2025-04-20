

const authMiddleware = (req, res, next) => {
    try {

        const accessToken = req.cookies['access-token'];

        if (!accessToken) {
            return res.status(401).json({
                success: false,
                message: 'Authentication failed: No access token provided'
            });
        }

        const decoded = verifyToken(accessToken);

        req.user = decoded;

        next();
    } catch (error) {
        console.error('Authentication error:', error);
        return res.status(401).json({
            success: false,
            message: 'Authentication failed: Invalid token'
        });
    }
};

// Example token verification function (using jsonwebtoken)
const verifyToken = (token) => {
    const jwt = require('jsonwebtoken');
    return jwt.verify(token, process.env.JWT_SECRET);
};

module.exports = authMiddleware;