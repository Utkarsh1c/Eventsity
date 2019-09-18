const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
    const authHeader = req.get('Authorization');
    if (!authHeader) {
        const error = new Error('Not authenticated.');
        error.statusCode = 401;
        throw error;
    }
    const token = authHeader.split(' ')[1];
    let decodedToken;
    try {
        decodedToken = jwt.verify(token, 'somesupersecretsecret');
    } 
    catch (err) {
        err = new Error('Not authenticated.');
        err.statusCode = 401;
        throw err;
        // err.statusCode = 500;
        // throw err;
    }
    // if(!decodedToken) {
    // }
    req.userId = decodedToken.userId;
    next();
};

