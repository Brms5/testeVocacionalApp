"use client";

import React, { useContext, useEffect, useMemo, useState } from "react";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import { GlobalContext } from "@/ui/context/GlobalContext";
import { instituicaoTipoService } from "@/client/services/InstituicaoTipo";

function InstituicaoFiltro() {
  const {
    instituicaoTipoSelecionado,
    setInstituicaoTipoSelecionado,
    instituicaoNome,
    setInstituicaoNome,
  } = useContext(GlobalContext);
  const [instituicaoTipo, setInstituicaoTipo] = useState<InstituicaoTipo[]>([]);

  useEffect(() => {
    instituicaoTipoService
      .getInstituicaoTipo()
      .then((instituicaoTipo) => {
        setInstituicaoTipo(instituicaoTipo);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const handleInstituicaoTipo = (tipo: string) => {
    if (instituicaoTipoSelecionado.includes(tipo)) {
      setInstituicaoTipoSelecionado(
        instituicaoTipoSelecionado.filter((item) => item !== tipo)
      );
    } else {
      setInstituicaoTipoSelecionado([...instituicaoTipoSelecionado, tipo]);
    }
  };

  return (
    <>
      <div className="md:flex sm:none h-15 justify-center mt-10">
        <Stack
          direction={{ xs: "column", sm: "row" }}
          spacing={{ xs: 1, sm: 2, md: 4 }}
          display={{ sm: "flex" }}
        >
          {instituicaoTipo.map((tipo) => (
            <Button
              key={tipo.id}
              onClick={() => handleInstituicaoTipo(tipo.id)}
              variant="outlined"
              sx={{
                bgcolor: instituicaoTipoSelecionado.includes(tipo.id)
                  ? "primary.main"
                  : "white",
                color: instituicaoTipoSelecionado.includes(tipo.id)
                  ? "white"
                  : "primary.main",
                "&:hover": {
                  bgcolor: "primary.main",
                  color: "white",
                },
              }}
            >
              {tipo.nome}
            </Button>
          ))}
        </Stack>
      </div>
      <div className="flex justify-center mt-10">
        <Box
          sx={{
            width: 600,
            maxWidth: "100%",
          }}
        >
          <TextField
            id="outlined-controlled"
            variant="filled"
            label="Instituição"
            value={instituicaoNome}
            onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
              setInstituicaoNome(event.target.value);
            }}
            fullWidth
            color="primary"
          />
        </Box>
      </div>
    </>
  );
}

export default InstituicaoFiltro;
