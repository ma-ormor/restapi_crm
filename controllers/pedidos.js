const Pedido = require('../models/Pedido')

exports.crear = async (req, res, next)=>{
  const pedido = new Pedido(req.body)

  try{
    await pedido.save()
    res.json('Creaste un pedido') }
  catch(error){console.log(error); next()}
}//function

exports.verPedidos = async (req, res, next)=>{
  try{
    const pedidos = Pedido.find({})
      .populate('clientes')
      .populate({path: 'pedido.producto', model: 'productos'})
    res.json(pedidos) }
  catch(error){console.log(error); next()}
}//function

exports.verPedido = async (req, res, next)=>{
  const pedido = Pedido.findById(req.params.id)
    .populate('clientes')
    .populate({path: 'pedido.producto', model: 'productos'})
  
  if(!pedido){
    res.json('El pedido no existe'); return next() }
  res.json(pedido)
}//function

exports.actualizar = async (req, res, next)=>{
  const {id} = req.params

  try{
    const pedido = await Pedido.findOneAndUpdate(
      {_id: id}, req.body, {new: true})
      .populate('clientes')
      .populate({path: 'pedido.producto', model: 'productos'})
    res.json(pedido) }
  catch(error){console.log(error); next()}
}//function

exports.eliminar = async (req, res, next)=>{
  const {id} = req.params
  
  try{
    await Pedido.findOneAndDelete({_id: id})
    res.json({mensaje: 'Eliminaste un pedido'}) }
  catch(error){console.log(error); next()}
}//function