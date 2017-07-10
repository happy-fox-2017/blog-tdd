const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const mongoose = require('mongoose')

db_config = {
     development : 'mongodb://localhost/blog-tdd',
     test : 'mongodb://localhost/blog-tdd-test'
}
var app_env = app.settings.env
mongoose.connect(db_config[app_env], function(){
     console.log('connect to db blog-tdd  ' +db_config[app_env]);
});

const artikels = require('./routes/artikels')
const users = require('./routes/users')


app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended : false}))

app.use('/api/artikels', artikels)
app.use('/api/users', users)

app.listen(3000, ()=>{
     console.log('Alive');
})

module.exports = app;
