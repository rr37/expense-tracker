const express = require('express')
const router = express.Router()
const Record = require('../../models/Record')
const formateDate = require('../../utility/formateDate')
const sumAmount = require('../../utility/sumAmount')

// 定義首頁路由
router.get('/', (req, res) => {

  Record.find()
    .lean()
    .then(recordData => {
      recordData = formateDate(recordData)
      const total = sumAmount(recordData)
      res.render('index', { recordData, total })
    })
    .catch(err => console.log(err))
})

// 匯出路由器
module.exports = router
