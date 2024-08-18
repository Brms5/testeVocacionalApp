import { Usuario } from "@/server/schema/Usuario";
import jsonwebtoken from "jsonwebtoken";

function createToken(usuario: Usuario): string {
    const token = jsonwebtoken.sign(
        { id: usuario.id, email: usuario.email },
        "secret",
        {
            expiresIn: "1h",
        }
    );

    return token;
}

function verifyToken(token: string | null): void {
    // verify if the token exists
    if (token === null) {
        throw new Error("Token não encontrado.");
    }

    // verify if the token is valid
    jsonwebtoken.verify(token, "secret", (err: any) => {
        if (err) {
            throw new Error("Token inválido.");
        }
    });
}

interface InfraSecurity {
    createToken: (usuario: Usuario) => string;
    verifyToken: (token: string | null) => void;
}

export const infraSecurity: InfraSecurity = {
    createToken,
    verifyToken,
};
