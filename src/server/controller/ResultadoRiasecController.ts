import { resultadoRiasecRepository } from "../repository/ResultadoRiasecRepository";

async function getResultadosRiasecByCategoria(
    request: Request,
    categoria: string[] | string
) {
    if (!categoria) {
        return new Response("Faltando a categoria do resultado.", {
            status: 400,
        });
    }

    const response = await resultadoRiasecRepository.findByCategoria(categoria);
    return new Response(JSON.stringify(response), { status: 200 });
}

interface ResultadoRiasecController {
    getResultadosRiasecByCategoria(
        request: Request,
        categoria: string[]
    ): Promise<Response>;
}

export const resultadoRiasecController: ResultadoRiasecController = {
    getResultadosRiasecByCategoria,
};
