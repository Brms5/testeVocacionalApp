import { z as schema } from "zod";

export const instituicaoTipoSchema = schema.object({
  id: schema.string().uuid(),
  nome: schema.string(),
  created_at: schema.string(),
  edited_at: schema.string(),
});

export type InstituicaoTipo = schema.infer<typeof instituicaoTipoSchema>;
