import { instituicaoTipoSchema } from "@/server/schema/instituicaoTipo";

function getInstituicaoTipo(): Promise<InstituicaoTipo[]> {
    return fetch("/api/instituicao-tipo").then(async (response) => {
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
    });
}

function getInstituicaoTipoById(id: string): Promise<InstituicaoTipo> {
    return fetch(`/api/instituicao-tipo/${id}`).then(async (response) => {
        if (!response.ok) {
            throw new Error(response.statusText);
        }

        const instituicaoTipoResponse = await response.json();
        const instituicaoTipo = instituicaoTipoSchema.safeParse(
            instituicaoTipoResponse
        );
        if (!instituicaoTipo.success) {
            throw new Error("Erro ao buscar instituição");
        }

        return instituicaoTipo.data;
    });
}

interface InstituicaoTipoService {
    getInstituicaoTipo: () => Promise<InstituicaoTipo[]>;
    getInstituicaoTipoById: (id: string) => Promise<InstituicaoTipo>;
}

export const instituicaoTipoService: InstituicaoTipoService = {
    getInstituicaoTipo,
    getInstituicaoTipoById,
};
