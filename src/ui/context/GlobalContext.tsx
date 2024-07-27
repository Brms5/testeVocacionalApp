"use client";

import { GlobalContextData } from "@/client/interface/Context";
import React, { createContext, useMemo, useState } from "react";

export const GlobalContext = createContext({} as GlobalContextData);

export const GlobalProvider = ({ children }: any) => {
    const [instituicoes, setInstituicoes] = useState<Instituicao[]>([]);
    const [instituicaoTipoSelecionado, setInstituicaoTipoSelecionado] =
        useState<string[]>([]);
    const [instituicaoNome, setInstituicaoNome] = useState<string>("");
    const [token, setToken] = useState<string | null>(null);
    const [modalidadeSelecionada, setModalidadeSelecionada] =
        useState<string>("Cadastro");
    const [provaSelecionada, setProvaSelecionada] =
        useState<string>("Cadastro");
    const [instituicaoSelecionada, setInstituicaoSelecionada] =
        useState<string>("Cadastro");

    const contextValue = useMemo(
        () => ({
            instituicoes,
            setInstituicoes,
            instituicaoTipoSelecionado,
            setInstituicaoTipoSelecionado,
            instituicaoNome,
            setInstituicaoNome,
            token,
            setToken,
            modalidadeSelecionada,
            setModalidadeSelecionada,
            provaSelecionada,
            setProvaSelecionada,
            instituicaoSelecionada,
            setInstituicaoSelecionada,
        }),
        [
            instituicoes,
            setInstituicoes,
            instituicaoTipoSelecionado,
            setInstituicaoTipoSelecionado,
            instituicaoNome,
            setInstituicaoNome,
            token,
            setToken,
            modalidadeSelecionada,
            setModalidadeSelecionada,
            provaSelecionada,
            setProvaSelecionada,
            instituicaoSelecionada,
            setInstituicaoSelecionada,
        ]
    );

    return (
        <GlobalContext.Provider value={contextValue}>
            {children}
        </GlobalContext.Provider>
    );
};
