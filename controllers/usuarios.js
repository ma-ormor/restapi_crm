const Usuario = require('../models/Usuario')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')

exports.crear = async ({body}, res)=>{
  const usuario = new Usuario(body)

  usuario.password = await bcrypt.hash(body.password, 12)

  try{
    await usuario.save()
    res.json({mensaje: 'Creaste un usuario'}) }
  catch(error){
    console.log(error)
    res.json({mensaje: 'Error'}) }
}//function

exports.entrar = async (req, res, next)=>{
  const {
    email, password} = req.body,
    usuario = await Usuario.findOne({email}) 

  if(!usuario)
    return await res.status(401).json({
      mensaje: 'Usuario no existe'})

  if(!contraCorrecta(usuario.password))
    return await res.status(401).json({
      mensaje: 'Contraseña mala'})
  
  const token = jwt.sign({
    email,
    nombre: usuario.nombre,
    id: usuario._id },
  'secreta', {
    expiresIn: '1h' })

  res.json({token})
}//function

const contraCorrecta = contrasena=>{
  return bcrypt.compareSync(password, contrasena)
}//function