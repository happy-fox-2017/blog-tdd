const Artikel = require('../models/artikel_models')

var createArtikel = (req,res,next)=>{
     var insert = new Artikel ({
          title : req.body.title ,
          description : req.body.description,
          author: req.body.author
     })
     insert.save((err, result) =>{
          if (err) {
               res.send(err)
          } else {
               res.send(result)
          }
     })
}

var getAllArtikel = (req,res,next)=>{
     Artikel.find({}, function(err, result){
          if(result) {
               res.send(result)
          } else {
               res.send(err.message)
          }
     })
}

var updateArtikel = (req, res,next)=>{
  Artikel.findById(req.params.id, (err, docs) => {
   if (err) res.send(err)
   Artikel.updateOne({
      _id: docs._id
   }, {
      $set: {
           title : req.body.title || docs.title,
           description : req.body.description || docs.description,
           author: req.body.author || docs.author
      }
   }, (err, result) => {
      if (err) res.send(err)
      res.send(result)
   })
  })
}

var deleteArtikel = function(req,res,next) {
  Artikel.remove({_id:req.params.id}, function(err,docs){
    if(!err){
      res.send({
        msg : "Delete Data",
        docs : docs
      })
    }else{
      res.send(err)
    }
  })
}

module.exports = {
     createArtikel,
     getAllArtikel,
     updateArtikel,
     deleteArtikel
}
