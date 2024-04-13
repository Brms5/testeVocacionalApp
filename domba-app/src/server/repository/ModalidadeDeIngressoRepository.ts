import { supabase } from "../infra/database/supabase";
import {
  ModalidadeDeIngresso,
  modalidadeDeIngressoSchema,
} from "../schema/modalidadeDeIngresso";

async function findAll(): Promise<ModalidadeDeIngresso[]> {
  const { data, error } = await supabase
    .from("Modalidade_de_ingresso")
    .select("*")
    .order("modalidade", { ascending: true });
  if (error) {
    throw error;
  }

  const parsedData = modalidadeDeIngressoSchema.array().safeParse(data);
  if (!parsedData.success) {
    throw new Error(parsedData.error.errors[0].message);
  }

  const modalidadeDeIngressos = parsedData.data;
  return modalidadeDeIngressos;
}

async function findById(id: string): Promise<ModalidadeDeIngresso> {
  const { data, error } = await supabase
    .from("Modalidade_de_ingresso")
    .select("*")
    .eq("id", id)
    .single();
  if (error) {
    throw error;
  }

  const parsedData = modalidadeDeIngressoSchema.safeParse(data);
  if (!parsedData.success) {
    throw new Error(parsedData.error.errors[0].message);
  }

  const modalidadeDeIngressos = parsedData.data;
  return modalidadeDeIngressos;
}

async function findByInstituicaoId(
  instituicaoId: string
): Promise<ModalidadeDeIngresso[]> {
  const { data, error } = await supabase
    .from("Modalidade_de_ingresso")
    .select("*")
    .eq("instituicao_id", instituicaoId);
  if (error) {
    throw error;
  }

  const parsedData = modalidadeDeIngressoSchema.array().safeParse(data);
  if (!parsedData.success) {
    throw new Error(parsedData.error.errors[0].message);
  }

  const modalidadeDeIngressos = parsedData.data;
  return modalidadeDeIngressos;
}

async function save(
  modalidadeDeIngresso: ModalidadeDeIngressoCreate
): Promise<ModalidadeDeIngresso> {
  const { data, error } = await supabase
    .from("Modalidade_de_ingresso")
    .insert(modalidadeDeIngresso)
    .select()
    .single();
  if (error) {
    throw error;
  }

  const parsedData = modalidadeDeIngressoSchema.safeParse(data);
  if (!parsedData.success) {
    throw new Error(parsedData.error.errors[0].message);
  }

  const savedModalidadeDeIngresso = parsedData.data;
  return savedModalidadeDeIngresso;
}

interface ModalidadeDeIngressoRepository {
  findAll: () => Promise<ModalidadeDeIngresso[]>;
  findById: (id: string) => Promise<ModalidadeDeIngresso>;
  findByInstituicaoId: (
    instituicaoId: string
  ) => Promise<ModalidadeDeIngresso[]>;
  save: (
    modalidadeDeIngresso: ModalidadeDeIngressoCreate
  ) => Promise<ModalidadeDeIngresso>;
}

export const modalidadeDeIngressoRepository: ModalidadeDeIngressoRepository = {
  findAll,
  findById,
  findByInstituicaoId,
  save,
};
