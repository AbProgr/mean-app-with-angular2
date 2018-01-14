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
const cors = require('cors')

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

app.use(cors({
    origin: 'http://localhost:4200'
}))

app.use(bodyParser.urlencoded({
    extended: true
}))
app.use(bodyParser.json())

app.use(express.static(__dirname + '/client/dist/'))

app.use('/authentication', authentication)

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname + '/client/dist/index.html'));
})

app.listen(8080, () => {
    console.log('Server started at localhost:8080')
})