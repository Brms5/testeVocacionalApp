import { modalidadeDeIngressoSchema } from "@/server/schema/modalidadeDeIngresso";

function getModalidadeDeIngresso(): Promise<ModalidadeDeIngresso[]> {
    return fetch("/api/modalidade-de-ingresso").then(async (response) => {
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
    });
}

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

function saveModalidadeDeIngresso(
    modalidadeDeIngresso: ModalidadeDeIngressoCreateProps
): Promise<ModalidadeDeIngresso> {
    return fetch("/api/modalidade-de-ingresso", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Authorization: `${localStorage.getItem("token")}`,
        },
        body: JSON.stringify(modalidadeDeIngresso),
    }).then(async (res) => {
        console.log("res: ", res);
        if (!res.ok) {
            throw new Error(res.statusText);
        }

        const modalidadeDeIngressoResponse = await res.json();
        const modalidadeDeIngresso = modalidadeDeIngressoSchema.safeParse(
            modalidadeDeIngressoResponse
        );

        if (!modalidadeDeIngresso.success) {
            throw new Error("Erro ao salvar modalidade de ingresso");
        }

        return modalidadeDeIngresso.data;
    });
}

function updateModalidadeDeIngresso(
    modalidadeDeIngresso: ModalidadeDeIngressoUpdate
): Promise<ModalidadeDeIngresso> {
    return fetch("/api/modalidade-de-ingresso", {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
            Authorization: `${localStorage.getItem("token")}`,
        },
        body: JSON.stringify(modalidadeDeIngresso),
    }).then(async (res) => {
        console.log("res: ", res);
        if (!res.ok) {
            throw new Error(res.statusText);
        }

        const modalidadeDeIngressoResponse = await res.json();
        const modalidadeDeIngresso = modalidadeDeIngressoSchema.safeParse(
            modalidadeDeIngressoResponse
        );

        if (!modalidadeDeIngresso.success) {
            throw new Error("Erro ao atualizar modalidade de ingresso");
        }

        return modalidadeDeIngresso.data;
    });
}

function deleteModalidadeDeIngresso(id: string): Promise<Response> {
    return fetch("/api/modalidade-de-ingresso", {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
            Authorization: `${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({ id }),
    }).then(async (res) => {
        console.log("res: ", res);
        if (!res.ok) {
            throw new Error(res.statusText);
        }

        return new Response("Modalidade de Ingresso deletada com sucesso.", {
            status: 200,
        });
    });
}

interface ModalidadeDeIngressoService {
    getModalidadeDeIngresso: () => Promise<ModalidadeDeIngresso[]>;
    getModalidadeDeIngressoByInstituicaoId: (
        id: string
    ) => Promise<ModalidadeDeIngresso[]>;
    saveModalidadeDeIngresso: (
        modalidadeDeIngresso: ModalidadeDeIngressoCreateProps
    ) => Promise<ModalidadeDeIngresso>;
    updateModalidadeDeIngresso: (
        modalidadeDeIngresso: ModalidadeDeIngressoUpdate
    ) => Promise<ModalidadeDeIngresso>;
    deleteModalidadeDeIngresso: (id: string) => Promise<Response>;
}

export const modalidadeDeIngressoService: ModalidadeDeIngressoService = {
    getModalidadeDeIngresso,
    getModalidadeDeIngressoByInstituicaoId,
    saveModalidadeDeIngresso,
    updateModalidadeDeIngresso,
    deleteModalidadeDeIngresso,
};
