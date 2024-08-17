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

function verifyToken(token: string | null): boolean {
    // verify if the token exists
    if (token === null) {
        console.error("Token não encontrado.");
        return false;
    }

    // verify if the token is valid
    jsonwebtoken.verify(token, "secret", (err: any) => {
        if (err) {
            console.error("Token inválido.");
            return false;
        }
    });

    return true;
}

interface InfraSecurity {
    createToken: (usuario: Usuario) => string;
    verifyToken: (token: string | null) => boolean;
}

export const infraSecurity: InfraSecurity = {
    createToken,
    verifyToken,
};
