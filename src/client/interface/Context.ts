export interface GlobalContextProps {
    children: React.ReactNode;
}

export interface GlobalContextData {
    instituicoes: Instituicao[];
    setInstituicoes: (instituicao: Instituicao[]) => void;
    token: string | null;
    setToken: (token: string | null) => void;
}
