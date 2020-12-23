const User = require('../model/user.modal');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');


// Get all user
exports.getAllUser = (req, res) => {
    // find all user 
    User.find()
        .then(data => {
            res.send(data)
        })
        .catch(err => {
            res.send(err)
        })
}

// Register
exports.register = (req,res) => {
    const {name, email, password} = req.body;

    // find email for checking exist or not
    User.findOne({email})
        .then(user => {
            // if user exist send message
            if(user){
                res.send({message: 'user with that email has been taken'})
            } else {
                // hash password if user with that email not found
                bcrypt.hash(password, 10, function(err, hash) {
                    const data = {
                        name,
                        email,
                        password: hash
                    }
                    User.create(data)
                        .then(data => {
                            res.send(data)
                        })
                        .catch(err => {
                            res.send(err)
                        })
                })
            }
        })
        .catch(err => {
            res.send(err);
        })
    
}


// Login 
exports.login = (req,res) => {
    const {email, password} = req.body;
    
    // find email for authentication
    User.findOne({email})
        .then(user => {
            if(user){
                // check password
                bcrypt.compare(password, user.password, (err, result) => {
                    if(err) return res.send(err)
                    if(result){
                        res.send(
                            {
                                message: 'Login successfuly',
                                auth: true,
                                token: jwt.sign({ data: {id: user.id, password: user.password} }, 'asdawsd', { expiresIn: '1d' }),
                            }
                        )
                    } else {           
                        res.send(
                            {
                                message: 'Password incorect',
                                auth: false,
                                token: '',
                            }
                        )
                    }
                })
            } else {
                res.send(
                    {
                        message: 'User not found with that email',
                        auth: false,
                        token: ''
                    }
                )
            }
        })
        .catch(err => {
            res.send(err).status(500);
        })
}

// update data for change password or something
exports.changePassword = (req, res) => {
    const id = req.params.id
    const password = req.body.password;

    bcrypt.hash(password, 10, function(err, hash) {
        User.findByIdAndUpdate(id, {password: hash})
            .then(data => {
                res.send(data)
            })
            .catch(err => {
                res.send(err)
            })
    })
}


// Delete user 
exports.delete = (req, res) => {
    // get id on params
    const id = req.params.id;

    // find user and delete
    User.findByIdAndDelete(id)
        .then(response => {
            res.send(response);
        })
        .catch(err => {
            res.send(err)
        })
}