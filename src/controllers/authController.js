// ==========================================
// FILE: src/controllers/authController.js (BACK-END)
// ==========================================
const axios = require('axios');

exports.autenticar = async (req, res) => {
    const { email, senha } = req.body;
    console.log(`🔑 Tentativa de login para: ${email}`);

    // Busca o utilizador no Supabase filtrando pelo e-mail
    const urlSupabase = `${process.env.SUPABASE_URL}/rest/v1/usuarios?email=eq.${encodeURIComponent(email)}&select=*,areas(id,nome)`;

    const resposta = await axios.get(urlSupabase, {
        headers: {
            'apikey': process.env.SUPABASE_SECRET_KEY,
            'Authorization': `Bearer ${process.env.SUPABASE_SECRET_KEY}`
        }
    });

    const usuario = resposta.data[0];

    // 1. Verifica se o e-mail existe
    if (!usuario) {
        return res.status(401).json({
            sucesso: false,
            erro: 'E-mail ou palavra-passe incorretos.'
        });
    }

    // 2. Compara a palavra-passe enviada com a palavra-passe guardada na base de dados
    if (usuario.senha !== senha) {
        return res.status(401).json({
            sucesso: false,
            erro: 'E-mail ou palavra-passe incorretos.'
        });
    }

    console.log(`✅ Login autorizado com sucesso para: ${usuario.nome} (${usuario.areas?.nome})`);

    // 3. Retorna a resposta limpa para o Front-end alimentar o Zustand
    return res.status(200).json({
        sucesso: true,
        mensagem: 'Login realizado com sucesso!',
        dados: {
            id: usuario.id,
            nome: usuario.nome,
            email: usuario.email,
            nivel_acesso: usuario.nivel_acesso,
            area_id: usuario.area_id,
            nome_area: usuario.areas?.nome || 'Geral'
        }
    });
};