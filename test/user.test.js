var chai = require('chai')
var chaiHttp = require('chai-http')
var app = require('../app')
var should = require('chai').should()
var Article = require('../models/user')

chai.use(chaiHttp)
