import { supabase } from "../infra/database/supabase";
import { Instituicao, instituicaoSchema } from "../schema/instituicao";

async function findAll(): Promise<Instituicao[]> {
  const { data, error } = await supabase.from("Instituicao").select("*");
  if (error) {
    throw error;
  }

  const parsedData = instituicaoSchema.array().safeParse(data);
  if (!parsedData.success) {
    throw new Error(parsedData.error.errors[0].message);
  }

  const instituicoes = parsedData.data;
  return instituicoes;
}

async function findById(id: string): Promise<Instituicao> {
  const { data, error } = await supabase
    .from("Instituicao")
    .select("*")
    .eq("id", id)
    .single();
  if (error) {
    throw error;
  }

  const parsedData = instituicaoSchema.safeParse(data);
  if (!parsedData.success) {
    throw new Error(parsedData.error.errors[0].message);
  }

  const instituicao = parsedData.data;
  return instituicao;
}

async function findByName(nome: string): Promise<Instituicao> {
  const { data, error } = await supabase
    .from("Instituicao")
    .select("*")
    .eq("nome", nome)
    .single();
  if (error) {
    throw error;
  }

  const parsedData = instituicaoSchema.safeParse(data);
  if (!parsedData.success) {
    throw new Error(parsedData.error.errors[0].message);
  }

  const instituicoes = parsedData.data;
  return instituicoes;
}

async function findByInstituicaoTipoId(
  instituicaoTipoId: string[]
): Promise<Instituicao[]> {
  const { data, error } = await supabase
    .from("Instituicao")
    .select("*")
    .in("instituicao_tipo_id", instituicaoTipoId);
  if (error) {
    throw error;
  }

  const parsedData = instituicaoSchema.array().safeParse(data);
  if (!parsedData.success) {
    throw new Error(parsedData.error.errors[0].message);
  }

  const instituicoes = parsedData.data;
  return instituicoes;
}

async function save(instituicao: InstituicaoCreate): Promise<Instituicao> {
  const { data, error } = await supabase
    .from("Instituicao")
    .insert(instituicao)
    .select()
    .single();
  if (error) {
    throw error;
  }

  const parsedData = instituicaoSchema.safeParse(data);
  if (!parsedData.success) {
    throw new Error(parsedData.error.errors[0].message);
  }

  const instituicaoCreated = parsedData.data;
  return instituicaoCreated;
}

interface InstituicaoRepository {
  findAll: () => Promise<Instituicao[]>;
  findById: (id: string) => Promise<Instituicao>;
  findByInstituicaoTipoId: (
    instituicaoTipoId: string[]
  ) => Promise<Instituicao[]>;
  findByName: (nome: string) => Promise<Instituicao>;
  save: (instituicao: InstituicaoCreate) => Promise<Instituicao>;
}

export const instituicaoRepository: InstituicaoRepository = {
  findAll,
  findById,
  findByName,
  findByInstituicaoTipoId,
  save,
};
