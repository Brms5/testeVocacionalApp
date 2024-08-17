export interface Curso {
    id: string;
    nome: string;
    created_at: string;
    edited_at: string;
}

export interface CursoRequest {
    nome: string;
}

export interface CursoUpdateRequest {
    id: string;
    nome: string;
    edited_at: string;
}

export interface CursoResponse {
    id: string;
    nome: string;
    created_at: string;
    edited_at: string;
}
