const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const cors = require('cors');
require('dotenv').config();

//file require here..
var articles = require('./routes/articleroute');
var users = require('./routes/userroute');

//app require
const app = express();

//mongoose config
const mongoose = require('mongoose');

var db_config = {
    development: 'mongodb://localhost:27017/blog_tdd_1',
    test: 'mongodb://localhost:27017/blog_tdd_1_test'
}

//mongoose connect
var app_env = app.settings.env;

mongoose.connect(db_config[app_env], (err)=>{
    if(err) console.log('something wrong with connection', err);
    console.log('Database connect to ', db_config[app_env]);
})

//app setting
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

//app router here
app.use('/api/article', articles);
app.use('/api/user', users);

//app listen
app.listen(process.env.PORT, function(){
    console.log('You are connect on port: ', process.env.PORT)
});

module.exports = app;