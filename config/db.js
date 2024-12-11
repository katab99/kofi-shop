const mongoose = require('mongoose')
mongoose.connect('mongodb://localhost:27017/kofi-shop').then(()=>{
    console.log('MongoDB Connected')
})

module.exports = mongoose