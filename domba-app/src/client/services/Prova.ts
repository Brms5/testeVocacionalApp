import { provaSchema } from "@/server/schema/prova";

function getProvaByModalidadeDeIngressoId(id: string): Promise<Prova[]> {
  return fetch(`/api/prova/modalidade-de-ingresso/${id}`).then(
    async (response) => {
      if (!response.ok) {
        throw new Error(response.statusText);
      }

      const provaResponse = await response.json();
      const prova = provaSchema.array().safeParse(provaResponse);
      if (!prova.success) {
        throw new Error("Erro ao buscar prova");
      }

      return prova.data;
    }
  );
}

interface ProvaService {
  getProvaByModalidadeDeIngressoId: (id: string) => Promise<Prova[]>;
}

export const provaService: ProvaService = {
  getProvaByModalidadeDeIngressoId,
};
