const Record = require('../Record.js')
const recordList = require('../seedsData/record.json').results
const db = require('../../config/mongoose')

if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}

db.once('open', () => {
  console.log('running recordSeeder script...')
  Record.create(recordList)
    .then(() => {
      console.log('recordSeeder done!')
      db.close()
    })
    .catch(err => console.log(err))
})