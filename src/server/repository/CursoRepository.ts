import { supabase } from "../infra/database/supabase";
import { CursoResponse, CursoUpdateRequest } from "../interface/CursoInterface";
import { cursoSchema } from "../schema/Curso";

async function findAll(): Promise<CursoResponse[]> {
    const { data, error } = await supabase
        .from("curso")
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
        .from("curso")
        .select("*")
        .eq("id", id)
        .single();

    if (error) {
        throw error;
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

async function findByName(cursoNome: string): Promise<CursoResponse | null> {
    const { data, error } = await supabase
        .from("curso")
        .select("*")
        .eq("nome", cursoNome)
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

async function save(cursoNome: string): Promise<CursoResponse | null> {
    const { data, error } = await supabase
        .from("curso")
        .insert([{ nome: cursoNome }])
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
        id: parsedData.data.id,
        nome: parsedData.data.nome,
        created_at: parsedData.data.created_at,
        edited_at: parsedData.data.edited_at,
    };
    return cursoResponse;
}

async function update(
    curso: CursoUpdateRequest
): Promise<CursoResponse | null> {
    const { data, error } = await supabase
        .from("curso")
        .update(curso)
        .eq("id", curso.id)
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
        id: parsedData.data.id,
        nome: parsedData.data.nome,
        created_at: parsedData.data.created_at,
        edited_at: parsedData.data.edited_at,
    };
    return cursoResponse;
}

async function remove(curso: string): Promise<void> {
    const { error } = await supabase.from("curso").delete().eq("nome", curso);
    if (error) {
        throw error;
    }
}

interface CursoRepository {
    findAll: () => Promise<CursoResponse[]>;
    findById: (id: string) => Promise<CursoResponse | null>;
    findByName: (nome: string) => Promise<CursoResponse | null>;
    save: (cursoNome: string) => Promise<CursoResponse | null>;
    update: (curso: CursoUpdateRequest) => Promise<CursoResponse | null>;
    remove: (curso: string) => Promise<void>;
}

export const cursoRepository: CursoRepository = {
    findAll,
    findById,
    findByName,
    save,
    update,
    remove,
};
