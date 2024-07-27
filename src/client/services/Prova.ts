import { provaSchema } from "@/server/schema/prova";

function getProva(): Promise<Prova[]> {
    return fetch("/api/prova").then(async (response) => {
        if (!response.ok) {
            throw new Error(response.statusText);
        }

        const provaResponse = await response.json();
        const prova = provaSchema.array().safeParse(provaResponse);
        if (!prova.success) {
            throw new Error("Erro ao buscar prova");
        }

        return prova.data;
    });
}

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

function saveProva(prova: ProvaCreateProps): Promise<Prova> {
    return fetch("/api/prova", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Authorization: `${localStorage.getItem("token")}`,
        },
        body: JSON.stringify(prova),
    }).then(async (res) => {
        console.log("res: ", res);
        if (!res.ok) {
            throw new Error(res.statusText);
        }

        const provaResponse = await res.json();
        const prova = provaSchema.safeParse(provaResponse);
        if (!prova.success) {
            throw new Error("Erro ao salvar prova");
        }

        return prova.data;
    });
}

function updateProva(prova: ProvaUpdateProps): Promise<Prova> {
    return fetch("/api/prova", {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
            Authorization: `${localStorage.getItem("token")}`,
        },
        body: JSON.stringify(prova),
    }).then(async (res) => {
        console.log("res: ", res);
        if (!res.ok) {
            throw new Error(res.statusText);
        }

        const provaResponse = await res.json();
        const prova = provaSchema.safeParse(provaResponse);
        if (!prova.success) {
            throw new Error("Erro ao atualizar prova");
        }

        return prova.data;
    });
}

function deleteProva(id: string): Promise<Response> {
    return fetch("/api/prova", {
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

        return new Response("Prova deletada com sucesso.", { status: 200 });
    });
}

interface ProvaService {
    getProva: () => Promise<Prova[]>;
    getProvaByModalidadeDeIngressoId: (id: string) => Promise<Prova[]>;
    saveProva: (prova: ProvaCreateProps) => Promise<Prova>;
    updateProva: (prova: ProvaUpdateProps) => Promise<Prova>;
    deleteProva: (id: string) => Promise<Response>;
}

export const provaService: ProvaService = {
    getProva,
    getProvaByModalidadeDeIngressoId,
    saveProva,
    updateProva,
    deleteProva,
};
