// ==========================================
// FILE: src/controllers/dispositivosController.js
// ==========================================
const axios = require('axios');

/**
 * Controlador responsável por receber os dados do dispositivo
 * e persisti-los na base de dados Supabase via API REST.
 */
exports.criarDispositivo = async (req, res) => {
    try {
        const dadosDoFormulario = req.body;
        console.log("📦 Dados recebidos do Front-end:", dadosDoFormulario);

        // Montagem do endpoint de destino
        const urlSupabase = `${process.env.SUPABASE_URL}/rest/v1/dispositivos`;

        // Execução da requisição HTTP POST utilizando o Axios
        const respostaSupabase = await axios.post(urlSupabase, dadosDoFormulario, {
            headers: {
                'Content-Type': 'application/json',
                'apikey': process.env.SUPABASE_SECRET_KEY,
                'Authorization': `Bearer ${process.env.SUPABASE_SECRET_KEY}`,
                'Prefer': 'return=representation'
            }
        });

        console.log("✅ Dados gravados com sucesso no Supabase!");

        // Retorna a resposta de sucesso para o cliente
        return res.status(201).json({
            mensagem: 'Dispositivo registrado com sucesso!',
            dados: respostaSupabase.data
        });

    } catch (erro) {
        // Tratamento detalhado de exceções do Axios
        if (erro.response) {
            // A requisição foi feita e o Supabase respondeu com status de erro (ex: 400, 401, 404, 500)
            console.error("🚨 Erro retornado pela API do Supabase:", erro.response.data);
            return res.status(erro.response.status).json({
                erro: 'Erro retornado pela base de dados.',
                detalhe_do_erro: erro.response.data
            });
        } else if (erro.request) {
            // A requisição foi enviada mas nenhuma resposta foi recebida (problema de rede/DNS/Firewall)
            console.error("❌ Sem resposta da rede para o Supabase:", erro.message);
            return res.status(502).json({
                erro: 'Falha de conexão com a base de dados.',
                detalhe_do_erro: erro.message
            });
        } else {
            // Erro na configuração da requisição
            console.error("❌ Erro de execução no servidor:", erro.message);
            return res.status(500).json({
                erro: 'Falha interna no servidor.',
                detalhe_do_erro: erro.message
            });
        }
    }
};