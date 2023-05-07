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
// 宣告 PORT
const PORT = process.env.PORT


// 資料庫設定
// 設定連線到 mongoDB
mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
// 取得資料庫連線狀態
const db = mongoose.connection
// 連線異常
db.on('error', () => {
  console.log('mongodb error!')
})
// 連線成功
db.once('open', () => {
  console.log('mongodb connected!')
})

// 設定路由
app.get('/', (req, res) => {
  res.render('index')
})

// 設定監聽運行訊息
app.listen(PORT, () => {
  console.log(`App is running on http://localhost:${PORT}`)
})