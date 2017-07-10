const mongoose = require('mongoose');
var Schema = mongoose.Schema;

var artikelSchema = new Schema({
     title : String,
     description : String,
     author : String,
     createdDate : Date,
     date : Date,
     updateAt : Date
})

const Artikel = mongoose.model('Artikel', artikelSchema)
module.exports = Artikel
