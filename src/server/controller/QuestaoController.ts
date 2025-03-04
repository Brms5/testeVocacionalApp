import { questaoRepository } from "../repository/QuestaoRepository";

async function getAllQuestoes(request: Request) {
    const response = await questaoRepository.findAll();
    const questoes = response.map((questao) => {
        return {
            id: questao.id,
            questao_nome: questao.questao_nome,
            questao_categoria: questao.questao_categoria,
        };
    });

    return new Response(JSON.stringify(questoes), { status: 200 });
}

interface QuestaoController {
    getAllQuestoes: (request: Request) => Promise<Response>;
}

export const questaoController: QuestaoController = {
    getAllQuestoes,
};
