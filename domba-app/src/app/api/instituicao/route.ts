import { instituicaoController } from "@/server/controller/InstituicaoController";

export async function GET(request: Request) {
  return await instituicaoController.getAllInstituicoes(request);
}

export async function POST(request: Request) {
  return await instituicaoController.registerInstituicao(request);
}
