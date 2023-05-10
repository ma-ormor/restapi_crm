const mongoose = require('mongoose')

const Schema = mongoose.Schema

const usuario = new Schema({
  email: {
    type: String,
    unique: true,
    lowercase: true,
    trim: true },
    
  nombre: {
    type: String,
    required: 'Escribe un nombre' },
    
  password: {
    type: String,
    required: true }
})

module.exports = mongoose.model('usuarios', usuario)