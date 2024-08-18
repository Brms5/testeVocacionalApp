import { z as schema } from "zod";

export const modalidadeNomeSchema = schema.object({
    id: schema.string().uuid(),
    nome: schema.string(),
    created_at: schema.string(),
    edited_at: schema.string(),
});
