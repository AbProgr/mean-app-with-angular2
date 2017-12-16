'use strict'

const express = require('express')
const app = express()

const mongoose = require('mongoose')
const config = require('./config/database')
const path = require('path')

const router = express.Router()
const authentication = require('./routes/authentication')(router)

const bodyParser = require('body-parser')
const morgan = require('morgan')

mongoose.Promise = global.Promise

mongoose.connect(config.uri, {
    useMongoClient: true
}, function (err) {
    if (err) {
        console.log('Could not connect to DB: ' + err)
    } else {
        console.log('Connected to DB')
    }
})

app.use(morgan('dev'))

app.use(bodyParser.urlencoded({
    extended: true
}))
app.use(bodyParser.json())

app.use(express.static(__dirname + '/client/dist/'))

app.use('/authentication', authentication)

app.get('*', (req, res) => {
    res.render('index.html')
})

app.listen(8080, () => {
    console.log('Server started at localhost:8080')
})