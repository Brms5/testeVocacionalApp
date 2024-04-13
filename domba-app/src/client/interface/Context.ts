export interface GlobalContextProps {
  children: React.ReactNode;
}

export interface GlobalContextData {
  instituicoes: Instituicao[];
  setInstituicoes: (instituicao: Instituicao[]) => void;
  instituicaoTipoSelecionado: string[];
  setInstituicaoTipoSelecionado: (instituicaoTipoSelecionado: string[]) => void;
  instituicaoNome: string;
  setInstituicaoNome: (instituicaoNome: string) => void;
}
