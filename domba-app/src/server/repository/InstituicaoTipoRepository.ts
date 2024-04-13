import { supabase } from "../infra/database/supabase";
import { InstituicaoTipo, instituicaoTipoSchema } from "../schema/instituicaoTipo";

async function findAll(): Promise<InstituicaoTipo[]> {
    const {data, error} = await supabase
        .from('Instituicao_tipo')
        .select('*')
        .order("nome", {ascending: true});
    if (error) {
        throw error;
    }

    const parsedData = instituicaoTipoSchema.array().safeParse(data);
    if (!parsedData.success) {
        throw new Error(parsedData.error.errors[0].message);
    }

    const instituicaoTipos = parsedData.data;
    return instituicaoTipos;
}

async function findById(id: string): Promise<InstituicaoTipo> {
    const {data, error} = await supabase
        .from('Instituicao_tipo')
        .select('*')
        .eq('id', id)
        .single();
    if (error) {
        throw error;
    }

    const parsedData = instituicaoTipoSchema.safeParse(data);
    if (!parsedData.success) {
        throw new Error(parsedData.error.errors[0].message);
    }

    const instituicaoTipo = parsedData.data;
    return instituicaoTipo;
}

async function save(nome: string): Promise<InstituicaoTipo> {
    const {data, error} = await supabase
        .from('Instituicao_tipo')
        .insert(nome)
        .select()
        .single();
    if (error) {
        throw error;
    }

    const parsedData = instituicaoTipoSchema.safeParse(data);
    if (!parsedData.success) {
        throw new Error(parsedData.error.errors[0].message);
    }

    const instituicaoTipoCreated = parsedData.data;
    return instituicaoTipoCreated;
}

interface InstituicaoTipoRepository {
    findAll: () => Promise<InstituicaoTipo[]>;
    findById: (id: string) => Promise<InstituicaoTipo>;
    save: (nome: string) => Promise<InstituicaoTipo>;
}

export const instituicaoTipoRepository: InstituicaoTipoRepository = {
    findAll,
    findById,
    save,
};