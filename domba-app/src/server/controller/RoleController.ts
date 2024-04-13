import { roleRepository } from "../repository/RoleRepository";

async function getAllRoles(request: Request) {
  const response = await roleRepository.findAll();
  return new Response(JSON.stringify(response), { status: 200 });
};

interface RoleController {
  getAllRoles: (request: Request) => Promise<Response>;
};

export const roleController: RoleController = {
  getAllRoles,
};
