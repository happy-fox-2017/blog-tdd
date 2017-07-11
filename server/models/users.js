const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var UserSchema = new Schema({
    name: String,
    username: String,
    password: String,
    email: String
}, { timestamps: true });

var User = mongoose.model('User', UserSchema);

module.exports = User;