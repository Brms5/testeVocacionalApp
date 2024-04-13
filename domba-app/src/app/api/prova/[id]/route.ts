import { provaController } from "@/server/controller/ProvaController";

export async function GET(request: Request, { params }: any) {
  const id = params.id;
  return await provaController.getProvaById(request, id);
}
