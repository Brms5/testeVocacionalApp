import { instituicaoTipoRepository } from "../repository/InstituicaoTipoRepository";

async function getAllInstituicaoTipos(request: Request) {
  const response = await instituicaoTipoRepository.findAll();
  return new Response(JSON.stringify(response), { status: 200 });
}

async function getInstituicaoTipoById(request: Request, id: string) {
  if (!id) {
    return new Response("Faltando o id do Tipo de Instituição.", {
      status: 400,
    });
  }

  const response = await instituicaoTipoRepository.findById(id);
  return new Response(JSON.stringify(response), { status: 200 });
}

async function registerInstituicaoTipo(request: Request) {
  const body = await request.json();
  const instituicaoTipoNome = body as string;

  const response = await instituicaoTipoRepository.save(
    instituicaoTipoNome
  );

  return new Response(JSON.stringify(response), { status: 201 });
}

interface InstituicaoTipoController {
  getAllInstituicaoTipos: (request: Request) => Promise<Response>;
  getInstituicaoTipoById: (request: Request, id: string) => Promise<Response>;
  registerInstituicaoTipo: (request: Request) => Promise<Response>;
}

export const instituicaoTipoController: InstituicaoTipoController = {
  getAllInstituicaoTipos,
  getInstituicaoTipoById,
  registerInstituicaoTipo,
};
