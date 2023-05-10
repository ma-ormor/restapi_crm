const mongoose = require('mongoose')

const Schema = mongoose.Schema

const producto = new Schema({
  nombre: {
    type: String,
    trim: true },
  precio: {
    type: Number },
  imagen: {
    type: String }
})

module.exports = mongoose.model('productos', producto)