import { z as schema } from "zod";

export const resultadoRiasecSchema = schema.object({
    id: schema.string().uuid(),
    categoria: schema.string(),
    descricao: schema.string(),
    emprego_curso: schema.string().array(),
    created_at: schema.string(),
    edited_at: schema.string(),
});

export type ResultadoRiasec = schema.infer<typeof resultadoRiasecSchema>;
