const mongoose = require('mongoose')
const article = require('../models/article')

async function indexGET(req, res) {
  let data = await article.find().sort({ _id:'desc' })
  res.render('index', { title: 'Home', data: data })
}

async function createArticleGET(req, res) {
  res.render('new', { title: 'New Article', error: false})
}

async function createArticlePOST(req, res) {
  const title = req.body.title

  article.find({ title: title }, (err, docs) => {
    if(err) return console.log(err)

    console.log(docs)
    if(!docs[0]) {
      const newArticle = new article({
        title: req.body.title,
        article: req.body.article
      })

      newArticle.save()

      res.redirect('/')
      indexGET(req, res)
    } else {
      res.render('new', { title: 'New Article', error: true})
    }
  })
}

async function deleteArticleGET(req, res) {
  res.render('delete', { title: 'Delete Article', error: false })
}

async function deleteArticlePOST(req, res) {
  await article.deleteOne({ title: req.body.title }, (err) => {
    if(err) return console.log(err)
    
    indexGET(req, res)
    res.redirect('/')
  })
}

module.exports = {
  indexGET,
  createArticleGET,
  createArticlePOST,
  deleteArticleGET,
  deleteArticlePOST
}
