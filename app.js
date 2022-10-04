const express = require('express')
const Cors = require('cors')

const indexRouter = require('./routes/indexRouter')

const APP = express()

APP.options('*', Cors())
APP.use(function (req, res, next) {
   // mengizinkan semua bisa akses
   res.setHeader('Access-Control-Allow-Origin', '*');

   // mengizinkan method apa saja yang bisa di kontrol
   res.setHeader('Access-Control-Allow-Method', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
   console.log('masuk')
   next();
})

APP.use(express.json())
APP.use(express.urlencoded({ extended: false }))

APP.use(indexRouter)

APP.listen(5000, () => {
   console.log(`Example app listening on port 5000`)
 })

module.exports = APP;