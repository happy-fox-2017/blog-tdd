const User = require('../model/User');
const bcrypt = require('bcrypt');
const saltRounds = 10;
const jwt = require('jsonwebtoken');

let login_post = function (req,res){
  let input = req.body;
  User.find({})
  .where('username').equals(input.username)
  .exec(function(err,user){
    if (err) {
      res.status(501).send(`Something Wrong with your login Error : ${err}`)
    } else {
      if (user.length <= 0) {
        res.status(401).send('Username Wrong, check your username again');
      } else {
        bcrypt.compare(input.password, user[0].password, function(err,respone){
          if(err){
            res.status(501).send(`Something Wrong with your login Error : ${err}`);
          } else {
            if(respone){
              jwt.sign({
                username : user.username,
                name : user.name,
                email : user.email
              },"scret", function(err,token){
                res.status(200).send(token);
              })
            } else {
              res.status(401).send(`Password Wrong, check your username again ${err}`);
            }
          }
        })
      }
    }
  })
}

module.exports = login_post