import { infraSecurity } from "../infra/security/auth";
import { CursoRequest, CursoUpdateRequest } from "../interface/CursoInterface";
import { cursoRepository } from "../repository/CursoRepository";

async function getAllCursos(): Promise<Response> {
    const cursos = await cursoRepository.findAll();
    return new Response(JSON.stringify(cursos), {
        status: 200,
        headers: { "Content-Type": "application/json" },
    });
}

async function getCursoById(id: string): Promise<Response> {
    if (!id) {
        return new Response("Faltando o id do Curso.", {
            status: 400,
            headers: { "Content-Type": "application/json" },
        });
    }

    const curso = await cursoRepository.findById(id);
    return new Response(JSON.stringify(curso), { status: 200 });
}

async function registerCurso(request: Request): Promise<Response> {
    const body: CursoRequest = await request.json();
    const cursoNome = body.nome;

    const token = request.headers.get("Authorization");
    infraSecurity.verifyToken(token);

    if (!cursoNome) {
        return new Response("Faltando o nome do Curso.", {
            status: 400,
            headers: { "Content-Type": "application/json" },
        });
    }

    const cursoExiste = await cursoRepository.findByName(cursoNome);
    if (cursoExiste) {
        return new Response("Curso com esse nome já existe.", {
            status: 409,
            headers: { "Content-Type": "application/json" },
        });
    }

    const cursoRegistrado = await cursoRepository.save(cursoNome);
    return new Response(JSON.stringify(cursoRegistrado), {
        status: 201,
        headers: { "Content-Type": "application/json" },
    });
}

async function updateCurso(request: Request): Promise<Response> {
    const body: CursoUpdateRequest = await request.json();
    const curso = body;

    // brt timezone
    const currentDate = new Date();
    currentDate.setHours(currentDate.getHours() - 3);
    curso.edited_at = currentDate.toISOString();

    const token = request.headers.get("Authorization");
    infraSecurity.verifyToken(token);

    if (!curso.nome || !curso.id) {
        return new Response("Faltando o id e/ou nome do curso.", {
            status: 400,
            headers: { "Content-Type": "application/json" },
        });
    }

    const cursoExiste = await cursoRepository.findById(curso.id);
    if (!cursoExiste) {
        return new Response("Curso não encontrado.", {
            status: 404,
            headers: { "Content-Type": "application/json" },
        });
    }

    const cursoAtualizado = await cursoRepository.update(curso);
    return new Response(JSON.stringify(cursoAtualizado), {
        status: 200,
        headers: { "Content-Type": "application/json" },
    });
}

async function deleteCurso(request: Request): Promise<Response> {
    const body: CursoRequest = await request.json();
    const cursoNome = body.nome;

    const token = request.headers.get("Authorization");
    infraSecurity.verifyToken(token);

    if (!cursoNome) {
        return new Response("Faltando o nome do Curso.", {
            status: 400,
            headers: { "Content-Type": "application/json" },
        });
    }

    const cursoExiste = await cursoRepository.findByName(cursoNome);
    if (!cursoExiste) {
        return new Response("Curso não encontrado.", {
            status: 404,
            headers: { "Content-Type": "application/json" },
        });
    }

    await cursoRepository.remove(cursoNome);
    return new Response("Curso deletado com sucesso.", {
        status: 200,
        headers: { "Content-Type": "application/json" },
    });
}

interface CursoController {
    getAllCursos: () => Promise<Response>;
    getCursoById: (id: string) => Promise<Response>;
    registerCurso: (request: Request) => Promise<Response>;
    updateCurso: (request: Request) => Promise<Response>;
    deleteCurso: (request: Request) => Promise<Response>;
}

export const cursoController: CursoController = {
    getAllCursos,
    getCursoById,
    registerCurso,
    updateCurso,
    deleteCurso,
};
