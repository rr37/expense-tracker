const Category = require('../Category.js')
const categoryList = require('../seedsData/category.json').results
const db = require('../../config/mongoose')

if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}

db.once('open', () => {
  console.log('running categorySeeder script...')
  Category.create(categoryList)
    .then(() => {
      console.log('categorySeeder done!')
      db.close()
    })
    .catch(err => console.log(err))
})