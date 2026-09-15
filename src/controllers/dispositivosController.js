// ==========================================
// FILE: src/controllers/dispositivosController.js
// ==========================================

// Função responsável por criar um novo dispositivo
exports.criarDispositivo = async (req, res) => {
    try {
        const dadosDoFormulario = req.body;
        console.log("📦 Dados recebidos:", dadosDoFormulario);

        const respostaSupabase = await fetch(`${process.env.SUPABASE_URL}/rest/v1/dispositivos`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'apikey': process.env.SUPABASE_SECRET_KEY,
                'Authorization': `Bearer ${process.env.SUPABASE_SECRET_KEY}`,
                'Prefer': 'return=representation'
            },
            body: JSON.stringify(dadosDoFormulario)
        });

        if (!respostaSupabase.ok) throw new Error("Falha no Supabase");

        const dadosGravados = await respostaSupabase.json();

        res.status(201).json({
            mensagem: 'Sucesso!',
            dados: dadosGravados
        });

    } catch (erro) {
        console.error("❌ Erro:", erro.message);
        res.status(500).json({ erro: 'Falha interna.' });
    }
};