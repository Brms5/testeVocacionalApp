import React from "react";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import FormDialog from "../PersonalDialog";

function Home() {
    return (
        <div className="flex bg-blue-950 text-white text-justify justify-center items-center h-screen w-screen">
            <section className="w-full xl:w-1/2 h-96 rounded-lg">
                <div className="w-full text-justify p-4 h-full rounded-lg">
                    <Typography
                        variant="h6"
                        component="a"
                        // href="/"
                        sx={{
                            // mr: 10,
                            display: { xs: "flex", md: "flex" },
                            fontFamily: "monospace",
                            fontWeight: 700,
                            letterSpacing: ".2rem",
                            color: "inherit",
                            textDecoration: "none",
                        }}
                    >
                        Descubra seu futuro!
                    </Typography>
                    <Typography
                        variant="body1"
                        component="a"
                        // href="/"
                        sx={{
                            // mr: 10,
                            display: { xs: "flex", md: "flex" },
                            fontFamily: "monospace",
                            // fontWeight: 100,
                            // letterSpacing: ".1rem",
                            color: "inherit",
                            textDecoration: "none",
                        }}
                    >
                        Você já se perguntou qual carreira combina mais com a
                        sua personalidade e habilidades?
                    </Typography>
                    <Typography
                        variant="body1"
                        component="a"
                        // href="/"
                        sx={{
                            // mr: 10,
                            display: { xs: "flex", md: "flex" },
                            fontFamily: "monospace",
                            // fontWeight: 100,
                            // letterSpacing: ".1rem",
                            color: "inherit",
                            textDecoration: "none",
                        }}
                    >
                        Nosso teste vocacional foi criado para ajudar você a
                        encontrar o caminho ideal para o seu futuro. Responda
                        algumas perguntas simples e receba recomendações
                        personalizadas.
                    </Typography>
                    <Stack
                        spacing={2}
                        direction="row"
                        sx={{ mt: 2 }}
                        alignItems="center"
                        justifyContent="center"
                        width="100%"
                    >
                        <FormDialog />
                    </Stack>
                </div>
            </section>
        </div>
    );
}
export default Home;
