const express = require('express')
const bodyParser = require('body-parser')
const db = require('./queries')
const Cors = require('cors')
const app = express()
const port = process.env.VUE_APP_API_PORT || 5000

app.use(bodyParser.json())
app.use(
  bodyParser.urlencoded({
    extended: true
  })
)
app.use(
  Cors({
    'Access-Control-Allow-Origin': '*',
    'Content-Type': 'application/json'
  })
)

app.get('/surveys', db.getSurveys)

app.listen(port, () => {
  console.log(`Listening in port ${port}`)
})
