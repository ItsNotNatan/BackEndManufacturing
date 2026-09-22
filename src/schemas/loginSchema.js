// ==========================================
// FILE: src/schemas/loginSchema.js (BACK-END)
// ==========================================
const { z } = require('zod');

const loginSchema = z.object({
    email: z.string({ required_error: "O e-mail é obrigatório." })
        .email("Formato de e-mail inválido."),

    senha: z.string({ required_error: "A palavra-passe é obrigatória." })
        .min(1, "A palavra-passe não pode estar vazia.")
});

module.exports = loginSchema;