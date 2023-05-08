const express = require('express')
const router = express.Router()
const Record = require('../../models/Record')
const Category = require('../../models/Category')
const formateDate = require('../../utility/formateDate')
const sumAmount = require('../../utility/sumAmount')
const turnUrlToFontAwesomeClass = require('../../utility/turnUrlToFontAwesomeClass')

// 定義首頁路由
router.get('/', async (req, res) => {
  const categoryData = await Category.find({})
  Record.find()
    .lean()
    .then(async(recordData) => {
      // recordData 的 cateId 等於 Category 資料的話，回傳Category的link
      recordData.forEach((record) => {
        const matchCate = categoryData.find(data => {
          return record.categoryId.toString()  === data._id.toString()
        })
        record.iconLink = matchCate.icon
        record.categoryName = matchCate.name
        console.log(record)
      })
      recordData = await turnUrlToFontAwesomeClass(recordData)
      recordData = await formateDate(recordData)
      const total = sumAmount(recordData)
      res.render('index', { recordData, total })
    })
    .catch(err => console.log(err))
})

// 匯出路由器
module.exports = router
