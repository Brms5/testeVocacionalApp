import { roleController } from "@/server/controller/RoleController";

export async function GET(request: Request) {
  return await roleController.getAllRoles(request);
}
