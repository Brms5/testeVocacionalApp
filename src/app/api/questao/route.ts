import { questaoController } from "@/server/controller/QuestaoController";

export async function GET(request: Request) {
    console.log("GET /api/questao");
    return await questaoController.getAllQuestoes(request);
}
