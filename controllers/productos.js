const multer = require('multer')
const shortid = require('shortid')

const Producto = require('../models/Producto')

exports.crear = async (req, res, next)=>{
  const producto = new Producto(req.body)

  try{
    if(req.file?.filename)
      producto.imagen = req.file.filename

    await producto.save()
    res.json({mensaje: 'Creaste un producto'})}
  catch(error){
    console.log(error); next()}
}//function

const configuracion = {
  storage: fileStorage = multer.diskStorage({
    destination: (req, file, next)=>{
      next(null, __dirname+'../../uploads') },
    filename: (req, file, next)=>{
      const extension = file.mimetype.split('/')[1]
      next(null, `${shortid.generate()}.${extension}`) }
  }),

  fileFilter(req, file, next){
    if(
      file.mimetype === 'image/jpeg' || 
      file.mimetype === 'image/png' )
      
      next(null, true)
    else next(
      new Error('Formato no válido '+file.mimetype), false)
  }
}//configuracion

const upload = multer(configuracion).single('imagen')

exports.subirImagen = (req, res, next)=>{
  upload(req, res, function(error){
    if(error) 
      return res.json({mensaje: error})
    next()})
}//function

exports.verProductos = async (req, res, next)=>{
  try{
    const productos = await Producto.find({})
    res.json(productos) }
  catch(error){console.log(error); next()}
}//function

exports.verProducto = async (req, res, next)=>{
  const producto = await Producto.findById(req.params.id)

  if(!producto){
    res.json('No existe el producto'); return next()}

  res.json(producto)
}//function

exports.actualizar = async (req, res, next)=>{
  const {id} = req.params
  
  try{
    const 
      producto = await Producto.findById(id),
      datos = req.body

    if(req.file)
      datos.imagen = req.file.filename
    else datos.imagen = producto.imagen

    const resultado = await Producto.findOneAndUpdate(
      {_id: id}, datos, {new: true} )
    res.json(resultado) }

  catch(error){console.log(error); next()}
}//function

exports.eliminar = async (req, res, next)=>{
  const {id} = req.params
  
  try{
    await Producto.findOneAndDelete({_id: id})
    res.json({mensaje: 'Eliminaste un producto'}) }
  catch(error){console.log(error); next()}
}//function

exports.buscar = async (req, res, next)=>{
  const {query} = req.params

  try{
    const productos = Producto.find({
      nombre: new RegExp(query, 'i') })
    res.json(productos) }
  catch(error){console.log(error); next()}
}//function