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

let artikelGet = function(req,res){
  Artikel.find({}, function(err, artikel){
    if(err){
      res.status(502).send(`Something Wrong with your Mongodb : ${err}`);
    } else {
      res.status(200).send(artikel);
    }
  })
}

let artikelPut = function(req,res){
  Artikel.findById(req.params.id, (err,artikel) =>{
    if(err){
      res.status(504).send(`Something Wrong with your Mongodb : ${err}`);
    } else {
      let data = req.body;
      artikel.judul = data.judul;
      artikel.pesan = data.pesan;
      artikel.autor = data.autor;
      
      artikel.save(function(err,newartikel){
        if (err) {
          res.status(506).send(`Something Wrong with your Mongodb : ${err}`);
        } else {
          res.status(200).send(newartikel);
        }
      })
    }
  })
}

module.exports = {
artikelPost,
artikelDelete,
artikelGet,
artikelPut
};