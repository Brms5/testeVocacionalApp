import { instituicaoController } from "@/server/controller/InstituicaoController";

export async function GET(request: Request, { params }: any) {
  const nome = params.nome;
  return await instituicaoController.getInstituicaoByName(request, nome);
}
