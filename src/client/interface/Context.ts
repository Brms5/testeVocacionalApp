export interface GlobalContextProps {
    children: React.ReactNode;
}

export interface GlobalContextData {
    token: string | null;
    setToken: (token: string | null) => void;
}
