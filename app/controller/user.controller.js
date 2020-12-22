const User = require('../model/user.modal');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');


// Register
exports.register = (req,res) => {
    const {name, email, password} = req.body;
    
    bcrypt.hash(password, 10, (err, hash) => {
        // Save new user to database 
        User.create({
            name,
            email,
            password: hash
        })
        .then(response => {
            res.send(response);
        })
        .catch(err => {
            res.send(err).status(500);
        });
    })
}


// Login 
exports.login = (req,res) => {
    const {email, password} = req.body;
    
    // find email for authentication
    User.findOne({email})
        .then(user => {
            if(user){
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

// Get all user
exports.getAllUser = (req, res) => {
    User.find()
        .then(data => {
            res.send(data)
        })
        .catch(err => {
            res.send(err)
        })
}

// Delete user 
exports.delete = (req, res) => {
    const id = req.params.id;

    User.findByIdAndDelete(id)
        .then(response => {
            res.send(response);
        })
        .catch(err => {
            res.send(err)
        })
}