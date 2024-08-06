export interface Curso {
    id: string;
    nome: string;
    created_at: string;
    edited_at: string;
}

export interface CursoRequest {
    nome: string;
}

export interface CursoResponse {
    nome: string;
    created_at: string;
    edited_at: string;
}
