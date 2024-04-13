import { instituicaoTipoController } from "@/server/controller/InstituicaoTipoController";

export async function GET(request: Request) {
  return await instituicaoTipoController.getAllInstituicaoTipos(request);
}

export async function POST(request: Request) {
  return await instituicaoTipoController.registerInstituicaoTipo(request);
}