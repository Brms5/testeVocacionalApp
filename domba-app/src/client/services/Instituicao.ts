import { instituicaoSchema } from "@/server/schema/instituicao";

function getInstituicao(): Promise<Instituicao[]> {
  return fetch("/api/instituicao").then(async (response) => {
    if (!response.ok) {
      throw new Error(response.statusText);
    }

    const instituicaoReponse = await response.json();
    const instituicao = instituicaoSchema.array().safeParse(instituicaoReponse);
    if (!instituicao.success) {
      throw new Error("Erro ao buscar instituições");
    }

    return instituicao.data;
  });
}

function getInstituicaoByName(nome: string): Promise<Instituicao> {
  return fetch(`/api/instituicao/nome/${nome}`).then(async (response) => {
    if (!response.ok) {
      throw new Error(response.statusText);
    }

    const instituicaoReponse = await response.json();
    const instituicao = instituicaoSchema.safeParse(instituicaoReponse);
    if (!instituicao.success) {
      throw new Error("Erro ao buscar instituição");
    }
    
    return instituicao.data;
  });
}

function getInstituicaoByInstituicaoTipoId(instituicaoTipoId: string[]): Promise<Instituicao[]> {
  return fetch(`/api/instituicao/instituicao-tipo/${instituicaoTipoId}`).then(async (response) => {
    if (!response.ok) {
      throw new Error(response.statusText);
    }

    const instituicaoReponse = await response.json();
    const instituicao = instituicaoSchema.array().safeParse(instituicaoReponse);
    if (!instituicao.success) {
      throw new Error("Erro ao buscar instituições");
    }

    return instituicao.data;
  });
}

interface InstituicaoService {
  getInstituicao: () => Promise<Instituicao[]>;
  getInstituicaoByName: (nome: string) => Promise<Instituicao>;
  getInstituicaoByInstituicaoTipoId: (instituicaoTipoId: string[]) => Promise<Instituicao[]>;
}

export const instituicaoService: InstituicaoService = {
  getInstituicao,
  getInstituicaoByName,
  getInstituicaoByInstituicaoTipoId,
};
