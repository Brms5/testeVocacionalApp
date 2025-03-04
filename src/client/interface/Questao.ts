interface Questao {
    id: string;
    questao_nome: string;
    questao_categoria: string;
}

interface QuestaoGetAllResponse {
    questoes: Questao[];
}
