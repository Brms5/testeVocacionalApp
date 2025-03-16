import { supabase } from "../infra/database/supabase";
import {
    ResultadoRiasec,
    resultadoRiasecSchema,
} from "../schema/ResultadoRiasec";

async function findByCategoria(
    categoria: string[] | string
): Promise<ResultadoRiasec[]> {
    const categorias =
        typeof categoria === "string" ? categoria.split(",") : categoria;

    const { data, error } = await supabase
        .from("resultado_riasec")
        .select("*")
        .in("categoria", categorias);
    if (error) {
        if (error.code !== "PGRST116") throw error;
        console.log("ERRO: ", error);
    }

    if (!data) {
        return [];
    }

    const parsedData = resultadoRiasecSchema.array().safeParse(data);
    if (!parsedData.success) {
        throw new Error(parsedData.error.errors[0].message);
    }

    const resultadosRiasec = parsedData.data;
    return resultadosRiasec;
}

interface ResultadoRiasecRepository {
    findByCategoria(categoria: string[] | string): Promise<ResultadoRiasec[]>;
}

export const resultadoRiasecRepository: ResultadoRiasecRepository = {
    findByCategoria,
};
