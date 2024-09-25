"use client";

import React, { useContext, useEffect, useMemo, useState } from "react";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import { GlobalContext } from "@/ui/context/GlobalContext";
import { instituicaoTipoService } from "@/client/services/InstituicaoTipo";

function InstituicaoFiltro() {
    const {
        instituicaoTipoSelecionado,
        setInstituicaoTipoSelecionado,
        instituicaoNome,
        setInstituicaoNome,
    } = useContext(GlobalContext);
    const [instituicaoTipo, setInstituicaoTipo] = useState<InstituicaoTipo[]>(
        []
    );

    useEffect(() => {
        instituicaoTipoService
            .getInstituicaoTipo()
            .then((instituicaoTipo) => {
                setInstituicaoTipo(instituicaoTipo);
            })
            .catch((error) => {
                console.log(error);
            });
    }, []);

    const handleInstituicaoTipo = (tipo: string) => {
        if (instituicaoTipoSelecionado.includes(tipo)) {
            setInstituicaoTipoSelecionado(
                instituicaoTipoSelecionado.filter((item) => item !== tipo)
            );
        } else {
            setInstituicaoTipoSelecionado([
                ...instituicaoTipoSelecionado,
                tipo,
            ]);
        }
    };

    return (
        <>
            <div className="md:flex sm:none h-15 justify-center mt-5">
                <Stack
                    direction={{ xs: "column", sm: "row" }}
                    spacing={{ xs: 1, sm: 2, md: 4 }}
                    display={{ sm: "flex" }}
                >
                    {instituicaoTipo.map((tipo) => (
                        <Button
                            key={tipo.id}
                            onClick={() => handleInstituicaoTipo(tipo.id)}
                            variant="text"
                            size="small"
                            sx={{
                                color: instituicaoTipoSelecionado.includes(
                                    tipo.id
                                )
                                    ? "indigo"
                                    : "primary.main",
                            }}
                        >
                            {tipo.nome}
                        </Button>
                    ))}
                </Stack>
            </div>
            <div className="flex justify-center mt-1">
                <Box
                    sx={{
                        width: { xs: 350, sm: 500, md: 700 },
                        maxWidth: "100%",
                        borderRadius: "50px", 
                        display: "flex",
                        color: "white",
                        padding: "10px",
                    }}
                >
                        {instituicaoTipo && (
                            <TextField
                                id="outlined-controlled"
                                variant="filled"
                                label="Instituição"
                                value={instituicaoNome}
                                onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                                    setInstituicaoNome(event.target.value);
                                }}
                                fullWidth
                                color="primary"
                                sx={{
                                    borderRadius: "16px",
                                    backgroundColor: "#f0f0f0",
                                    '& .MuiFilledInput-root': {
                                        borderRadius: "16px",
                                        border: "none",
                                        backgroundColor: "#f0f0f0",
                                        '&:before, &:after': {
                                            display: 'none',
                                        },
                                        '&:hover': {
                                            backgroundColor: "#e0e0e0",
                                        },
                                        '&.Mui-focused': {
                                            backgroundColor: "#e0e0e0",
                                            boxShadow: '0 0 0 4px rgba(0, 0, 0, 0.2)',
                                        },
                                    },
                                    '& .MuiInputLabel-root': {
                                        color: "rgba(0, 0, 0, 0.6)", 
                                        '&.Mui-focused': {
                                            color: "#1976d2", // Cor ao focar
                                        },
                                    },
                                    '& .MuiFilledInput-root:hover': {
                                        backgroundColor: "#e0e0e0",
                                    },
                                    '& .MuiFilledInput-root.Mui-error': {
                                        backgroundColor: "#ffebee", // Cor para erro
                                    },
                                }}
                            />
                        )}

                </Box>
            </div>
        </>
    );
}

export default InstituicaoFiltro;
