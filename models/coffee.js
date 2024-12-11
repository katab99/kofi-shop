const Schema = require('mongoose').Schema
const db = require('../config/db')

const Coffee = db.model('Coffee', {
    name : String,
    price : Number,
    state : String,
})

module.exports = Coffee