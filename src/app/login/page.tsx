"use client";

import React, { useContext, useState } from "react";
import { Button, TextField, Box, Snackbar, Alert } from "@mui/material";
import { loginService } from "@/client/services/Login";
import { useRouter } from "next/navigation";
import { GlobalContext } from "@/ui/context/GlobalContext";

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
        <Box
            display="flex"
            flexDirection="column"
            justifyContent="center"
            alignItems="center"
            height="100vh"
            sx={{ backgroundColor: "#f7f7f7", padding: 2 }}
        >
            <Box
                component="form"
                display="flex"
                flexDirection="column"
                gap={2}
                width="100%"
                maxWidth={360}
                bgcolor="white"
                p={4}
                borderRadius={2}
                boxShadow={3}
            >
                <TextField
                    fullWidth
                    label="E-mail"
                    value={email}
                    onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                        setEmail(event.target.value)
                    }
                    variant="outlined"
                />
                <TextField
                    fullWidth
                    label="Senha"
                    type="password"
                    value={senha}
                    onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                        setSenha(event.target.value)
                    }
                    variant="outlined"
                />
                <Button
                    fullWidth
                    variant="contained"
                    color="primary"
                    onClick={handleLogin}
                    sx={{ padding: "10px", fontWeight: "bold" }}
                >
                    ENTRAR
                </Button>
            </Box>
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
        </Box>
    );
}

export default Login;
