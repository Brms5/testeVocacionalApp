import { modalidadeNomeController } from "@/server/controller/ModalidadeNomeController";

export async function POST(request: Request) {
    return await modalidadeNomeController.registerModalidadeNome(request);
}

export async function GET(request: Request) {
    return await modalidadeNomeController.getAllModalidadeNome(request);
}

export async function PUT(request: Request) {
    return await modalidadeNomeController.updateModalidadeNome(request);
}

export async function DELETE(request: Request) {
    return await modalidadeNomeController.deleteModalidadeNome(request);
}
