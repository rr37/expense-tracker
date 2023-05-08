const express = require('express')
const router = express.Router()
const Record = require('../../models/Record')
const Category = require('../../models/Category.js')
const formateDate = require('../../utility/formateDate')


router.get('/new', (req, res) => {
  res.render('new')
})

router.post('/', async(req, res) => {
  const categoryData = await Category.find({})
  const category = categoryData.find(data => {
    return req.body.category === data.name
  })
  req.body.categoryId = category._id
  return Record.create({ ...req.body})
    .then(() => res.redirect('/'))
    .catch(err => console.log(err))
})

router.get('/:id/edit', (req, res) => {
  const _id = req.params.id
  return Record.findOne({ _id })
    .lean()
    .then(async (record) => {
      [record] = await formateDate([record])
      const categoryData = await Category.find({})
      const matchCate = categoryData.find(data => {
        return record.categoryId.toString() === data._id.toString()
      })
      record.categoryName = matchCate.name
      res.render('edit', {record})
    })
    .catch(error => console.log(error))
})

router.put('/:id', async (req, res) => {
  const _id = req.params.id
  const categoryData = await Category.find({})
  const category = categoryData.find(data => {
    return req.body.category === data.name
  })
  req.body.categoryId = category._id
  return Record.findByIdAndUpdate(_id, req.body)
    .then(() => res.redirect(`/`))
    .catch(error => console.log(error))
})

router.delete('/:id', (req, res) => {
  const _id = req.params.id
  return Record.findByIdAndDelete({ _id })
    .then(() => res.redirect('/'))
    .catch(error => console.log(error))
})

// 匯出路由器
module.exports = router
