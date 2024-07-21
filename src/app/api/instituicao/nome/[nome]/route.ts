import { instituicaoController } from "@/server/controller/InstituicaoController";

export async function GET(request: Request, { params }: any) {
    const nome = params.nome;
    return await instituicaoController.getInstituicaoByName(request, nome);
}

export async function PUT(request: Request) {
    return await instituicaoController.updateInstituicao(request);
}

export async function DELETE(request: Request) {
    return await instituicaoController.deleteInstituicao(request);
}
