const Record = require('../Record.js')
const Category = require('../Category.js')
const recordList = require('../seedsData/record.json').results
const db = require('../../config/mongoose')

if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}

db.once('open', async() => {
  console.log('running recordSeeder script...')
  const categoryData = await Category.find({})
  console.log('category data found.')
  // console.log(categoryData)
  recordList.forEach((record) => {
    const category = categoryData.find(data => {
      return record.category === data.name
    })
    record.categoryId = category._id
    // console.log(record)
  })
  Record.create(recordList)
    .then(() => {
      console.log('recordSeeder done!')
      db.close()
    })
    .catch(err => console.log(err))
})