// ==========================================
// FILE: src/app.js (BACK-END CONCLUÍDO)
// ==========================================
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');

// 1. Importação das opções de CORS e Middleware de Erros
const origensPermitidas = require('./config/corsOptions');
const tratarErros = require('./middlewares/tratarErros');

// 2. Importação dos Roteadores da Aplicação
const rotasDeDispositivos = require('./routes/dispositivos');
const rotasDeUsuarios = require('./routes/usuarios');
const rotasDeAuth = require('./routes/auth'); // ✨ NOVO: Rota de Autenticação / Login

// 3. Inicialização do servidor Express
const app = express();

// --- MIDDLEWARES DE SEGURANÇA E REGISTO ---
app.use(helmet());

app.use(cors({
    origin: origensPermitidas,
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true
}));

app.use(morgan('dev'));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// --- ROTAS DA APLICAÇÃO ---

// Healthcheck (Verificação de estado)
app.get('/api/status', (req, res) => {
    res.status(200).json({
        mensagem: 'Servidor NexusFactory está operacional!',
        timestamp: new Date().toISOString()
    });
});

// Mapeamento dos endpoints principais
app.use('/api/dispositivos', rotasDeDispositivos);
app.use('/api/usuarios', rotasDeUsuarios);
app.use('/api/auth', rotasDeAuth); // ✨ NOVO: Ativa o endpoint POST /api/auth/login

// --- TRATAMENTO GLOBAL DE ERROS ---
// Obrigatoriamente o último middleware registrado
app.use(tratarErros);

module.exports = app;