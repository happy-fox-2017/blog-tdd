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

module.exports = {
     createArtikel
}
