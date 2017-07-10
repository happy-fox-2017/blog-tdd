var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var artikelSchema = new Schema({
  judul : String,
  pesan : String,
  autor : String
})

var Artikel = mongoose.model('Artikel', artikelSchema);

module.exports = Artikel;