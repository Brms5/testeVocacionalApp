import { supabase } from "../infra/database/supabase";
import { Questao, questaoSchema } from "../schema/Questao";

async function findAll(): Promise<Questao[]> {
    const { data, error } = await supabase.from("questao").select("*");
    if (error) {
        throw error;
    }

    const parsedData = questaoSchema.array().safeParse(data);
    if (!parsedData.success) {
        throw new Error(parsedData.error.errors[0].message);
    }

    const questoes = parsedData.data;
    console.log("QUESTOES", questoes);
    return questoes;
}

interface QuestaoRepository {
    findAll: () => Promise<Questao[]>;
}

export const questaoRepository: QuestaoRepository = {
    findAll,
};
