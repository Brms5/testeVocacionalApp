function createLogin(email: string, senha: string): Promise<any> {
    const login: LoginCreate = {
        email,
        senha,
    };

    return fetch(`/api/login`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(login),
    }).then(async (response) => {
        if (!response.ok) throw new Error("Erro ao fazer login.");

        const token = await response.json();
        return token;
    });
}

interface LoginService {
    createLogin: (email: string, senha: string) => Promise<any>;
}

export const loginService: LoginService = {
    createLogin,
};
