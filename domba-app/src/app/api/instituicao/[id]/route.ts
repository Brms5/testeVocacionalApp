import { instituicaoController } from "@/server/controller/InstituicaoController";

export async function GET(request: Request, { params }: any) {
  const id = params.id;
  return await instituicaoController.getInstituicaoById(request, id);
}
