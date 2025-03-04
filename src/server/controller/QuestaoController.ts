import { questaoRepository } from "../repository/QuestaoRepository";

async function getAllQuestoes(request: Request) {
    console.log("Questao Controller - getAllQuestoes");
    const questoes = await questaoRepository.findAll();
    return new Response(JSON.stringify(questoes), { status: 200 });
}

interface QuestaoController {
    getAllQuestoes: (request: Request) => Promise<Response>;
}

export const questaoController: QuestaoController = {
    getAllQuestoes,
};
