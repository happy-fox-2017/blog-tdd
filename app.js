var express = require('express')
var mongoose = require('mongoose')
var bodyParser = require('body-parser');
var cors = require('cors')

// *** config file *** //
var db_config = {
  development: "mongodb://localhost/erwar-tdd",
  test: "mongodb://localhost/erwar-tdd-test"
}

var app = express();
app.use(cors())

var current_env = app.settings.env //development, test, production
mongoose.connect(db_config[current_env], function(err, res) {
	if (err) {
		console.log('error database', err)
	} else {
		console.log('connection to database: ', db_config[current_env])
	}
})

var index = require('./routes/index')


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use('/', index)

app.listen(3000)

module.exports = app;
