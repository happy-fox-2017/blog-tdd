'use strict'

var Author = require('../models/author');
var jwt = require('jsonwebtoken');
var bcrypt = require('bcrypt');
const saltRounds = 10;
var salt = bcrypt.genSaltSync(saltRounds);

var userSignUp = (req,res)=>{
  var hash = bcrypt.hashSync(req.body.password,salt)
  Author.create({
    name: req.body.name,
    email: req.body.email,
    username: req.body.username,
    password: hash
  },(err,result)=>{
    if (err) {
      res.send(err.message)
    }
    console.log(result);
    res.send(result)
  })
}

var userSignIn = (req,res)=>{
  Author.findOne({username: req.body.username},(err,data)=>{
    if (err) {
      res.send(err.message)
    }else {
      bcrypt.compare(req.body.password,data.password)
      .then((result)=>{
        if (result) {
          let token = jwt.sign({
                id: data._id,
                username: data.username,
                email: data.email,
              },'secret',{expiresIn: '1h'});
              res.send({token:token});
          }else {
            res.send({message: 'username/password is wrong'})
          }
      })
    }
  });
}

// then(data =>{
//   console.log('ini datanya '+data);
//   if (bcrypt.compareSync(req.body.password,data.password)) {
//     let token = jwt.sign({
//       id: data._id,
//       username: data.username,
//       email: data.email,
//     },'secret',{expiresIn: '1h'});
//     console.log('token login '+ token);
//     res.json({
//       message: 'Signin success',
//       id: data._id,
//       username: data.username,
//       email: data.email,
//       token: token
//     })
//   }else {
//     res.json({
//       message: 'invalid password'
//     })
//   }
// })

var getAllUser = (req,res)=>{
  Author.find({},(err,result)=>{
    if (err) {
      res.send(err.message)
    }
    console.log(result);
    res.send(result);
  })
}

var deleteUser = (req,res)=>{
  Author.findByIdAndRemove(req.params.id,(err)=>{
    if (err) {
      res.send(err.message)
    }
    res.send('data already delete')
  })
}

module.exports = {
  userSignUp,
  userSignIn,
  getAllUser,
  deleteUser
}