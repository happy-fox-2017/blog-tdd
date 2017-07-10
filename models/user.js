
var mongoose = require('mongoose')

var userSchema = mongoose.Schema({
  email: {
    type: String,
    required: [true, "email cannot be empty"]
    unique: [true, "email must be unique"]
  },
  password: {
    type: String,
    unique: [true, "password cannot be empty"]
  }
})
