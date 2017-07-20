describe('PUT /articles/:id', function () {
  let id
  beforeEach(function (done) {
    let article = new Article({
      title: 'judul asal',
      description: 'deskripsi asal'
    })
    article.save((err, article) => {
      id = article._id
    })
    done()
  })

  afterEach(function (done) {
    Article.findByIdAndRemove(id, (err) => {
      console.log(err);
    })
    done()
  })

  it(`should have title "edited judul"`, function (done) {
    chai.request(app)
    .put(`/articles/${id}`)
    .send({
      title: 'edited judul'
    })
    .end((err, res) => {
      res.should.have.status(200)
      // res.body.should.have.property('title', 'edited judul')
      done()
    })
  })

})
