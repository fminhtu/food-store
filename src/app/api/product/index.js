const express = require('express');
const router = express.Router();
const productApiController = require('./productApiController');

router.post('/:productId/comments',productApiController.postComment)

module.exports = router;