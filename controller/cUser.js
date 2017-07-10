const User = require("../model/User");
const bcrypt = require('bcrypt');
const saltRounds = 10;

let user_post = (req,res) => {
  bcrypt.genSalt(saltRounds, (err,salt)=>{
    var data = req.body;
    bcrypt.hash(data.password,salt, (err,hash) =>{
      let newUser = "";
        newUser = User({
        username : data.username,
        password : hash,
        name : data.name,
        email : data.email
      })
      console.log(newUser);
      
      newUser.save(function(err,user){
        if (err) {
          res.status(501).send(`Something Wrong with your Add User, Error : ${err}`)
        } else {
          res.status(200).send(user);
        }
      })
    })
  })
}

let user_get = (req,res) =>{
  User.find({},(err,user) =>{
    if (err) {
      res.status(503).send(`Something Wrong with your Find User, Error : ${err}`);
    } else {
      res.status(200).send(user);
    }
  })
}

let user_put = (req,res) =>{
  bcrypt.genSalt(saltRounds, (err,salt)=>{
    var data = req.body;
    bcrypt.hash(data.password,salt, (err,hash) =>{
      User.findById(req.params.id, (err,user)=> {
        user.username = data.username;
        user.password = hash
        user.name = data.name;
        user.email = data.email;
        
        user.save((err,new_user) =>{
          if (err) {
            res.status(502).send(`Something Wrong with your Update User, Error : ${err}`);
          } else {
            res.status(200).send(new_user);
          }
        })
      })
    })
  })
}

let user_delete = (req,res) =>{
  User.findById(req.params.id, (err,user) =>{
    if (err) {
      res.status(503).send(`Something Wrong with your Delete User, Error : ${err}`);
    } else {
      user.remove((err) => {
        if (err) {
          res.status(504).send(`Something Wrong with your Delete User, Error : ${err}`);
        } else {
          res.status(200).send("1 Document User Delete")
        }
      })
    }
  })
}

module.exports = {
  user_post,
  user_get,
  user_put,
  user_delete
};