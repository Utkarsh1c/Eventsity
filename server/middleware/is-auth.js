const jwt = require('jsonwebtoken');
const User = require('../models/user');

module.exports = (req, res, next) => {
    const authHeader = req.get('Authorization');
    console.log(authHeader);
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
    req.email = decodedToken.email;
    User.findByPk(req.userId)
        .then(user => {
            if (!user.isLoggedIn) {
                const error = new Error('Not authenticated.');
                error.statusCode = 401;
                throw error;
            }
        })
        .catch(err => {
            if (!err.statusCode) {
                err.statusCode = 500;
            }
            next(err);
        })
    console.log(req.userId, '.........................................................');
    next();
};

