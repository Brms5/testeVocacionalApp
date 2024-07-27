import { supabase } from "../infra/database/supabase";
import { Prova, provaSchema } from "../schema/prova";

async function findAll(): Promise<Prova[]> {
    const { data, error } = await supabase.from("Prova").select("*");
    if (error) {
        throw error;
    }

    const parsedData = provaSchema.array().safeParse(data);
    if (!parsedData.success) {
        throw new Error(parsedData.error.errors[0].message);
    }

    const provas = parsedData.data;
    return provas;
}

async function findById(id: string): Promise<Prova> {
    const { data, error } = await supabase
        .from("Prova")
        .select("*")
        .eq("id", id)
        .single();
    if (error) {
        throw error;
    }

    const parsedData = provaSchema.safeParse(data);
    if (!parsedData.success) {
        throw new Error(parsedData.error.errors[0].message);
    }

    const prova = parsedData.data;
    return prova;
}

async function findByModalidadeDeIngressoId(
    modalidadeDeIngressoId: string
): Promise<Prova[]> {
    const { data, error } = await supabase
        .from("Prova")
        .select("*")
        .eq("modalidade_de_ingresso_id", modalidadeDeIngressoId);
    if (error) {
        throw error;
    }

    const parsedData = provaSchema.array().safeParse(data);
    if (!parsedData.success) {
        throw new Error(parsedData.error.errors[0].message);
    }

    const provas = parsedData.data;
    return provas;
}

async function save(prova: ProvaCreate): Promise<Prova> {
    const { data, error } = await supabase
        .from("Prova")
        .insert(prova)
        .select()
        .single();
    if (error) {
        throw error;
    }

    const parsedData = provaSchema.safeParse(data);
    if (!parsedData.success) {
        throw new Error(parsedData.error.errors[0].message);
    }

    const provaCreated = parsedData.data;
    return provaCreated;
}

async function update(prova: ProvaUpdate): Promise<Prova> {
    const currentDate = new Date();
    currentDate.setHours(currentDate.getHours() - 3);
    prova.edited_at = currentDate.toISOString();

    const { data, error } = await supabase
        .from("Prova")
        .update(prova)
        .eq("id", prova.id)
        .select()
        .single();
    if (error) {
        throw error;
    }

    const parsedData = provaSchema.safeParse(data);
    if (!parsedData.success) {
        throw new Error(parsedData.error.errors[0].message);
    }

    const provaUpdated = parsedData.data;
    return provaUpdated;
}

async function deleteById(id: string): Promise<void> {
    const { error } = await supabase.from("Prova").delete().eq("id", id);
    if (error) {
        throw error;
    }
}

interface ProvaRepository {
    findAll: () => Promise<Prova[]>;
    findById: (id: string) => Promise<Prova>;
    findByModalidadeDeIngressoId: (
        modalidadeDeIngressoId: string
    ) => Promise<Prova[]>;
    save: (prova: ProvaCreate) => Promise<Prova>;
    update: (prova: ProvaUpdate) => Promise<Prova>;
    deleteById: (id: string) => Promise<void>;
}

export const provaRepository: ProvaRepository = {
    findAll,
    findById,
    findByModalidadeDeIngressoId,
    save,
    update,
    deleteById,
};
