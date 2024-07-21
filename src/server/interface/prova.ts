interface ProvaCreate {
    nome: string;
    data_prova: string;
    modalidade_de_ingresso_id: string;
}

interface ProvaUpdate {
    id: string;
    nome: string;
    data_prova: string;
    modalidade_de_ingresso_id: string;
    edited_at: string;
}
