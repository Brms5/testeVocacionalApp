import { supabase } from "../infra/database/supabase";
import { Usuario, usuarioSchema } from "../schema/Usuario";

async function login(email: string, senha: string): Promise<Usuario> {
    const { data, error } = await supabase
        .from("User")
        .select("*")
        .eq("email", email)
        .eq("senha", senha)
        .single();
    if (error) {
        throw error;
    }
    const parsedData = usuarioSchema.safeParse(data);
    if (!parsedData.success) {
        throw new Error(parsedData.error.errors[0].message);
    }
    const usuario = parsedData.data;
    return usuario;
}

interface LoginRepository {
    login: (email: string, senha: string) => Promise<Usuario>;
}

export const loginRepository: LoginRepository = {
    login,
};
