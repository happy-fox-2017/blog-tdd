var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var userSchema = new Schema({
  username : {type: String, require: true},
  password : {type:String, require:true},
  name : {type: String, require:true},
  email : {type: String, require : true}
})

var User = mongoose.model('User', userSchema);

module.exports = User;