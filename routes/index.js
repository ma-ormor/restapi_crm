const express = require('express')
const clientes = require('../controllers/clientes')
const productos = require('../controllers/productos')
const pedidos = require('../controllers/pedidos')
const usuarios = require('../controllers/usuarios')
const esUsuario = require('../middleware/auth')

const router = express.Router()

module.exports = function(){
  // Clientes
  router.post('/clientes',
    esUsuario, 
    clientes.crear)
  router.get('/clientes',
    esUsuario, 
    clientes.mostrarTodos)
  router.get('/clientes/:id',
    esUsuario, 
    clientes.mostrar)
  router.put('/clientes/:id',
    esUsuario, 
    clientes.cambiar)
  router.delete('/clientes/:id',
    esUsuario, 
    clientes.eliminar)
    
  // Productos
  router.post('/productos', 
    esUsuario, productos.subirImagen, productos.crear)
  router.get('/productos',
    esUsuario,  
    productos.verProductos)
  router.get('/productos/:id',
    esUsuario,  
    productos.verProducto)
  router.put('/productos/:id',
    esUsuario, 
    productos.subirImagen,
    esUsuario,  productos.actualizar)
  router.delete('/productos/:id',
    esUsuario, 
    productos.eliminar)
  router.post('/productos/busqueda/:query',
    esUsuario, 
    productos.buscar)

  // Pedidos
  router.post('/pedidos', 
    pedidos.crear)
  router.get('/pedidos', 
    pedidos.verPedidos)
  router.get('/pedidos/:id', 
    pedidos.verPedido)
  router.put('/pedidos/:id', 
    pedidos.actualizar)
  router.delete('/pedidos/:id', 
    pedidos.eliminar)

  // Usuarios
  router.post('/crear-cuenta',
    usuarios.crear)
  router.post('/entrar',
    usuarios.entrar)

  return router
}//function
