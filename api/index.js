const express = require('express')
const bodyParser = require('body-parser')
const db = require('./queries')
const Cors = require('cors')
const app = express()
const paramPort = process.argv.findIndex((dex) => dex == '--port')
const port = paramPort > 0 ? process.argv[paramPort + 1] : process.env.VUE_APP_API_PORT || 5000

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
app.get('/survey/:id', db.getSurveyById)
app.post('/survey/update/:id', db.updateSurvey)
app.post('/survey/create', db.createSurvey)
app.post('/survey/delete/:id', db.deleteSurvey)
app.get('/options', db.getOptions)
app.get('/option/:id', db.getOptionById)
app.post('/option/update/:id', db.updateOption)
app.post('/option/create', db.createOption)
app.post('/option/delete/:id', db.deleteOption)

app.listen(port, () => {
  console.log(`Listening in port ${port}`)
})
