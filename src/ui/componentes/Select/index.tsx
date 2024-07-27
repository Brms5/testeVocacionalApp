"use client";

import * as React from "react";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import { useContext } from "react";
import { GlobalContext } from "@/ui/context/GlobalContext";

interface BasicSelectProps {
    label: string;
    entidadeProps: any;
}

export default function BasicSelect({
    label,
    entidadeProps,
}: BasicSelectProps) {
    const {
        instituicaoSelecionada,
        setInstituicaoSelecionada,
        modalidadeSelecionada,
        setModalidadeSelecionada,
        provaSelecionada,
        setProvaSelecionada,
    } = useContext(GlobalContext);

    const handleInstituicao = (event: SelectChangeEvent) => {
        setInstituicaoSelecionada(event.target.value as string);
    };

    const handleModalidade = (event: SelectChangeEvent) => {
        setModalidadeSelecionada(event.target.value as string);
    };

    const handleProva = (event: SelectChangeEvent) => {
        setProvaSelecionada(event.target.value as string);
    };

    return (
        <Box sx={{ minWidth: 120 }}>
            <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">{label}</InputLabel>
                <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={
                        label === "Instituição"
                            ? instituicaoSelecionada
                            : label === "Modalidade de ingresso"
                            ? modalidadeSelecionada
                            : provaSelecionada
                    }
                    label={label}
                    onChange={
                        label === "Instituição"
                            ? handleInstituicao
                            : label === "Modalidade de ingresso"
                            ? handleModalidade
                            : handleProva
                    }
                >
                    <MenuItem value={"Cadastro"}>Cadastro</MenuItem>
                    {entidadeProps.map((entidade: any) => (
                        <MenuItem key={entidade.id} value={entidade.id}>
                            {entidade.nome || entidade.modalidade}
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>
        </Box>
    );
}
