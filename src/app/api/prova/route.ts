import { provaController } from "@/server/controller/ProvaController";

export async function GET(request: Request) {
    return await provaController.getAllProvas(request);
}

export async function POST(request: Request) {
    return await provaController.registerProva(request);
}

export async function PUT(request: Request) {
    return await provaController.updateProva(request);
}

export async function DELETE(request: Request, id: string) {
    return await provaController.deleteProva(request, id);
}
