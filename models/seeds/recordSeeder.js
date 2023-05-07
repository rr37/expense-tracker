const mongoose = require('mongoose')
const Record = require('../Record.js')
const recordList = require('../seedsData/record.json').results

if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}

mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })

const db = mongoose.connection

db.on('error', () => {
  console.log('mongodb error!')
})

db.once('open', () => {
  console.log('running recordSeeder script...')
  Record.create(recordList)
    .then(() => {
      console.log('recordSeeder done!')
      db.close()
    })
    .catch(err => console.log(err))
})