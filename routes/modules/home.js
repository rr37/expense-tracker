const express = require('express')
const router = express.Router()
const Record = require('../../models/Record')
const Category = require('../../models/Category')
const formateDate = require('../../utility/formateDate')
const sumAmount = require('../../utility/sumAmount')
const turnUrlToFontAwesomeClass = require('../../utility/turnUrlToFontAwesomeClass')

// 定義首頁路由
router.get('/', async (req, res) => {
  const userId = req.user._id
  const categoryData = await Category.find({}).lean()
  Record.find({ userId })
    .lean()
    .then(async (recordData) => {
      recordData.forEach((record) => {
        const matchCate = categoryData.find(data => {
          return record.categoryId.toString() === data._id.toString()
        })
        record.iconLink = matchCate.icon
        record.categoryName = matchCate.name
      })
      recordData = await turnUrlToFontAwesomeClass(recordData)
      recordData = await formateDate(recordData)
      const totalAmount = sumAmount(recordData)
      res.render('index', { recordData, totalAmount, categoryData })
    })
    .catch(err => console.log(err))
})

router.get('/filter', async (req, res) => {
  const userId = req.user._id
  const selectedCategory = req.query.selectedCategory
  if (!selectedCategory){
    res.redirect('/')
  }
  try {
    const categoryData = await Category.find({ name: selectedCategory }).lean()
    const selectedCategoryId = categoryData[0]._id
    const selectedCategoryName = categoryData[0].name
    const selectedCategoryUrl = categoryData[0].icon


    const recordData = await Record.find({ userId, categoryId: selectedCategoryId }).lean()

    recordData.forEach((record) => {
      record.iconLink = selectedCategoryUrl
      record.categoryName = selectedCategoryName
    })

    turnUrlToFontAwesomeClass(recordData)
    formateDate(recordData)

    res.render('index', { recordData, totalAmount: sumAmount(recordData), categoryData, selectedCategory })
  } catch (err) {
    console.log(err)
  }
})

// router.get('/filter', async (req, res) => {
//   const userId = req.user._id
//   try {
//     await Promise.all(
//       Record.find({ userId }).lean().map(async(recordData) => {
//         const category = req.query.category
//         const categoryData = await Category.find({}).lean()
//         await recordData.map(async(record) => {
//           const matchCate = await categoryData.find(data => {
//             return data._id.toString() === category
//           })
//           record.iconLink = matchCate.icon
//           record.categoryName = matchCate.name
//           console.log('down', record)
//         })
//       })
//     )
//     await turnUrlToFontAwesomeClass(recordData)
//     await formateDate(recordData)
//     const totalAmount = sumAmount(recordData)
//     console.log('downdown', recordData)
//     // res.render('index')
//     res.render('index', { recordData, totalAmount })
//   } catch (err) {
//     console.log(err)
//   }
// })


// 匯出路由器
module.exports = router
