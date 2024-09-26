import React from "react";
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import { CardActionArea } from "@mui/material";
import Link from "next/link";

interface InputInstituicaoCard {
    id: string;
    nome: string;
    imagem: string;
    instituicao_tipo_id: string;
}

function InstituicaoCard({ nome, imagem }: InputInstituicaoCard) {
    return (
        <Card
            sx={{
                width: 250, // Largura reduzida
                height: 200, // Altura reduzida
                borderRadius: "12px",
                boxShadow: 2,
                overflow: "hidden",
                transition: "transform 0.3s",
                "&:hover": {
                    transform: "scale(1.25)",
                },
                margin: "16px 0", // Distância vertical entre os cards
            }}
        >
            <CardActionArea sx={{ height: "100%" }}>
                <Link href={`/instituicoes/${nome}`}>
                    <CardMedia
                        component="img"
                        height="150" // Altura da imagem reduzida
                        image={imagem}
                        alt={nome}
                        sx={{
                            objectFit: "cover",
                        }}
                    />
                </Link>
            </CardActionArea>
        </Card>
    );
}

export default InstituicaoCard;
