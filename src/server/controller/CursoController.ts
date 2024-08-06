import { infraSecurity } from "../infra/security/auth";
import { CursoRequest } from "../interface/curso";
import { cursoRepository } from "../repository/CursoRepository";

async function getAllCursos(): Promise<Response> {
    const cursos = await cursoRepository.findAll();
    return new Response(JSON.stringify(cursos), { status: 200 });
}

async function getCursoById(id: string): Promise<Response> {
    if (!id) {
        return new Response("Faltando o id do Curso.", { status: 400 });
    }

    const curso = await cursoRepository.findById(id);
    return new Response(JSON.stringify(curso), { status: 200 });
}

async function registerCurso(request: Request): Promise<Response> {
    const body: CursoRequest = await request.json();
    const curso = body;
    const token = request.headers.get("Authorization");

    if (!token) {
        return new Response("Token não encontrado.", { status: 401 });
    }

    infraSecurity.verifyToken(token);

    if (!curso.nome) {
        return new Response("Faltando o nome do Curso.", { status: 400 });
    }

    const cursoExiste = await cursoRepository.findByName(curso.nome);
    if (cursoExiste) {
        return new Response("Curso com esse nome já existe.", { status: 409 });
    }

    const cursoRegistrado = await cursoRepository.save(curso);
    return new Response(JSON.stringify(cursoRegistrado), { status: 201 });
}

interface CursoController {
    getAllCursos: () => Promise<Response>;
    getCursoById: (id: string) => Promise<Response>;
    registerCurso: (request: Request) => Promise<Response>;
}

export const cursoController: CursoController = {
    getAllCursos,
    getCursoById,
    registerCurso,
};
