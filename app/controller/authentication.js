const jwt = require('jsonwebtoken');
const User = require('../model/user.modal');

function verifyToken(req, res, next) {
    const token = req.headers['x-access-token'];

    if(!token) return res.status(403).send({auth: false, message: 'no token provided'})

    jwt.verify(token, 'asdawsd', function(err, decoded) {
        if(err) {
            return res.status(403).send({auth: false, message: 'Failed to authenticate  token'})
        }

        User.findById(decoded.data.id)
            .then(user => {
                if (!user) return res.status(404).send("No user found.");
                
                if(decoded.data.password == user.password){
                    next();
                } else {
                    res.send('password incorect');
                }
            })
            .catch(err => {
                res.send(err);
            })
    });
}

module.exports = verifyToken;