const express = require('express')
const router = express.Router()
const Record = require('../../models/Record')

router.get('/new', (req, res) => {
  res.render('new')
})

router.post('/', (req, res) => {
  return Record.create({ ...req.body})
    .then(() => res.redirect('/'))
    .catch(err => console.log(err))
})

// 匯出路由器
module.exports = router
