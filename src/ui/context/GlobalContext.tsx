"use client";

import { GlobalContextData } from "@/client/interface/Context";
import React, { createContext, useMemo, useState } from "react";

export const GlobalContext = createContext({} as GlobalContextData);

export const GlobalProvider = ({ children }: any) => {
    const [instituicoes, setInstituicoes] = useState<Instituicao[]>([]);
    const [token, setToken] = useState<string | null>(null);

    const contextValue = useMemo(
        () => ({
            instituicoes,
            setInstituicoes,
            token,
            setToken,
        }),
        [instituicoes, setInstituicoes, token, setToken]
    );

    return (
        <GlobalContext.Provider value={contextValue}>
            {children}
        </GlobalContext.Provider>
    );
};
