import { provaRepository } from "../repository/ProvaRepository";

async function getAllProvas(request: Request) {
  const response = await provaRepository.findAll();
  return new Response(JSON.stringify(response), { status: 200 });
}

async function getProvaById(request: Request, id: string) {
  if (!id) {
    return new Response("Faltando o id da Prova.", {
      status: 400,
    });
  }

  const response = await provaRepository.findById(id);
  return new Response(JSON.stringify(response), { status: 200 });
}

async function getProvaByModalidadeDeIngressoId(request: Request, id: string) {
  if (!id) {
    return new Response("Faltando o id da Modalidade de Ingresso.", {
      status: 400,
    });
  }

  const response = await provaRepository.findByModalidadeDeIngressoId(id);
  return new Response(JSON.stringify(response), { status: 200 });
}

async function registerProva(request: Request) {
  const body = await request.json();
  const prova = body as ProvaCreate;

  const response = await provaRepository.save(prova);

  return new Response(JSON.stringify(response), { status: 201 });
}

interface ProvaController {
  getAllProvas: (request: Request) => Promise<Response>;
  getProvaById: (request: Request, id: string) => Promise<Response>;
  getProvaByModalidadeDeIngressoId: (
    request: Request,
    id: string
  ) => Promise<Response>;
  registerProva: (request: Request) => Promise<Response>;
}

export const provaController: ProvaController = {
  getAllProvas,
  getProvaById,
  getProvaByModalidadeDeIngressoId,
  registerProva,
};
