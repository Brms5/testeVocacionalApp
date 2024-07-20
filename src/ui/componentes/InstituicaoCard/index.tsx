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

function InstituicaoCard({
  nome,
  imagem,
}: InputInstituicaoCard) {
  return (
    <Card sx={{ width: 350, height: 220 }}>
      <CardActionArea sx={{ width: 350, height: 220 }}>
        <Link href={`/instituicoes/${nome}`}>
          <CardMedia
            component="img"
            height="220"
            width="330"
            image={imagem}
            alt={nome}
            // style={{ height: "200", width: "350" }}
          />
          {/* <img 
          src={imagem} 
          alt={nome} 
          width={350}
          height={200}
          // style={{ height: "200", width: "350" }}
        /> */}
          {/* <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {nome}
          </Typography>
        </CardContent> */}
        </Link>
      </CardActionArea>
    </Card>
  );
}

export default InstituicaoCard;
