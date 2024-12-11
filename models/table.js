const Schema = require('mongoose').Schema
const db = require('../config/db')

const Table = db.model('Table', {
    num: Number,
    state: String,
    _orders: [{
        type: Schema.Types.ObjectId,
        ref: 'Coffee',
    }],
})

module.exports = Table