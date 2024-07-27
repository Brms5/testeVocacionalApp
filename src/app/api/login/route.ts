import { loginController } from "@/server/controller/LoginController";

export async function POST(request: Request) {
    return await loginController.login(request);
}
