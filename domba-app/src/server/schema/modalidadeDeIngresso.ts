import { z as schema } from "zod";

export const modalidadeDeIngressoSchema = schema.object({
  id: schema.string().uuid(),
  modalidade: schema.string(),
  data_inscricao_inicio: schema.string(),
  data_inscricao_final: schema.string(),
  data_isencao: schema.string(),
  valor: schema.string(),
  link: schema.string(),
  created_at: schema.string(),
  edited_at: schema.string(),
  criterio_id: schema.string().uuid().nullable(),
  instituicao_id: schema.string().uuid().nullable(),
});

export type ModalidadeDeIngresso = schema.infer<typeof modalidadeDeIngressoSchema>;
