"use client";

import { GlobalContextData } from "@/client/interface/Context";
import React, { createContext, useMemo, useState } from "react";

export const GlobalContext = createContext({} as GlobalContextData);

export const GlobalProvider = ({ children }: any) => {
  const [instituicoes, setInstituicoes] = useState<Instituicao[]>([]);
  const [instituicaoTipoSelecionado, setInstituicaoTipoSelecionado] = useState<
    string[]
  >([]);
  const [instituicaoNome, setInstituicaoNome] = useState<string>("");

  const contextValue = useMemo(
    () => ({
      instituicoes,
      setInstituicoes,
      instituicaoTipoSelecionado,
      setInstituicaoTipoSelecionado,
      instituicaoNome, 
      setInstituicaoNome,
    }),
    [
      instituicoes,
      setInstituicoes,
      instituicaoTipoSelecionado,
      setInstituicaoTipoSelecionado,
      instituicaoNome, 
      setInstituicaoNome,
    ]
  );

  return (
    <GlobalContext.Provider value={contextValue}>
      {children}
    </GlobalContext.Provider>
  );
};
