const chai = require('chai')
const chaiHttp = require('chai-http')
chai.use(chaiHttp)
var Artikel = require('../models/artikel_models')

var should = chai.should()

describe('Blog', ()=>{

     beforeEach((done)=>{
          var NewArtikel = new Artikel ({
               "title" : "title",
               "description" : "description",
               "author" : "author"
          })
          NewArtikel.save((err, blog)=>{
               done()
          })
     })


     afterEach((done)=>{
          Artikel.remove({}, (err)=>{
               done()
          })
     })

     


})
