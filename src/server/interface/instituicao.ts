interface InstituicaoCreate {
    nome: string;
    informacao_geral: string;
    cidade: string;
    uf: string;
    website: string;
    imagem: string;
    instituicao_tipo_id: string;
    cursos: string;
}

interface InstituicaoUpdate {
    id: string;
    nome: string;
    informacao_geral: string;
    cidade: string;
    uf: string;
    website: string;
    imagem: string;
    instituicao_tipo_id: string;
    cursos: string;
    edited_at: string;
}
