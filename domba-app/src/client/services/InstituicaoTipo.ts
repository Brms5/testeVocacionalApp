import { instituicaoTipoSchema } from "@/server/schema/instituicaoTipo";

function getInstituicaoTipo(): Promise<InstituicaoTipo[]> {
  return fetch("/api/instituicao-tipo").then(
    async (response) => {
      if (!response.ok) {
        throw new Error(response.statusText);
      }

      const instituicaoTipoResponse = await response.json();
      const instituicaoTipo = instituicaoTipoSchema
        .array()
        .safeParse(instituicaoTipoResponse);
      if (!instituicaoTipo.success) {
        throw new Error("Erro ao buscar instituições");
      }

      return instituicaoTipo.data;
    }
  );
}

interface InstituicaoTipoService {
  getInstituicaoTipo: () => Promise<InstituicaoTipo[]>;
}

export const instituicaoTipoService: InstituicaoTipoService = {
  getInstituicaoTipo,
};