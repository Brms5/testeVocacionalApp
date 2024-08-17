import { cursoController } from "@/server/controller/CursoController";

export async function GET(request: Request) {
    return await cursoController.getAllCursos();
}

export async function POST(request: Request) {
    return await cursoController.registerCurso(request);
}

export async function PUT(request: Request) {
    return await cursoController.updateCurso(request);
}

export async function DELETE(request: Request) {
    return await cursoController.deleteCurso(request);
}
