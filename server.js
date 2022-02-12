const express = require('express')
const app = express()
const mysql = require('mysql')
const cors = require('cors')
require('dotenv').config()


var Tx = require("ethereumjs-tx").Transaction
const Web3 = require('web3')
const web3 = new Web3('https://data-seed-prebsc-1-s1.binance.org:8545');


app.use(express.static("public"))
app.use(cors())

// app.use(express.urlencoded({
// 	extended: true
// }))

// app.use(function(req, res, next){
// 	res.setHeader("Content-Type", "application/json")
// 	res.setHeader("Content-Type", "text/html")
// 	next()
// })

app.use(express.json())

app.set('view engine', 'ejs')

var router = require('./api/api.js')
app.use('/bnb', router)








app.listen(4000, ()=> console.log('Listenning @ port 4000'))