import { resultadoRiasecController } from "@/server/controller/ResultadoRiasecController";

/**
 * @swagger
 * tags:
 *   - name: "ResultadoRiasec"
 *     description: "Endpoints related to ResultadoRiasec"
 *
 * /api/resultado-riasec/{categoria}:
 *   get:
 *     summary: Returns the Riasec results by a list of categories
 *     tags: [ResultadoRiasec]  # ✅ This groups the endpoint under "ResultadoRiasec"
 *     parameters:
 *       - in: path
 *         name: categoria
 *         required: true
 *         schema:
 *           type: array
 *           items:
 *             type: string
 *         style: simple
 *         explode: false
 *         description: The list of categories
 *     responses:
 *       200:
 *         description: Successful response
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: string
 *                   categoria:
 *                     type: string
 *                   descricao:
 *                     type: string
 *                   emprego_curso:
 *                     type: array
 *                     items:
 *                       type: string
 *                   created_at:
 *                     type: string
 *                   edited_at:
 *                     type: string
 *             example:
 *               - id: "bf8207c4-6f2c-4f00-b580-ff6b55767baf"
 *                 categoria: "Investigativo"
 *                 descricao: "Essas pessoas gostam de observar, aprender, analisar e resolver"
 *                 emprego_curso:
 *                   - "Biologia Marinha"
 *                   - "Engenharia"
 *                   - "Química"
 *                   - "Zoologia"
 *                   - "Medicina/Cirurgia"
 *                   - "Economia do Consumidor"
 *                   - "Psicologia"
 *                 created_at: "2025-03-15T20:40:55.837886+00:00"
 *                 edited_at: "2025-03-15T20:40:55.837886+00:00"
 */
export async function GET(request: Request, { params }: any) {
    const categoria = params.categoria;
    return await resultadoRiasecController.getResultadosRiasecByCategoria(
        request,
        categoria
    );
}
