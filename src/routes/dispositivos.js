// ==========================================
// FILE: src/routes/dispositivos.js
// ==========================================
const express = require('express');
const router = express.Router();

// Importamos o controlador que acabámos de criar
const dispositivosController = require('../controllers/dispositivosController');

// Quando alguém fizer um POST para '/', o controlador trata disso
router.post('/', dispositivosController.criarDispositivo);

module.exports = router;