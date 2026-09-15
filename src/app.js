// ==========================================
// FILE: src/app.js
// ==========================================
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');

// Inicializamos a aplicação Express
const app = express();

// --- 1. MIDDLEWARES DE SEGURANÇA E REGISTO ---

// Helmet: Adiciona cabeçalhos HTTP que protegem contra ataques comuns
app.use(helmet());

// CORS: Permite que o teu Front-end (React) comunique com este Back-end
app.use(cors({
    origin: ['http://localhost:5173', 'http://127.0.0.1:5173'], // Autoriza o teu Vite local
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true
}));

// Morgan: Regista (log) todos os pedidos que chegam ao servidor no terminal
app.use(morgan('dev'));

// Permite que o servidor entenda pedidos com dados no formato JSON (como o teu formulário)
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// --- 2. ROTAS INICIAIS ---

// Rota de teste para garantir que o servidor está "vivo"
app.get('/api/status', (req, res) => {
    res.status(200).json({
        mensagem: 'Servidor NexusFactory está operacional!',
        timestamp: new Date().toISOString()
    });
});

// Futuramente, importaremos as rotas de dispositivos e utilizadores aqui.
// Exemplo: app.use('/api/dispositivos', rotasDeDispositivos);

// Exportamos a aplicação configurada para ser usada no server.js
module.exports = app;