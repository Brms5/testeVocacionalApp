import { z as schema } from "zod";

export const provaSchema = schema.object({
  id: schema.string().uuid(),
  nome: schema.string(),
  data_prova: schema.string(),
  modalidade_de_ingresso_id: schema.string().uuid(),
  created_at: schema.string(),
  edited_at: schema.string(),
});

export type Prova = schema.infer<typeof provaSchema>;
