const express = require('express')
const router = express.Router()
const controller = require('../controllers/index')

router.get('/', controller.indexGET)

router.get('/new', controller.createArticleGET)
router.post('/new', controller.createArticlePOST)

router.get('/delete', controller.deleteArticleGET)
router.post('/delete', controller.deleteArticlePOST)

module.exports = router
