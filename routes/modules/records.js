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

router.get('/:id/edit', (req, res) => {
  const _id = req.params.id
  return Record.findOne({ _id })
    .lean()
    .then((record) => res.render('edit', { record }))
    .catch(error => console.log(error))
})

router.put('/:id', (req, res) => {
  const _id = req.params.id
  return Record.findByIdAndUpdate(_id, req.body)
    .then(() => res.redirect(`/`))
    .catch(error => console.log(error))
})

// 匯出路由器
module.exports = router
