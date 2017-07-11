const Article = require('../models/articles');
var model = {};

model.getAllDatas = function(req, res){
    Article.find({}, (err, result)=>{
        if(err){
            res.status(400)
            .send({
                message: 'Kesalahan pada database, tidak dapat mendapatkan data',
                error: err
            })
        } else {
            res.status(200)
            .send({
                message: 'Berhasil mendapatkan data',
                data: result
            })
        }
    })
}

model.getOneData = function(req, res){
    let id = req.params.id
    Article.findById(id, (err, result)=>{
        if(err){
            res.status(400)
            .send({
                message: 'Kesalahan pada database, tidak dapat mendapatkan data',
                error: err
            })
        } else {
            res.status(200)
            .send({
                message: 'Berhasil mendapatkan data',
                data: result
            })
        }
    })
}

model.createArticle = function(req, res){
    let body = req.body;
    Article.create({
        title: body.title,
        content: body.content,
        authorName: body.authorName,
        authorUsername: 'dericoy',
        authorEmail: body.authorEmail
    }, (err, result)=>{
        if(err){

            res.status(400)
            .send({
                message: 'Kesalahan pada database, tidak dapat memasukkan data',
                error: err
            })
        } else {
            res.status(200)
            .send({
                message: 'Berhasil memasukkan data',
                data: result
            })
        }
    })
}

model.updateData = function(req, res){
    let id = req.params.id,
        body = req.body;
    Article.findById(id, (err, data)=>{
        if(err){
            res.status(400)
            .send({
                message: 'Kesalahan di dalam database',
                error: err
            })
        } else {
            data.title = body.title || data.title;
            data.content = body.content || data.content;
            data.authorName = body.authorName || data.authorName;
            data.authorUsername = body.authorUsername || data.authorUsername;
            data.authorEmail = body.authorEmail || data.authorEmail;

            data.save((err, result)=>{
                if(err){
                    res.status(400)
                    .send({
                        message: 'Kesalahan saat memasukkan di dalam database',
                        error: err
                    })
                } else {
                    res.status(200)
                    .send({
                        message: 'Berhasil update data',
                        data: result
                    })
                }
            })
        }
    })
}

model.deleteArticle = function(req, res){
    let id = req.params.id;
    Article.findByIdAndRemove(id, (err, result)=>{
        if(err){
            res.status(400)
            .send({
                message: 'Kesalahan saat menghapus data di dalam database',
                error: err
            })
        } else {
            res.status(200)
            .send({
                message: 'Berhasil menghapus article',
                data: result
            })
        }
    })
}

module.exports = model;