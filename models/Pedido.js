const mongoose = require('mongoose')

const Schema = mongoose.Schema

const pedido = new Schema({
  cliente: {
    type: Schema.ObjectId,
    ref: 'clientes' },
  productos: [{
    producto: {
      type: Schema.ObjectId,
      ref: 'productos' },
    cantidad: Number }],
  total: Number
})

module.exports = mongoose.model('pedidos', pedido)