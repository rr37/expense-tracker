const express = require('express')
const router = express.Router()
const Record = require('../../models/Record')
const formateDate = require('../../utility/formateDate')

// 定義首頁路由
router.get('/', (req, res) => {

  Record.find()
    .lean()
    .then(recordData => {
      recordData = formateDate(recordData)
      res.render('index', { recordData })
    })
    .catch(err => console.log(err))
})

// 匯出路由器
module.exports = router
