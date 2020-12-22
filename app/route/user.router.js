module.exports = (app) => {
    const User = require('../controller/user.controller')
    const verify = require('../controller/authentication')
    let router = require('express').Router();

    router.get('/', (req,res) => {
        res.send('Hello, welcome to api!')
    })

    router.get('/user', verify, User.getAllUser)

    router.post('/register', User.register)

    router.post('/login', User.login)

    router.delete('/:id', verify, User.delete);
    
    app.use('/api', router)
}