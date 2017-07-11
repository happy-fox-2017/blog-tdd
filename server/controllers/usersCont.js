'use strict'
const User = require('../models/users.js');
var bcrypt = require('bcrypt')
var jwt = require('jsonwebtoken')

var createUser = (req, res, next) => {
  User.findOne({
      username: req.body.username
    })
    .then((user) => {
      if (user) {
        res.send('User name already exists')
      } else {
        var insertUser = new User({
          username: req.body.username,
          password: bcrypt.hashSync(req.body.password, bcrypt.genSaltSync(10))
        })
        insertUser.save((err, result) => {
          if (err) {
            res.send(err.message)
          } else {
            res.send(result);
          }
        })
      }
    })
    .catch((err) => {
      res.send(err.message)
    })
}

var signIn = (req, res) => {
  console.log(req.body);
  User.findOne({
    username: 'asdf'
  }, function(err, result) {
    console.log('ini dalam result', result);
    if (bcrypt.compare(req.body.password, result.password)) {
      console.log('masuk');
      var token = jwt.sign({
        id: result._id,
        username: result.username
      }, 'token-super')
      console.log(token);
      res.json(token)
    } else {
      res.send('kosong man')
    }
  })
}

var login = function(req, res) {
  let username = req.body.username
  let password = req.body.password
  console.log(username);
  User.findOne({username: username}, function(err, result) {
    console.log(result);
    if (bcrypt.compare(req.body.password, result.password)) {
      var token = jwt.sign({username: result.username, name: result.name}, 'asdf')
      res.json(token)
    } else {
      res.send('Silahkan Login terlebih dahhulu')
    }
  })
}

module.exports = {
  createUser,
  signIn,
  login
};