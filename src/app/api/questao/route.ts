import { questaoController } from "@/server/controller/QuestaoController";

export async function GET(request: Request) {
    return await questaoController.getAllQuestoes(request);
}
