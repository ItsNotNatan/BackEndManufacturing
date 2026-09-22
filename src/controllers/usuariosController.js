// ==========================================
// FILE: src/controllers/usuariosController.js
// ==========================================
const axios = require('axios');

/**
 * Busca todos os utilizadores registados no Supabase.
 */
exports.listarUsuarios = async (req, res) => {
    console.log("👥 A buscar lista de utilizadores no Supabase...");

    const urlSupabase = `${process.env.SUPABASE_URL}/rest/v1/usuarios?select=*`;

    const respostaSupabase = await axios.get(urlSupabase, {
        headers: {
            'apikey': process.env.SUPABASE_SECRET_KEY,
            'Authorization': `Bearer ${process.env.SUPABASE_SECRET_KEY}`
        }
    });

    console.log(`✅ Foram encontrados ${respostaSupabase.data.length} utilizadores.`);

    return res.status(200).json({
        sucesso: true,
        dados: respostaSupabase.data
    });
};

/**
 * Cria um novo utilizador na base de dados Supabase via API REST.
 * Os dados já chegam validados pelo middleware do Zod.
 */
exports.criarUsuario = async (req, res) => {
    const dadosDoFormulario = req.body;
    console.log("👤 Dados de novo utilizador validados:", dadosDoFormulario);

    const urlSupabase = `${process.env.SUPABASE_URL}/rest/v1/usuarios`;

    try {
        const respostaSupabase = await axios.post(urlSupabase, dadosDoFormulario, {
            headers: {
                'Content-Type': 'application/json',
                'apikey': process.env.SUPABASE_SECRET_KEY,
                'Authorization': `Bearer ${process.env.SUPABASE_SECRET_KEY}`,
                'Prefer': 'return=representation'
            }
        });

        console.log("✅ Novo utilizador gravado com sucesso no Supabase!");

        return res.status(201).json({
            sucesso: true,
            mensagem: 'Utilizador adicionado com sucesso!',
            dados: respostaSupabase.data
        });
    } catch (erro) {
        // Captura o erro específico caso o email já exista na base de dados (regra UNIQUE)
        if (erro.response && erro.response.data && erro.response.data.code === '23505') {
            return res.status(409).json({
                sucesso: false,
                erro: 'Já existe um utilizador registado com este endereço de email.'
            });
        }
        throw erro; // Repassa outros erros para o tratador global (asyncHandler)
    }
};