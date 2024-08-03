import { cursoController } from "@/server/controller/CursoController";

export async function GET(request: Request) {
    return await cursoController.getAllCursos();
}

export async function POST(request: Request) {
    return await cursoController.registerCurso(request);
}
