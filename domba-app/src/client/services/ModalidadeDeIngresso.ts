import { modalidadeDeIngressoSchema } from "@/server/schema/modalidadeDeIngresso";

function getModalidadeDeIngressoByInstituicaoId(
  id: string
): Promise<ModalidadeDeIngresso[]> {
  return fetch(`/api/modalidade-de-ingresso/instituicao/${id}`).then(
    async (response) => {
      if (!response.ok) {
        throw new Error(response.statusText);
      }

      const modalidadeDeIngressoResponse = await response.json();
      const modalidadeDeIngresso = modalidadeDeIngressoSchema
        .array()
        .safeParse(modalidadeDeIngressoResponse);
      if (!modalidadeDeIngresso.success) {
        throw new Error("Erro ao buscar modalidade de ingresso");
      }

      return modalidadeDeIngresso.data;
    }
  );
}

interface ModalidadeDeIngressoService {
  getModalidadeDeIngressoByInstituicaoId: (
    id: string
  ) => Promise<ModalidadeDeIngresso[]>;
}

export const modalidadeDeIngressoService: ModalidadeDeIngressoService = {
  getModalidadeDeIngressoByInstituicaoId,
};
