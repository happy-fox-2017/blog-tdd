const Artikel = require("../model/Artikel");

let artikelPost = function(req,res){
  let data = req.body;
  
  let newArtikel = new Artikel({
    judul : data.judul,
    pesan : data.pesan,
    autor : data.autor
  });
  
  newArtikel.save(function(err,artikel){
    if (err) {
      console.log(err)
    } else {
      res.status(200).send(artikel)
    }  
  })
}

let artikelDelete = function(req,res) {
  let id = req.params.id;
  Artikel.findById(id, function(err, artikel){
    if(err){
      res.status(502).send(`Something Wrong with your Mongodb : ${err}`);
    } else {
      artikel.remove(function(err) {
        if(err){
          res.status(501).send(`Something Wrong with your Mongodb : ${err}`);
        } else{
          res.status(200).send(`1 Document Deleted`)
        }
      })
    }
  })
}

module.exports = {
artikelPost,
artikelDelete
};