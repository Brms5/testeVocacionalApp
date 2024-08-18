import { supabase } from "../infra/database/supabase";
import {
    ModalidadeNomeResponse,
    ModalidadeNomeUpdateRequest,
} from "../interface/ModalidadeNomeInterface";
import { modalidadeNomeSchema } from "../schema/ModalidadeNome";

async function findAll(): Promise<ModalidadeNomeResponse[]> {
    const { data, error } = await supabase
        .from("modalidade_nome")
        .select("*")
        .order("nome");
    if (error) {
        throw error;
    }

    const parsedData = modalidadeNomeSchema.array().safeParse(data);
    if (!parsedData.success) {
        throw new Error(parsedData.error.errors[0].message);
    }

    const modalidadeNomes = parsedData.data;
    return modalidadeNomes;
}

async function findById(id: string): Promise<ModalidadeNomeResponse | null> {
    const { data, error } = await supabase
        .from("modalidade_nome")
        .select("*")
        .eq("id", id)
        .single();

    if (error) {
        if (error.code !== "PGRST116") throw error;
    }

    if (!data) {
        return null;
    }

    const parsedData = modalidadeNomeSchema.safeParse(data);
    if (!parsedData.success) {
        throw new Error(parsedData.error.errors[0].message);
    }

    const modalidadeNome = parsedData.data;
    return modalidadeNome;
}

async function findByName(
    nome: string
): Promise<ModalidadeNomeResponse | null> {
    const { data, error } = await supabase
        .from("modalidade_nome")
        .select("*")
        .eq("nome", nome)
        .single();

    if (error) {
        if (error.code !== "PGRST116") throw error;
    }

    if (!data || data === null) {
        return null;
    }

    const parsedData = modalidadeNomeSchema.safeParse(data);
    if (!parsedData.success) {
        throw new Error(parsedData.error.errors[0].message);
    }

    const modalidadeNome = parsedData.data;
    return modalidadeNome;
}

async function save(modalidadeNome: string): Promise<ModalidadeNomeResponse> {
    const { data, error } = await supabase
        .from("modalidade_nome")
        .insert([{ nome: modalidadeNome }])
        .select()
        .single();

    if (error) {
        throw error;
    }

    const parsedData = modalidadeNomeSchema.safeParse(data);
    if (!parsedData.success) {
        throw new Error(parsedData.error.errors[0].message);
    }

    const modalidadeNomeRegistrado = parsedData.data;
    return modalidadeNomeRegistrado;
}

async function update(
    modalidadeNome: ModalidadeNomeUpdateRequest
): Promise<ModalidadeNomeResponse> {
    const { data, error } = await supabase
        .from("modalidade_nome")
        .update({ nome: modalidadeNome.nome })
        .eq("id", modalidadeNome.id)
        .select()
        .single();

    if (error) {
        throw error;
    }

    const parsedData = modalidadeNomeSchema.safeParse(data);
    if (!parsedData.success) {
        throw new Error(parsedData.error.errors[0].message);
    }

    const modalidadeNomeAtualizado = parsedData.data;
    return modalidadeNomeAtualizado;
}

async function remove(modalidadeNome: string): Promise<void> {
    const { error } = await supabase
        .from("modalidade_nome")
        .delete()
        .eq("nome", modalidadeNome);

    if (error) {
        throw error;
    }
}

interface ModalidadeNomeRepository {
    findAll: () => Promise<ModalidadeNomeResponse[]>;
    findById: (id: string) => Promise<ModalidadeNomeResponse | null>;
    findByName: (nome: string) => Promise<ModalidadeNomeResponse | null>;
    save: (modalidadeNome: string) => Promise<ModalidadeNomeResponse>;
    update: (
        modalidadeNome: ModalidadeNomeUpdateRequest
    ) => Promise<ModalidadeNomeResponse>;
    remove: (modalidadeNome: string) => Promise<void>;
}

export const modalidadeNomeRepository: ModalidadeNomeRepository = {
    findAll,
    findById,
    findByName,
    save,
    update,
    remove,
};
