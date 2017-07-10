const User = require('../models/users_models')
const bcrypt = require('bcrypt')


var signup = (req, res)=>{
  User.findOne({
    email : req.body.email
  })
  .then(response=>{
    if(!response){
      var insertUser = new User({
        name : req.body.name,
        email : req.body.email,
        password : bcrypt.hashSync(req.body.password, bcrypt.genSaltSync(10)),
        phone: req.body.phone
      })
      insertUser.save((err, result)=>{
        if(!err){
          res.send({
            result : result,
            msg : 'Data User Added, You may now log-in with the email you have chosen'
          })
        }else{
          res.send(err)
        }
      })
    }else{
      res.send({message : 'Email already exists'})
    }
  })
  .catch(error=>{
    res.send(error)
  })
}

var signin = (req, res)=>{
  User.findOne({
    email : req.body.email
  })
  .then(result=>{
    if(!result){
      res.send({
        msg : "Email not Registered"
      })
    }else{
      if(bcrypt.compareSync(req.body.password, result.password)){
        var token = jwt.sign({
          id : result._id,
          name : result.name,
          email : result.email,
          phone: result.phone || null
        }, 'secret')
        res.send({
          token : token
        })
      }else{
        res.send({
          msg : "Password is wrong"
        })
      }
    }
  })
  .catch(err=>{
    res.send(err)
  })
}

var findAllUsers = (req,res,next)=>{
     User.find(function(err, result){
          if(result) {
               res.send({
                    result : result,
                    msg : 'Successfull get All User'
               })
          } else {
               res.send(err.message)
          }
     })
}

var findOneUser = (req,res,next)=>{
     User.findOne({ _id: req.params.id}, function(err, result) {
          if (err) {
               res.send(err.message)
          } else {
               res.send({
                    result : result
               })
          }
     })
}

var insertUser = (req,res,next)=>{
     var insert = new User ({
          name : req.body.name,
          email : req.body.email,
          phone : req.body.phone,
          password : bcrypt.hashSync(req.body.password, bcrypt.genSaltSync(10)),
     })
     insert.save((err, docs) =>{
          if (err) {
               res.send(err.message)
          } else {
               res.send({
                    docs : docs,
                    msg : 'Added data Successfull'
               })
          }
     })
}

var deleteUser = (req,res,next) =>{
     User.remove({_id:req.params.id}, (err,result)=>{
          if (err) {
               console.log(err.message);
          } else {
               res.send({
                    result : result ,
                    msg : "Delete User Successfull"
               })
          }
     })
}

var updateUser = (req, res,next)=>{
  User.findById(req.params.id, (err, docs) => {
   if (err) res.send(err)
   User.updateOne({
      _id: docs._id
   }, {
      $set: {

           name : req.body.name || docs.name,
           email : req.body.email || docs.email,
           phone : req.body.phone || docs.phone,
           password : req.body.password || docs.password,
      }
   }, (err, result) => {
      if (err) res.send(err)
      res.send({
           result : result,
           msg : "Update Successfull"
      })
   })
  })
}




module.exports = {
     signup,
     signin,
     findAllUsers,
     findOneUser,
     insertUser,
     updateUser,
     deleteUser
}
