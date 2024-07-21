import { infraSecurity } from "../infra/security/auth";
import { provaRepository } from "../repository/ProvaRepository";

async function getAllProvas(request: Request) {
    const response = await provaRepository.findAll();
    return new Response(JSON.stringify(response), { status: 200 });
}

async function getProvaById(request: Request, id: string) {
    if (!id) {
        return new Response("Faltando o id da Prova.", {
            status: 400,
        });
    }

    const response = await provaRepository.findById(id);
    return new Response(JSON.stringify(response), { status: 200 });
}

async function getProvaByModalidadeDeIngressoId(request: Request, id: string) {
    if (!id) {
        return new Response("Faltando o id da Modalidade de Ingresso.", {
            status: 400,
        });
    }

    const response = await provaRepository.findByModalidadeDeIngressoId(id);
    return new Response(JSON.stringify(response), { status: 200 });
}

async function registerProva(request: Request) {
    const body = await request.json();
    const prova = body as ProvaCreate;
    const token = request.headers.get("Authorization");

    if (!prova.nome) {
        return new Response("Faltando o nome da Prova.", { status: 400 });
    }

    if (!token) {
        return new Response("Token não encontrado.", { status: 401 });
    }

    infraSecurity.verifyToken(token);

    const response = await provaRepository.save(prova);

    return new Response(JSON.stringify(response), { status: 201 });
}

async function updateProva(request: Request) {
    const body = await request.json();
    const prova = body as ProvaUpdate;
    const token = request.headers.get("Authorization");

    if (!prova.nome) {
        return new Response("Faltando o nome da Prova.", { status: 400 });
    }

    if (!token) {
        return new Response("Token não encontrado.", { status: 401 });
    }

    infraSecurity.verifyToken(token);

    const response = await provaRepository.update(prova);

    return new Response(JSON.stringify(response), { status: 200 });
}

async function deleteProva(request: Request) {
    const { id } = await request.json();
    const token = request.headers.get("Authorization");

    if (!token) {
        return new Response("Token não encontrado.", { status: 401 });
    }

    infraSecurity.verifyToken(token);

    console.log("ID", id);

    const response = await provaRepository.deleteById(id);

    return new Response(JSON.stringify(response), { status: 200 });
}

interface ProvaController {
    getAllProvas: (request: Request) => Promise<Response>;
    getProvaById: (request: Request, id: string) => Promise<Response>;
    getProvaByModalidadeDeIngressoId: (
        request: Request,
        id: string
    ) => Promise<Response>;
    registerProva: (request: Request) => Promise<Response>;
    updateProva: (request: Request) => Promise<Response>;
    deleteProva: (request: Request, id: string) => Promise<Response>;
}

export const provaController: ProvaController = {
    getAllProvas,
    getProvaById,
    getProvaByModalidadeDeIngressoId,
    registerProva,
    updateProva,
    deleteProva,
};
