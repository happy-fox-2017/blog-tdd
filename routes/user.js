const express = require('express');
const router = express.Router();
const cUser = require('../controller/cUser');

/* GET home page. */
router.post('/', cUser.user_post);
router.get('/', cUser.user_get);
router.put('/:id', cUser.user_put);
router.delete('/:id', cUser.user_delete);

module.exports = router;