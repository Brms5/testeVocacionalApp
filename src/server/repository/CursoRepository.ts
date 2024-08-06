import { supabase } from "../infra/database/supabase";
import { CursoRequest, CursoResponse } from "../interface/curso";
import { cursoSchema } from "../schema/Curso";

async function findAll(): Promise<CursoResponse[]> {
    const { data, error } = await supabase
        .from("Curso")
        .select("*")
        .order("nome");
    if (error) {
        throw error;
    }

    const parsedData = cursoSchema.array().safeParse(data);
    if (!parsedData.success) {
        throw new Error(parsedData.error.errors[0].message);
    }

    const cursos = parsedData.data;
    return cursos;
}

async function findById(id: string): Promise<CursoResponse | null> {
    const { data, error } = await supabase
        .from("Curso")
        .select("*")
        .eq("id", id);

    if (error) {
        throw error;
    }

    if (!data) {
        return null;
    }

    const parsedData = cursoSchema.safeParse(data);
    if (!parsedData.success) {
        throw new Error(parsedData.error.errors[0].message);
    }

    const curso = parsedData.data;
    return curso;
}

async function findByName(nome: string): Promise<CursoResponse | null> {
    const { data, error } = await supabase
        .from("Curso")
        .select("*")
        .eq("nome", nome)
        .single();

    if (error) {
        if (error.code !== "PGRST116") throw error;
    }

    if (!data || data === null) {
        return null;
    }

    const parsedData = cursoSchema.safeParse(data);
    if (!parsedData.success) {
        throw new Error(parsedData.error.errors[0].message);
    }

    const curso = parsedData.data;
    return curso;
}

async function save(curso: CursoRequest): Promise<CursoResponse | null> {
    const { data, error } = await supabase
        .from("Curso")
        .insert([curso])
        .select()
        .single();
    if (error) {
        throw error;
    }

    const parsedData = cursoSchema.safeParse(data);
    if (!parsedData.success) {
        throw new Error(parsedData.error.errors[0].message);
    }

    const cursoResponse: CursoResponse = {
        nome: parsedData.data.nome,
        created_at: parsedData.data.created_at,
        edited_at: parsedData.data.edited_at,
    };
    return cursoResponse;
}

interface CursoRepository {
    findAll: () => Promise<CursoResponse[]>;
    findById: (id: string) => Promise<CursoResponse | null>;
    findByName: (nome: string) => Promise<CursoResponse | null>;
    save: (curso: CursoRequest) => Promise<CursoResponse | null>;
}

export const cursoRepository: CursoRepository = {
    findAll,
    findById,
    findByName,
    save,
};
