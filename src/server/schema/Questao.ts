import { z as schema } from "zod";

export const questaoSchema = schema.object({
    id: schema.string().uuid(),
    questao_nome: schema.string(),
    questao_categoria: schema.string(),
    created_at: schema.string(),
    edited_at: schema.string(),
});

export type Questao = schema.infer<typeof questaoSchema>;
