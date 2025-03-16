import { questaoController } from "@/server/controller/QuestaoController";

/**
 * @swagger
 * tags:
 *   - name: "Greeting"
 *     description: "Endpoints related to greetings"
 *
 * /api/questao:
 *   get:
 *     summary: Returns a greeting message
 *     tags: [Greeting]  # ✅ This groups the endpoint under "Greeting"
 *     responses:
 *       200:
 *         description: Successful response
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Hello, world!"
 */
export async function GET(request: Request) {
    return await questaoController.getAllQuestoes(request);
}
