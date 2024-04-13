import { z as schema } from "zod";

export const instituicaoSchema = schema.object({
  id: schema.string().uuid(),
  nome: schema.string(),
  informacao_geral: schema.string(),
  cidade: schema.string(),
  uf: schema.string(),
  website: schema.string(),
  imagem: schema.string(),
  instituicao_tipo_id: schema.string().uuid(),
  cursos: schema.array(schema.string()),
  created_at: schema.string(),
  edited_at: schema.string(),
});

export type Instituicao = schema.infer<typeof instituicaoSchema>;