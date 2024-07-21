import { z as schema } from "zod";

export const usuarioSchema = schema.object({
    id: schema.string().uuid(),
    email: schema.string(),
    nome: schema.string(),
    senha: schema.string(),
    role: schema.string().uuid(),
    created_at: schema.string(),
    edited_at: schema.string(),
});

export type Usuario = schema.infer<typeof usuarioSchema>;
