"use client";

import { GlobalContextData } from "@/client/interface/Context";
import React, { createContext, useMemo, useState } from "react";

export const GlobalContext = createContext({} as GlobalContextData);

export const GlobalProvider = ({ children }: any) => {
    const [token, setToken] = useState<string | null>(null);

    const contextValue = useMemo(
        () => ({
            token,
            setToken,
        }),
        [token, setToken]
    );

    return (
        <GlobalContext.Provider value={contextValue}>
            {children}
        </GlobalContext.Provider>
    );
};
