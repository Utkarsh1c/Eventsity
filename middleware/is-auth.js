//requiring jason web token module
const jwt = require('jsonwebtoken');

//requiring user model
const User = require('../models/user');

module.exports = (req, res, next) => {
    const authHeader = req.get('Authorization');
    //check for presence of authheader received from client
    if (!authHeader) {
        const error = new Error('Not authenticated.');
        error.statusCode = 401;
        throw error;
    }
    
    //deriving token from bearer token
    const token = authHeader.split(' ')[1];

    let decodedToken;
    //verifying integrity of token
    try {
        decodedToken = jwt.verify(token, 'somesupersecretsecret');
    } 
    catch (err) {
        err = new Error('Not authenticated.');
        err.statusCode = 401;
        throw err;
    }

    //extracting user name and email from token
    req.userId = decodedToken.userId;
    req.email = decodedToken.email;

    //for logoutFromAllUser method
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
    next();
};

