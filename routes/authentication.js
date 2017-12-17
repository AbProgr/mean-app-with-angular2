const User = require('../models/user')

module.exports = (router) => {
    /* ==============
     Register Route
    ============== */
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

    /* ===============================================================
       Route to check if user's username is available for registration
    =============================================================== */
    router.get('/checkUsername/:username', (req, res) => {
        // Check if username was provided in paramaters
        if (!req.params.username) {
            res.json({
                success: false,
                message: 'Username was not provided'
            }); // Return error
        } else {
            // Look for username in database
            User.findOne({
                username: req.params.username
            }, (err, user) => {
                // Check if connection error was found
                if (err) {
                    res.json({
                        success: false,
                        message: err
                    }); // Return connection error
                } else {
                    // Check if user's username was found
                    if (user) {
                        res.json({
                            success: false,
                            message: 'Username is already taken'
                        }); // Return as taken username
                    } else {
                        res.json({
                            success: true,
                            message: 'Username is available'
                        }); // Return as vailable username
                    }
                }
            });
        }
    });

    /* ============================================================
       Route to check if user's email is available for registration
    ============================================================ */
    router.get('/checkEmail/:email', (req, res) => {
        // Check if email was provided in paramaters
        if (!req.params.email) {
            res.json({
                success: false,
                message: 'E-mail was not provided'
            }); // Return error
        } else {
            // Search for user's e-mail in database;
            User.findOne({
                email: req.params.email
            }, (err, user) => {
                if (err) {
                    res.json({
                        success: false,
                        message: err
                    }); // Return connection error
                } else {
                    // Check if user's e-mail is taken
                    if (user) {
                        res.json({
                            success: false,
                            message: 'E-mail is already taken'
                        }); // Return as taken e-mail
                    } else {
                        res.json({
                            success: true,
                            message: 'E-mail is available'
                        }); // Return as available e-mail
                    }
                }
            });
        }
    });

    return router
}