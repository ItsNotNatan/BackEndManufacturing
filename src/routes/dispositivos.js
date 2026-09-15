// ==========================================
// FILE: src/routes/dispositivos.js (BACK-END)
// ==========================================
const express = require('express');
const router = express.Router();

// Rota POST: Recebe a solicitação de um novo dispositivo
router.post('/', async (req, res) => {
    try {
        const dadosDoFormulario = req.body;
        console.log("📦 Dados recebidos do Front-end:", dadosDoFormulario);

        // 1. Preparamos o pedido para enviar ao Supabase
        // Usamos o 'fetch' nativo do Node.js
        const respostaSupabase = await fetch(`${process.env.SUPABASE_URL}/rest/v1/dispositivos`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'apikey': process.env.SUPABASE_SECRET_KEY,
                'Authorization': `Bearer ${process.env.SUPABASE_SECRET_KEY}`,
                'Prefer': 'return=representation' // Pede ao Supabase para devolver o item gravado
            },
            body: JSON.stringify(dadosDoFormulario)
        });

        if (!respostaSupabase.ok) {
            const erroSupabase = await respostaSupabase.json();
            throw new Error(JSON.stringify(erroSupabase));
        }

        const dadosGravados = await respostaSupabase.json();

        // 2. Devolvemos a mensagem de sucesso ao Front-end
        res.status(201).json({
            mensagem: 'Dispositivo gravado com sucesso via Back-end!',
            dados: dadosGravados
        });

    } catch (erro) {
        console.error("❌ Erro ao gravar no Supabase:", erro.message);
        res.status(500).json({ erro: 'Falha interna no servidor ao gravar dispositivo.' });
    }
});

module.exports = router;