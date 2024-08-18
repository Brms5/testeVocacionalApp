import { infraSecurity } from "../infra/security/auth";
import { ModalidadeNomeUpdateRequest } from "../interface/ModalidadeNomeInterface";
import { modalidadeNomeRepository } from "../repository/ModalidadeNomeRepository";

async function registerModalidadeNome(request: Request): Promise<Response> {
    const body = await request.json();
    const modalidadeNome = body.nome;
    if (!modalidadeNome) {
        return new Response("Faltando o nome da ModalidadeNome.", {
            status: 400,
            headers: { "Content-Type": "application/json" },
        });
    }

    const token = request.headers.get("Authorization");
    infraSecurity.verifyToken(token);

    const modalidadeNomeExiste = await modalidadeNomeRepository.findByName(
        modalidadeNome
    );
    if (modalidadeNomeExiste) {
        return new Response("ModalidadeNome com esse nome já existe.", {
            status: 409,
            headers: { "Content-Type": "application/json" },
        });
    }

    const modalidadeNomeRegistrado = await modalidadeNomeRepository.save(
        modalidadeNome
    );
    return new Response(JSON.stringify(modalidadeNomeRegistrado), {
        status: 201,
        headers: { "Content-Type": "application/json" },
    });
}

async function getAllModalidadeNome(request: Request): Promise<Response> {
    const modalidadeNomes = await modalidadeNomeRepository.findAll();
    return new Response(JSON.stringify(modalidadeNomes), {
        status: 200,
        headers: { "Content-Type": "application/json" },
    });
}

async function getModalidadeNomeById(request: Request): Promise<Response> {
    const { id } = await request.json();
    if (!id) {
        return new Response("Faltando o id da ModalidadeNome.", {
            status: 400,
            headers: { "Content-Type": "application/json" },
        });
    }

    const modalidadeNome = await modalidadeNomeRepository.findById(id);
    return new Response(JSON.stringify(modalidadeNome), {
        status: 200,
        headers: { "Content-Type": "application/json" },
    });
}

async function getModalidadeNomeByName(request: Request): Promise<Response> {
    const { nome } = await request.json();
    if (!nome) {
        return new Response("Faltando o nome da ModalidadeNome.", {
            status: 400,
            headers: { "Content-Type": "application/json" },
        });
    }

    const modalidadeNome = await modalidadeNomeRepository.findByName(nome);
    return new Response(JSON.stringify(modalidadeNome), {
        status: 200,
        headers: { "Content-Type": "application/json" },
    });
}

async function updateModalidadeNome(request: Request): Promise<Response> {
    const modalidadeNome: ModalidadeNomeUpdateRequest = await request.json();
    if (!modalidadeNome.id || !modalidadeNome.nome) {
        return new Response("Faltando o id e/ou nome da ModalidadeNome.", {
            status: 400,
            headers: { "Content-Type": "application/json" },
        });
    }

    const token = request.headers.get("Authorization");
    infraSecurity.verifyToken(token);

    const modalidadeNomeExiste = await modalidadeNomeRepository.findById(
        modalidadeNome.id
    );
    if (!modalidadeNomeExiste) {
        return new Response("ModalidadeNome não encontrado.", {
            status: 404,
            headers: { "Content-Type": "application/json" },
        });
    }

    // brt timezone
    const currentDate = new Date();
    currentDate.setHours(currentDate.getHours() - 3);
    modalidadeNome.edited_at = currentDate.toISOString();

    const modalidadeNomeAtualizado = await modalidadeNomeRepository.update(
        modalidadeNome
    );
    return new Response(JSON.stringify(modalidadeNomeAtualizado), {
        status: 200,
        headers: { "Content-Type": "application/json" },
    });
}

async function deleteModalidadeNome(request: Request): Promise<Response> {
    const body = await request.json();
    const modalidadeNome: string = body.nome;
    if (!modalidadeNome) {
        return new Response("Faltando o nome da ModalidadeNome.", {
            status: 400,
            headers: { "Content-Type": "application/json" },
        });
    }

    const token = request.headers.get("Authorization");
    infraSecurity.verifyToken(token);

    const modalidadeNomeExiste = await modalidadeNomeRepository.findByName(
        modalidadeNome
    );
    if (!modalidadeNomeExiste) {
        return new Response("ModalidadeNome não encontrado.", {
            status: 404,
            headers: { "Content-Type": "application/json" },
        });
    }

    await modalidadeNomeRepository.remove(modalidadeNome);
    return new Response(`A Modalidade ${modalidadeNome} foi deletada.`, {
        status: 200,
        headers: { "Content-Type": "application/json" },
    });
}

interface modalidadeNomeController {
    getAllModalidadeNome: (request: Request) => Promise<Response>;
    getModalidadeNomeById: (request: Request) => Promise<Response>;
    getModalidadeNomeByName: (request: Request) => Promise<Response>;
    registerModalidadeNome: (request: Request) => Promise<Response>;
    updateModalidadeNome: (request: Request) => Promise<Response>;
    deleteModalidadeNome: (request: Request) => Promise<Response>;
}

export const modalidadeNomeController: modalidadeNomeController = {
    getAllModalidadeNome,
    getModalidadeNomeById,
    getModalidadeNomeByName,
    registerModalidadeNome,
    updateModalidadeNome,
    deleteModalidadeNome,
};
