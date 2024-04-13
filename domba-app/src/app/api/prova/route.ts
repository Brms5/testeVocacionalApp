import { provaController } from "@/server/controller/ProvaController";

export async function GET(request: Request) {
  return await provaController.getAllProvas(request);
}

export async function POST(request: Request) {
  return await provaController.registerProva(request);
}
