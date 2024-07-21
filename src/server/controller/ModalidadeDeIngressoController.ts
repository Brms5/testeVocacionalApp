import { infraSecurity } from "../infra/security/auth";
import { modalidadeDeIngressoRepository } from "../repository/ModalidadeDeIngressoRepository";

async function getAllModalidadesDeIngresso(request: Request) {
    const response = await modalidadeDeIngressoRepository.findAll();
    return new Response(JSON.stringify(response), { status: 200 });
}

async function getModalidadeDeIngressoById(request: Request, id: string) {
    if (!id) {
        return new Response("Faltando o id da Modalidade de Ingresso.", {
            status: 400,
        });
    }

    const response = await modalidadeDeIngressoRepository.findById(id);
    return new Response(JSON.stringify(response), { status: 200 });
}

async function getModalidadeDeIngressoByInstituicaoId(
    request: Request,
    instituicaoId: string
) {
    if (!instituicaoId) {
        return new Response("Faltando o id da Instituição.", {
            status: 400,
        });
    }

    const response = await modalidadeDeIngressoRepository.findByInstituicaoId(
        instituicaoId
    );
    return new Response(JSON.stringify(response), { status: 200 });
}

async function registerModalidadeDeIngresso(request: Request) {
    const body = await request.json();
    const modalidadeDeIngresso = body as ModalidadeDeIngressoCreate;
    const token = request.headers.get("Authorization");

    if (!modalidadeDeIngresso.modalidade) {
        return new Response("Faltando o nome da Modalidade.", {
            status: 400,
        });
    }

    if (!token) {
        return new Response("Token não encontrado.", { status: 401 });
    }

    infraSecurity.verifyToken(token);
    const response = await modalidadeDeIngressoRepository.save(
        modalidadeDeIngresso
    );

    return new Response(JSON.stringify(response), { status: 201 });
}

async function updateModalidadeDeIngresso(request: Request) {
    const body = await request.json();
    const modalidadeDeIngresso = body as ModalidadeDeIngressoUpdate;
    const token = request.headers.get("Authorization");

    if (!modalidadeDeIngresso.modalidade) {
        return new Response("Faltando o nome da Modalidade.", {
            status: 400,
        });
    }

    if (!token) {
        return new Response("Token não encontrado.", { status: 401 });
    }

    infraSecurity.verifyToken(token);

    const response = await modalidadeDeIngressoRepository.update(
        modalidadeDeIngresso
    );

    return new Response(JSON.stringify(response), { status: 200 });
}

async function deleteModalidadeDeIngresso(request: Request) {
    const body = await request.json();
    const { id } = body;
    const token = request.headers.get("Authorization");

    if (!token) {
        return new Response("Token não encontrado.", { status: 401 });
    }

    infraSecurity.verifyToken(token);

    await modalidadeDeIngressoRepository.deleteById(id);

    return new Response("Modalidade de Ingresso deletada com sucesso.", {
        status: 200,
    });
}

interface ModalidadeDeIngressoController {
    getAllModalidadesDeIngresso: (request: Request) => Promise<Response>;
    getModalidadeDeIngressoById: (
        request: Request,
        id: string
    ) => Promise<Response>;
    getModalidadeDeIngressoByInstituicaoId: (
        request: Request,
        instituicaoId: string
    ) => Promise<Response>;
    registerModalidadeDeIngresso: (request: Request) => Promise<Response>;
    updateModalidadeDeIngresso: (request: Request) => Promise<Response>;
    deleteModalidadeDeIngresso: (request: Request) => Promise<Response>;
}

export const modalidadeDeIngressoController: ModalidadeDeIngressoController = {
    getAllModalidadesDeIngresso,
    getModalidadeDeIngressoById,
    getModalidadeDeIngressoByInstituicaoId,
    registerModalidadeDeIngresso,
    updateModalidadeDeIngresso,
    deleteModalidadeDeIngresso,
};
