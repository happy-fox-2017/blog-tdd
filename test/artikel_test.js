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
                    res.body.should.have.property('author')

                    done()
               })
          })
     })

     describe("GET Artikel ",()=>{
          it('Should get all data  Artikel ',(done)=>{
               chai.request(server)
               .get('/api/artikels')
               .end((err, res)=>{
                    res.should.have.status(200)
                    res.body.should.be.a('array')
                    res.body.length.should.equal(1)
                    res.body[0].description.should.equal('description')
                    done()
               })
          })
     })


     describe("Update Blog ",()=>{
		it('Should Update Data Blog by id',(done)=>{
			var insertBlog = new Artikel({
     	    	title : 'Title',
     	    	description : 'Description',
     	    	author : 'Author'
			})
			insertBlog.save((err, result)=>{
				chai.request(server)
				.put('/api/artikels/'+ result._id)
				.send({
     		    	title : 'Title New',
     		    	description : 'Description New',
     		    	author : 'Author'
     				})
				.end((err,res)=>{
                         res.should.have.status(200)
					res.body.should.be.a('object')
					done()
				})
			})
		})
	})

     describe("DELETE Blog ",()=>{
          it('Should Delete Data Blog by id',(done)=>{
               var insertBlog = new Artikel({
                    title : 'Title',
                    description : 'Description',
                    author : 'Author'
                    })
               insertBlog.save((err, result)=>{
                    chai.request(server)
                    .delete('/api/artikels/'+ result._id)
                    .end((err,res)=>{
                         should.exist(res.body);
                         res.body.should.be.a('object');
                         res.body.msg.should.be.a('string');
                         res.body.msg.should.equal('Delete Data');
                         res.body.docs.should.be.a('object')
                         res.body.docs.ok.should.equal(1)
                         res.body.docs.n.should.equal(1)
                         done()
                    })
               })
          })
     })

})
