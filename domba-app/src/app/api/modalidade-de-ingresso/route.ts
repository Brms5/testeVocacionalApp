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
