// 載入express
const express = require('express')
const exphbs = require('express-handlebars')
// 載入 mongoose
const mongoose = require('mongoose')

// 建構應用程式伺服器
const app = express()

app.engine('hbs', exphbs({ defaultLayout: 'main', extname: '.hbs' }))
app.set('view engine', 'hbs')

// 加入這段 code, 僅在非正式環境時, 使用 dotenv
if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}

const routes = require('./routes')
require('./config/mongoose')

// 宣告 PORT
const PORT = process.env.PORT

app.use(routes)

// 設定監聽運行訊息
app.listen(PORT, () => {
  console.log(`App is running on http://localhost:${PORT}`)
})