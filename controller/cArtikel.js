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

module.exports = {
artikelPost};