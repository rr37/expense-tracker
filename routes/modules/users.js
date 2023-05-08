const express = require('express')
const router = express.Router()

router.get('/login', (req, res) => {
  res.render('login')
})
module.exports = router

router.post('/login', (req, res) => {
})
router.get('/register', (req, res) => {
  res.render('register')
})