// ==========================================
// FILE: src/schemas/usuarioSchema.js
// ==========================================
const { z } = require('zod');

/**
 * Validação rigorosa do utilizador vinculada à sua Área e Nível de Acesso
 */
const usuarioSchema = z.object({
    nome: z.string({ required_error: "O nome é obrigatório." })
        .min(2, "O nome deve ter pelo menos 2 caracteres."),

    email: z.string({ required_error: "O e-mail é obrigatório." })
        .email("Formato de e-mail inválido."),

    nivel_acesso: z.enum(['normal', 'admin_area'], {
        required_error: "O nível de acesso é obrigatório.",
        invalid_type_error: "Nível de acesso inválido. Use 'normal' ou 'admin_area'."
    }).default('normal'),

    area_id: z.number({ required_error: "A área é obrigatória." })
        .int("O ID da área deve ser um número inteiro.")
        .min(1, "Selecione uma área válida (1-Orçamento, 2-Planejamento, 3-Manufatura).")
        .max(3, "Área inválida."),

    status: z.string().default('ativo')
});

module.exports = usuarioSchema;