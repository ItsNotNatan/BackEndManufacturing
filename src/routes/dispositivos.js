// ==========================================
// FILE: src/routes/dispositivos.js
// ==========================================
const express = require('express');
const router = express.Router();

const dispositivosController = require('../controllers/dispositivosController');
// 1. Importamos o middleware de validação que acabamos de criar
const validarDispositivo = require('../middlewares/validarDispositivo');

// 2. Colocamos o 'validarDispositivo' como guarda de trânsito ANTES do controlador
router.post('/', validarDispositivo, dispositivosController.criarDispositivo);

module.exports = router;