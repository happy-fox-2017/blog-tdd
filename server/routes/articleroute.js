const Article = require('../controllers/article');
const router = require('express').Router();

router.get('/', Article.getAllDatas);
router.get('/:id', Article.getOneData);
router.post('/', Article.createArticle);
router.put('/:id', Article.updateData);
router.delete('/:id', Article.deleteArticle);

module.exports = router;