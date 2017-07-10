const mongoose = require('mongoose')
const Schema = mongoose.Schema

var userSchema = mongoose.Schema({
     name : String,
     email : String,
     phone : String,
     password : String
})

var User = mongoose.model('User', userSchema)

module.exports = User
