import { supabase } from "../infra/database/supabase";
import { Role, roleSchema } from "../schema/role";

async function findAll(): Promise<Role[]> {
    const {data, error} = await supabase
        .from('Role')
        .select('*')
        .order("nome", {ascending: true});
    if (error) {
        throw error;
    }

    const parsedData = roleSchema.array().safeParse(data);
    if (!parsedData.success) {
        throw new Error(parsedData.error.errors[0].message);
    }

    const roles = parsedData.data;
    return roles;
}

interface RoleRepository {
    findAll: () => Promise<Role[]>;
}

export const roleRepository: RoleRepository = {
    findAll,
};