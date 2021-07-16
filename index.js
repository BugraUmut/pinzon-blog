const express = require('express')
const app = express()
const mongoose = require('mongoose')

const indexRouter = require('./routes/index')

if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config();
}

mongoose.connect(process.env.MONGODB_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})

app.set('view engine', 'ejs')
app.set('views', __dirname + '/views')
app.set('layout', 'layouts/layout')
app.use(express.static(__dirname + '/public'))
app.use(express.urlencoded({extended: false}))
app.use(express.json())

app.use('/', indexRouter)

app.get('*', (req, res) => {
  res.status(404).render('404', { title: "Page Not Found" })
})

app.listen(process.env.PORT, () => {
    console.log('App listening on port: ', process.env.PORT)
})