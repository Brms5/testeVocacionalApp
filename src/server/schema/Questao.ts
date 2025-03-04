import { z as schema } from "zod";

export const questaoSchema = schema.object({
    id: schema.string().uuid(),
    questao_nome: schema.string(),
    created_at: schema.string(),
});

export type Questao = schema.infer<typeof questaoSchema>;
