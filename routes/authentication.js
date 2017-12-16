const User = require('../models/user')

module.exports = (router) => {
    router.post('/register', (req, res) => {
        let b = req.body

        if (!b.email) {
            res.status(403).send({
                success: false,
                message: 'email required'
            })
        } else {
            if (!b.username) {
                res.status(403).send({
                    success: false,
                    message: 'username required'
                })
            } else {
                if (!b.password) {
                    res.status(403).send({
                        success: false,
                        message: 'password required'
                    })
                } else {
                    let user = new User({
                        email: b.email,
                        username: b.username,
                        password: b.password
                    })

                    user.save((err) => {
                        if (err) {
                            if (err.code === 11000) {
                                res.status(200).send({
                                    success: false,
                                    message: 'Username or email already exists'
                                })
                            } else {
                                if (err.errors) {
                                    if (err.errors.email) {
                                        res.status(200).send({
                                            success: false,
                                            message: err.errors.email.message
                                        })
                                    }
                                } else {
                                    res.status(200).send({
                                        success: false,
                                        message: 'Error occured while saving user: ' + err
                                    })
                                }
                            }
                        } else {
                            res.status(200).send({
                                success: true,
                                message: 'user saved'
                            })
                        }
                    })
                }
            }
        }
    });

    return router
}