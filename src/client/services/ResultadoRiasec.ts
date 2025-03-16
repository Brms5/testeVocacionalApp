import { resultadoRiasecSchema } from "@/server/schema/ResultadoRiasec";

function getResultadosRiasecByCategoria(
    categoria: string[] | string
): Promise<ResultadoRiasec[]> {
    return fetch(`/api/resultado-riasec/${categoria}`).then(
        async (response) => {
            if (!response.ok) {
                throw new Error(response.statusText);
            }

            const resultadoRiasecResponse = await response.json();
            const resultadoRiasec = resultadoRiasecSchema
                .array()
                .safeParse(resultadoRiasecResponse);
            if (!resultadoRiasec.success) {
                throw new Error("Erro ao buscar resultados Riasec");
            }

            const resultadoRiasecData: ResultadoRiasec[] =
                resultadoRiasec.data.map((resultado) => ({
                    categoria: resultado.categoria,
                    descricao: resultado.descricao,
                    emprego_curso: resultado.emprego_curso,
                }));

            return resultadoRiasecData;
        }
    );
}

interface ResultadoRiasecService {
    getResultadosRiasecByCategoria(
        categoria: string[] | string
    ): Promise<ResultadoRiasec[]>;
}

export const resultadoRiasecService: ResultadoRiasecService = {
    getResultadosRiasecByCategoria,
};
