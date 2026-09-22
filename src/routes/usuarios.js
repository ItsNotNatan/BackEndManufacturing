// ==========================================
// FILE: src/routes/usuarios.js
// ==========================================
const express = require('express');
const router = express.Router();

const usuariosController = require('../controllers/usuariosController');
const validarSchema = require('../middlewares/validarSchema');
const asyncHandler = require('../middlewares/asyncHandler');
const usuarioSchema = require('../schemas/usuarioSchema');

// ROTA GET: Buscar a lista de todos os utilizadores (Para a tabela do Admin)
router.get(
    '/',
    asyncHandler(usuariosController.listarUsuarios)
);

// ROTA POST: Adicionar um novo utilizador (Apenas para Admins da Área)
router.post(
    '/',
    validarSchema(usuarioSchema),
    asyncHandler(usuariosController.criarUsuario)
);

module.exports = router;