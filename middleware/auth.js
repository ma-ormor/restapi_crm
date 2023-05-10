const jwt = require('jsonwebtoken')

module.exports = (req, res, next)=>{
  let revisar

  const authHeader = req.get('Authorization')

  if(!authHeader){
    const error = new Error('Sin JWT')

    error.statusCode = 401
    throw error }

  const token = authHeader.split(' ')[1]

  try{
    revisar = jwt.verify(token, 'secreta')
  }catch(error){
    error.statusCode = 500
    throw error }

  if(!revisar){
    const error = new Error('Sin autenticar')

    error.statusCode = 401
    throw error }

  next()
}//function