import React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { CardActionArea } from "@mui/material";
import Image from "next/image";

interface InputInstituicaoCard {
  id: string;
  nome: string;
  imagem: string;
  instituicao_tipo_id: string;
}

function InstituicaoCard({
  id,
  nome,
  imagem,
  instituicao_tipo_id,
}: InputInstituicaoCard) {
  return (
    <Card sx={{ width: 350, height: 220 }}>
      <CardActionArea href={`instituicoes/${nome}`} sx={{ width: 350, height: 220 }}>
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
      </CardActionArea>
    </Card>
  );
}

export default InstituicaoCard;
