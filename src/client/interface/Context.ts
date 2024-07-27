export interface GlobalContextProps {
    children: React.ReactNode;
}

export interface GlobalContextData {
    instituicoes: Instituicao[];
    setInstituicoes: (instituicao: Instituicao[]) => void;
    instituicaoTipoSelecionado: string[];
    setInstituicaoTipoSelecionado: (
        instituicaoTipoSelecionado: string[]
    ) => void;
    instituicaoNome: string;
    setInstituicaoNome: (instituicaoNome: string) => void;
    token: string | null;
    setToken: (token: string | null) => void;
    modalidadeSelecionada: string;
    setModalidadeSelecionada: (modalidade: string) => void;
    provaSelecionada: string;
    setProvaSelecionada: (prova: string) => void;
    instituicaoSelecionada: string;
    setInstituicaoSelecionada: (instituicao: string) => void;
}
