var express = require('express')
var router = express.Router()
var mongoose = require('mongoose')
const user_model = require('../models/user')
var jwt = require('jsonwebtoken');
var bcrypt = require('bcrypt')
const saltRounds = 10;
var salt = bcrypt.genSaltSync(saltRounds);
require('dotenv').config()

var signUp = function(req, res) {
  var hash = bcrypt.hashSync(req.body.password, salt)
  console.log('ini hash: ',hash);
  var user = new user_model({
    name: req.body.name,
    username: req.body.username,
    password: hash
  })
  user.save(function(err,result){
    if(!err) res.send(result)
    else res.send(err.message)
  })
}


var signIn = function(req, res) {
  let username = req.body.username
  let password = req.body.password
  user_model.findOne({username: username}, function(err, result) {
    console.log('ini resuult: ',result);
    if (bcrypt.compare(req.body.password, result.password)) {
      var token = jwt.sign({username: result.username, name: result.name}, process.env.SECRET)
      jwt.verify(token, process.env.SECRET, function(err, decoded) {
        console.log('tes', decoded);
      })
      res.send(token)
    } else {
      res.send('Silahkan Login terlebih dahhulu')
    }
  })
}

module.exports = {
  // create, getAll, remove, edit, signUp, signIn
  signUp,
  signIn
}
