import { modalidadeDeIngressoController } from "@/server/controller/ModalidadeDeIngressoController";

export async function GET(request: Request) {
    return await modalidadeDeIngressoController.getAllModalidadesDeIngresso(
        request
    );
}

export async function POST(request: Request) {
    return await modalidadeDeIngressoController.registerModalidadeDeIngresso(
        request
    );
}

export async function PUT(request: Request) {
    return await modalidadeDeIngressoController.updateModalidadeDeIngresso(
        request
    );
}

export async function DELETE(request: Request) {
    return await modalidadeDeIngressoController.deleteModalidadeDeIngresso(
        request
    );
}
