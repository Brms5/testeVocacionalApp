interface Instituicao {
  id: string;
  nome: string;
  informacao_geral: string;
  cidade: string;
  uf: string;
  website: string;
  imagem: string;
  instituicao_tipo_id: string;
  cursos: string[];
  created_at: string;
  edited_at: string;
}

interface InstituicaoCardProps {
  id: string;
  nome: string;
  imagem: string;
  instituicao_tipo_id: string;
}
