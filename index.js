const express = require('express')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const cors = require('cors')

const routes = require('./routes/index.js')

require('dotenv').config({path: '.env'})

const 
  app = express(),
  puerto = process.env.PORT || 5000,
  host = process.env.HOST || '0.0.0.0'
// Público
app.use(express.static('uploads'))
// Body Parser
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))
// Base de Datos
mongoose.Promise = global.Promise

mongoose.connect(process.env.DB_URL, {
  useNewUrlParser: true,
  family: 4,
  useUnifiedTopology: true })
    .then(()=>console.log('hola'))
    .catch(error=>console.log('error', error))
// Cors
const 
  whitelist = [process.env.FRONTEND_URL],
  opciones = {
    origin: (origin, cb)=>{
      const existe = whitelist.some(dominio => dominio === origin)

      if(!existe)
        return cb(new Error('No estás en la lista'))
      cb(null, true) } }

app.use(cors(opciones))
// Rutas
app.use('/', routes())

app.listen(puerto, ()=>console.log('localhost:'+puerto))

app.listen(puerto, host, ()=>console.log(host+':'+puerto))