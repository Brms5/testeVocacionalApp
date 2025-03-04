function getAllQuestao(): Promise<Questao[]> {
    return fetch("/api/questao").then(async (response) => {
        if (!response.ok) {
            throw new Error(response.statusText);
        }

        const questaoResponse = await response.json();
        return questaoResponse;
    });
}

interface QuestaoService {
    getAllQuestao: () => Promise<Questao[]>;
}

export const questaoService: QuestaoService = {
    getAllQuestao,
};
