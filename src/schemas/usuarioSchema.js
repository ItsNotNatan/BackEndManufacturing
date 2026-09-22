// ==========================================
// FILE: src/schemas/usuarioSchema.js
// ==========================================
const { z } = require('zod');

// Validação rigorosa para a criação de um novo utilizador
const usuarioSchema = z.object({
    nome: z.string({ required_error: "O nome é obrigatório." }).min(2, "O nome deve ter pelo menos 2 caracteres."),
    email: z.string({ required_error: "O email é obrigatório." }).email("Formato de email inválido."),
    cargo: z.enum(['normal', 'orcamento', 'admin_area'], {
        required_error: "O cargo é obrigatório.",
        invalid_type_error: "Cargo inválido. Escolha entre: normal, orcamento ou admin_area."
    }),
    status: z.string().default('ativo')
});

module.exports = usuarioSchema;