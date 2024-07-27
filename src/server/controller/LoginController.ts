import { infraSecurity } from "../infra/security/auth";
import { loginRepository } from "../repository/LoginRepository";

async function login(request: Request) {
    const body = await request.json();
    const { email, senha } = body;
    const response = await loginRepository.login(email, senha);

    if (!response) {
        return new Response("Usuário não encontrado.", { status: 404 });
    }

    const token = infraSecurity.createToken(response);

    return new Response(JSON.stringify(token), { status: 200 });
}

interface LoginController {
    login: (request: Request) => Promise<Response>;
}

export const loginController: LoginController = {
    login,
};
