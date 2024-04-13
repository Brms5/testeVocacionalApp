import { instituicaoTipoController } from "@/server/controller/InstituicaoTipoController";

export async function GET(request: Request, { params }: any) {
  const id = params.id;
  return await instituicaoTipoController.getInstituicaoTipoById(request, id);
}