export interface ModalidadeNomeResponse {
    id: string;
    nome: string;
    created_at: string;
    edited_at: string;
}

export interface ModalidadeNomeRequest {
    nome: string;
}

export interface ModalidadeNomeUpdateRequest {
    id: string;
    nome: string;
    edited_at: string;
}
