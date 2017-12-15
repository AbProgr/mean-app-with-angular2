'use strict'

const express = require('express')
const app = express()

const mongoose = require('mongoose')
const config = require('./config/database')
const path = require('path')

mongoose.Promise = global.Promise
 
mongoose.createConnection(config.uri, (err) => {
    if (err) {
        console.log('Could not connect to DB: ' + err)
    } else {
        console.log('Connected to database: ' + config.db)
    }
})

app.use(express.static(__dirname + '/client/dist/'))

app.get('*', (req, res) => {
    res.render('index.html')
})

app.listen(8080, () => {
    console.log('Server started at localhost:8080')
})