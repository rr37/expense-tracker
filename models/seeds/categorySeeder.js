const mongoose = require('mongoose')
const Category = require('../Category.js')
const categoryList = require('../seedsData/category.json').results

if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}

mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })

const db = mongoose.connection

db.on('error', () => {
  console.log('mongodb error!')
})

db.once('open', () => {
  console.log('running categorySeeder script...')
  Category.create(categoryList)
    .then(() => {
      console.log('categorySeeder done!')
      db.close()
    })
    .catch(err => console.log(err))
})