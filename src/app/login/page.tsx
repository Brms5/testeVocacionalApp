"use client";

import React, { useContext, useState } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import { loginService } from "@/client/services/Login";
import { useRouter } from "next/navigation";
import { GlobalContext } from "@/ui/context/GlobalContext";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";

function Login() {
    const { setToken } = useContext(GlobalContext);

    const [email, setEmail] = useState<string>("");
    const [senha, setSenha] = useState<string>("");
    const [open, setOpen] = useState<boolean>(false);
    const [isLogged, setIsLogged] = useState<boolean>(false);

    const router = useRouter();

    const handleLogin = async () => {
        loginService
            .createLogin(email, senha)
            .then((response) => {
                localStorage.setItem("token", response);
                setToken(response);
                setTimeout(() => {
                    router.push("/instituicoes/cadastro");
                }, 2000);
                setIsLogged(true);
                setOpen(true);
            })
            .catch((error) => {
                setIsLogged(false);
                setOpen(true);
                console.log(error);
            });
    };

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <div className="flex h-96 align-middle justify-center">
            <form className="flex flex-col w-full max-w-80 space-y-5 justify-center">
                <TextField
                    id="standard-basic"
                    label="E-mail"
                    value={email}
                    onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                        setEmail(event.target.value);
                    }}
                    variant="standard"
                />
                <TextField
                    id="standard-basic"
                    label="Senha"
                    value={senha}
                    onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                        setSenha(event.target.value);
                    }}
                    variant="standard"
                />
                <Button variant="contained" onClick={() => handleLogin()}>
                    ENTRAR
                </Button>
                <Snackbar
                    open={open}
                    autoHideDuration={2000}
                    onClose={handleClose}
                    anchorOrigin={{ vertical: "top", horizontal: "center" }}
                >
                    <Alert
                        onClose={handleClose}
                        severity={isLogged ? "success" : "error"}
                        variant="filled"
                        sx={{ width: "100%" }}
                    >
                        {isLogged
                            ? "Login efetuado com sucesso!"
                            : "E-mail ou senha inválidos!"}
                    </Alert>
                </Snackbar>
            </form>
        </div>
    );
}

export default Login;