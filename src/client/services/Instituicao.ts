import { instituicaoSchema } from "@/server/schema/instituicao";

function getInstituicao(): Promise<Instituicao[]> {
    return fetch("/api/instituicao").then(async (response) => {
        if (!response.ok) {
            throw new Error(response.statusText);
        }

        const instituicaoReponse = await response.json();
        const instituicao = instituicaoSchema
            .array()
            .safeParse(instituicaoReponse);
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

function getInstituicaoByInstituicaoTipoId(
    instituicaoTipoId: string[]
): Promise<Instituicao[]> {
    return fetch(`/api/instituicao/instituicao-tipo/${instituicaoTipoId}`).then(
        async (response) => {
            if (!response.ok) {
                throw new Error(response.statusText);
            }

            const instituicaoReponse = await response.json();
            const instituicao = instituicaoSchema
                .array()
                .safeParse(instituicaoReponse);
            if (!instituicao.success) {
                throw new Error("Erro ao buscar instituições");
            }

            return instituicao.data;
        }
    );
}

function saveInstituicao(
    instituicao: InstituicaoCreateProps
): Promise<Instituicao> {
    return fetch("/api/instituicao", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Authorization: `${localStorage.getItem("token")}`,
        },
        body: JSON.stringify(instituicao),
    })
        .then(async (res) => {
            console.log("res: ", res);
            if (!res.ok) {
                console.log(res);
                throw new Response(res.statusText, { status: 400 });
            }

            const instituicaoReponse = await res.json();
            const instituicao = instituicaoSchema.safeParse(instituicaoReponse);
            if (!instituicao.success) {
                throw new Error("Erro ao salvar instituição");
            }

            return instituicao.data;
        })
        .catch((error) => {
            throw new Response(error, { status: 400 });
        });
}

function updateInstituicao(
    instituicao: InstituicaoCreateProps
): Promise<Instituicao> {
    return fetch("/api/instituicao", {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
            Authorization: `${localStorage.getItem("token")}`,
        },
        body: JSON.stringify(instituicao),
    }).then(async (response) => {
        if (!response.ok) {
            throw new Error(response.statusText);
        }

        const instituicaoReponse = await response.json();
        const instituicao = instituicaoSchema.safeParse(instituicaoReponse);
        if (!instituicao.success) {
            throw new Error("Erro ao atualizar instituição");
        }

        return instituicao.data;
    });
}

function deleteInstituicao(nome: string): Promise<void> {
    return fetch("/api/instituicao", {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
            Authorization: `${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({ nome }),
    })
        .then(async (response) => {
            if (!response.ok) {
                console.log("RESPONSE SERVICE: ", response);
                throw new Error(response.statusText);
            }
            console.log("RESPONSE SERVICE: ", response);
        })
        .catch((error) => {
            console.log("DELETE: ", error);
        });
}

interface InstituicaoService {
    getInstituicao: () => Promise<Instituicao[]>;
    getInstituicaoByName: (nome: string) => Promise<Instituicao>;
    getInstituicaoByInstituicaoTipoId: (
        instituicaoTipoId: string[]
    ) => Promise<Instituicao[]>;
    saveInstituicao: (
        instituicao: InstituicaoCreateProps
    ) => Promise<Instituicao>;
    updateInstituicao: (
        instituicao: InstituicaoCreateProps
    ) => Promise<Instituicao>;
    deleteInstituicao: (nome: string) => Promise<void>;
}

export const instituicaoService: InstituicaoService = {
    getInstituicao,
    getInstituicaoByName,
    getInstituicaoByInstituicaoTipoId,
    saveInstituicao,
    updateInstituicao,
    deleteInstituicao,
};
