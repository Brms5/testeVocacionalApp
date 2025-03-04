// import { infraSecurity } from "../infra/security/auth"
import { instituicaoRepository } from "../repository/InstituicaoRepository";

async function getAllInstituicoes(request: Request) {
    const response = await instituicaoRepository.findAll();
    return new Response(JSON.stringify(response), { status: 200 });
}

async function getInstituicaoById(request: Request, id: string) {
    if (!id) {
        return new Response("Faltando o id da Instituicao.", {
            status: 400,
        });
    }

    const response = await instituicaoRepository.findById(id);
    return new Response(JSON.stringify(response), { status: 200 });
}

async function getInstituicaoByName(request: Request, nome: string) {
    if (!nome) {
        return new Response("Faltando o nome da Instituicao.", {
            status: 400,
        });
    }

    const response = await instituicaoRepository.findByName(nome);
    return new Response(JSON.stringify(response), { status: 200 });
}

async function getInstituicaoByInstituicaoTipoId(
    request: Request,
    id: string[]
) {
    const response = await instituicaoRepository.findByInstituicaoTipoId(id);
    return new Response(JSON.stringify(response), { status: 200 });
}

async function registerInstituicao(request: Request) {
    const body = await request.json();
    const instituicao = body;
    const token = request.headers.get("Authorization");

    if (!token) {
        return new Response("Token não encontrado.", { status: 401 });
    }

    // infraSecurity.verifyToken(token);

    if (!instituicao.nome) {
        return new Response("Faltando o nome da Instituicao.", { status: 400 });
    }

    const instituicaoExiste = await instituicaoRepository.findByName(
        instituicao.nome
    );
    if (instituicaoExiste) {
        return new Response("Instituicao com esse nome já existe.", {
            status: 409,
        });
    }

    const response = await instituicaoRepository.save(instituicao);
    return new Response(JSON.stringify(response), { status: 201 });
}

async function updateInstituicao(request: Request) {
    const body = await request.json();
    const instituicao = body;
    const token = request.headers.get("Authorization");

    if (!token) {
        return new Response("Token não encontrado.", { status: 401 });
    }

    // infraSecurity.verifyToken(token);

    const instituicaoExiste = await instituicaoRepository.findById(
        instituicao.id
    );
    if (!instituicaoExiste) {
        return new Response("Instituicao não encontrada.", { status: 404 });
    }

    if (instituicao.nome !== instituicaoExiste.nome) {
        const instituicaoNomeExiste = await instituicaoRepository.findByName(
            instituicao.nome
        );

        if (instituicaoNomeExiste) {
            return new Response("Instituicao com esse nome já existe.", {
                status: 409,
            });
        }
    }

    const response = await instituicaoRepository.update(instituicao);
    return new Response(JSON.stringify(response), { status: 200 });
}

async function deleteInstituicao(request: Request) {
    const body = await request.json();
    const token = request.headers.get("Authorization");

    if (!token) {
        return new Response("Token não encontrado.", { status: 401 });
    }

    // await infraSecurity.verifyToken(token);

    const { nome } = body;

    const instituicao = await instituicaoRepository.findByName(nome);
    if (!instituicao) {
        return new Response("Instituicao não encontrada.", { status: 404 });
    }

    await instituicaoRepository.deleteByName(nome);
    return new Response("Instituicao deletada com sucesso.", { status: 200 });
}

interface InstituicaoController {
    getAllInstituicoes: (request: Request) => Promise<Response>;
    getInstituicaoById: (request: Request, id: string) => Promise<Response>;
    getInstituicaoByInstituicaoTipoId: (
        request: Request,
        id: string[]
    ) => Promise<Response>;
    getInstituicaoByName: (request: Request, nome: string) => Promise<Response>;
    registerInstituicao: (request: Request) => Promise<Response>;
    updateInstituicao: (request: Request) => Promise<Response>;
    deleteInstituicao: (request: Request) => Promise<Response>;
}

export const instituicaoController: InstituicaoController = {
    getAllInstituicoes,
    getInstituicaoById,
    getInstituicaoByName,
    getInstituicaoByInstituicaoTipoId,
    registerInstituicao,
    updateInstituicao,
    deleteInstituicao,
};
