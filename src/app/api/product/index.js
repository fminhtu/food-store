const express = require('express');
const router = express.Router();
const productApiController = require('./productApiController');

router.get('/detail/pagination',productApiController.getPaginationCmt);
router.post('/:productId/comments',productApiController.postComment);
router.get('/:category',productApiController.getPagination);



module.exports = router;