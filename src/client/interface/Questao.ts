type RiasecCategory =
    | "Realista"
    | "Investigativo"
    | "Artístico"
    | "Social"
    | "Empreendedor"
    | "Convencional";

interface Questao {
    id: string;
    questao_nome: string;
    questao_categoria: RiasecCategory;
}

interface QuestaoGetAllResponse {
    questoes: Questao[];
}
