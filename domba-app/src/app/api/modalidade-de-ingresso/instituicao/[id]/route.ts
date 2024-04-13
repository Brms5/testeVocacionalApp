import { modalidadeDeIngressoController } from "@/server/controller/ModalidadeDeIngressoController";

export async function GET(request: Request, { params }: any) {
  const id = params.id;
  return await modalidadeDeIngressoController.getModalidadeDeIngressoByInstituicaoId(
    request,
    id
  );
}
