import { NextResponse } from "next/server";
import swaggerJSDoc from "swagger-jsdoc";

const options = {
    definition: {
        openapi: "3.0.0",
        info: {
            title: "Next.js API with Swagger",
            version: "1.0.0",
        },
    },
    apis: ["./src/app/api/**/*.ts"], // FIX: Ensure correct path
};

const swaggerSpec = swaggerJSDoc(options);

export async function GET() {
    return NextResponse.json(swaggerSpec);
}
