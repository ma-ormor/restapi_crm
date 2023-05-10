const Cliente = require('../models/Cliente')

exports.crear = async (req, res, next)=>{
  const cliente = new Cliente(req.body)

  console.log(cliente)

  try{
    await cliente.save()
    res.json({mensaje: 'Creaste un nuevo cliente'}) }
  catch(error){
    res.send(error); next() }
}//function

exports.mostrarTodos = async (req, res, next)=>{
  const clientes = await Cliente.find({})

  try{
    res.json(clientes) }
  catch(error){
    console.log(error); next() }
}//function

exports.mostrar = async (req, res, next)=>{
  const cliente = await Cliente.findById(req.params.id)

  if(!cliente){
    res.json({mensaje: 'El cliente no existe'})
    return next() }

  res.json(cliente)
}//function

exports.cambiar = async (req, res, next)=>{
  try{
    const cliente = await Cliente.findOneAndUpdate(
      {_id: req.params.id}, req.body)

    res.json(cliente)
  }catch(error){
    res.send(error); next() }
}//function

exports.eliminar = async (req, res, next)=>{
  try{
    await Cliente.findOneAndDelete({_id: req.params.id})
    res.json({mensaje: 'Eliminado'}) }
  catch(error){
    console.log(error); next() }
}//function