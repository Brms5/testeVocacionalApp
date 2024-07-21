"use client";

import React, { useContext, useMemo } from "react";
import InstituicaoCard from "@/ui/componentes/InstituicaoCard/index";
import InstituicaoFiltro from "@/ui/componentes/InstituicaoFiltro";
import Grid from "@mui/material/Grid";
import { instituicaoService } from "@/client/services/Instituicao";
import { GlobalContext } from "@/ui/context/GlobalContext";
import Button from "@mui/material/Button";
import Link from "next/link";

function Intituicoes() {
    const {
        instituicoes,
        setInstituicoes,
        instituicaoTipoSelecionado,
        instituicaoNome,
        token,
        setInstituicaoSelecionada,
        setModalidadeSelecionada,
        setProvaSelecionada,
    } = useContext(GlobalContext);

    useMemo(() => {
        instituicaoService
            .getInstituicao()
            .then((instituicao) => {
                let instituicaoFiltrada = instituicao;

                if (instituicaoNome) {
                    instituicaoFiltrada = instituicaoFiltrada.filter((item) =>
                        item.nome
                            .toLowerCase()
                            .startsWith(instituicaoNome.toLowerCase())
                    );
                }
                if (instituicaoTipoSelecionado.length) {
                    instituicaoFiltrada = instituicaoFiltrada.filter((item) =>
                        instituicaoTipoSelecionado.includes(
                            item.instituicao_tipo_id
                        )
                    );
                }

                setInstituicoes(instituicaoFiltrada);
            })
            .catch((error) => {
                console.log(error);
            });
    }, [instituicaoTipoSelecionado, instituicaoNome]);

    const handleCadastroInstituicao = () => {
        setInstituicaoSelecionada("Cadastro");
        setModalidadeSelecionada("Cadastro");
        setProvaSelecionada("Cadastro");
    };

    return (
        <>
            {instituicoes ? (
                <>
                    {token ? (
                        <div className="flex sm:none h-15 justify-center mt-10 align-middle">
                            <Link href="/instituicoes/cadastro">
                                <Button
                                    variant="contained"
                                    sx={{
                                        color: "white",
                                        borderColor: "primary.main",
                                        backgroundColor: "primary.main",
                                    }}
                                    onClick={() => handleCadastroInstituicao()}
                                >
                                    CADASTRE OUTRAS INSTITUIÇÕES
                                </Button>
                            </Link>
                        </div>
                    ) : (
                        <></>
                    )}
                    <InstituicaoFiltro />
                    <div className="flex mt-20 justify-center items-stretch">
                        <Grid
                            container
                            spacing={{ xs: 1, md: 2 }}
                            columns={{ xs: 2, sm: 8, md: 12 }}
                        >
                            {instituicoes &&
                                instituicoes.map((value, index) => (
                                    <Grid
                                        sx={{ display: "flex" }}
                                        justifyContent={"center"}
                                        item
                                        xs={2}
                                        sm={4}
                                        md={4}
                                        key={index}
                                    >
                                        <InstituicaoCard
                                            id={value.id}
                                            nome={value.nome}
                                            imagem={value.imagem}
                                            instituicao_tipo_id={
                                                value.instituicao_tipo_id
                                            }
                                        />
                                    </Grid>
                                ))}
                        </Grid>
                    </div>
                </>
            ) : (
                <div>Carregando...</div>
            )}
        </>
    );
}

export default Intituicoes;
