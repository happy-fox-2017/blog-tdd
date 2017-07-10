const chai = require('chai')
const chaiHttp = require('chai-http')
chai.use(chaiHttp)
var should = chai.should()
var server = require('../app')

var Artikel = require('../models/artikel_models')


describe('Blog', ()=>{

     beforeEach((done)=>{
          var createArtikel = new Artikel ({
               "title" : "title",
               "description" : "description",
               "author" : "author"
          })
          createArtikel.save((err, blog)=>{
               done()
          })
     })


     afterEach((done)=>{
          Artikel.remove({}, (err)=>{
               done()
          })
     })

     describe('POST Artikel', ()=>{
          it('Mengembalikan JSON artikel pada saat post artikel', (done)=>{
               chai.request(server)
               .post('/api/artikels')
               .send({
                    title: "Title",
                    description : 'Description',
                    author  : "Ambo"
               })
               .end(function(err, res) {
                    res.should.have.status(200)
                    res.body.should.be.an('object')
                    res.body.title.should.be.equal('Title')
                    res.body.description.should.be.equal('Description')
                    res.body.should.have.property('title')
                    res.body.should.have.property('description')
                    done()
               })
          })
     })

})
