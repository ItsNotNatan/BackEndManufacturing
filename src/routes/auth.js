// ==========================================
// FILE: src/routes/auth.js (BACK-END)
// ==========================================
const express = require('express');
const router = express.Router();

const authController = require('../controllers/authController');
const validarSchema = require('../middlewares/validarSchema');
const asyncHandler = require('../middlewares/asyncHandler');
const loginSchema = require('../schemas/loginSchema');

// ROTA POST: Processa a autenticação do utilizador (E-mail e Palavra-passe)
router.post(
    '/login',
    validarSchema(loginSchema),
    asyncHandler(authController.autenticar)
);

module.exports = router;