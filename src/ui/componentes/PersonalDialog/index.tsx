"use client";

import * as React from "react";
import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    Radio,
    RadioGroup,
    FormControlLabel,
    FormControl,
    FormLabel,
    Box,
    Typography,
} from "@mui/material";
import { styled } from "@mui/system";
import { questaoService } from "@/client/services/Questao";
import { useEffect, useState } from "react";
import { resultadoRiasecService } from "@/client/services/ResultadoRiasec";

const CustomDialog = styled(Dialog)({
    ".MuiPaper-root": {
        borderRadius: "20px",
        overflow: "hidden",
        boxShadow: "0px 5px 15px rgba(0, 0, 0, 0.2)",
    },
});

const DialogHeader = styled("div")({
    backgroundColor: "#4169e1",
    color: "#FFFFFF",
    padding: "12px 16px",
    fontSize: "18px",
    fontWeight: "regular",
    textAlign: "center",
});

const DialogBody = styled(DialogContent)({
    padding: "0px 50px 0px 50px",
    fontSize: "16px",
    width: "400px",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
});

const CenteredDialogActions = styled(DialogActions)({
    justifyContent: "center",
    paddingBottom: "32px",
    paddingTop: "16px",
});

export default function MultiStepDialog() {
    const [open, setOpen] = useState(false);
    const [resultDialogOpen, setResultDialogOpen] = useState(false);
    const [personData, setPersonData] = useState({ answers: {} });
    const [questoes, setQuestoes] = useState<Questao[]>([]);
    const [userResult, setUserResult] = useState([]);
    const [scoreData, setScoreData] = useState([]);
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);

    useEffect(() => {
        questaoService
            .getAllQuestao()
            .then((response: Questao[]) => setQuestoes(response))
            .catch((error) => console.log("Erro ao buscar questões:", error));
    }, []);

    const handleClickOpen = () => setOpen(true);
    const handleClose = () => {
        setOpen(false);
        setPersonData({ answers: {} });
        setCurrentQuestionIndex(0);
    };
    const handleCloseResultDialog = () => {
        setResultDialogOpen(false);
        setOpen(false);
        setPersonData({ answers: {} });
        setCurrentQuestionIndex(0);
    };

    const handleAnswerChange = (question: string, value: any) => {
        setPersonData((prevData) => ({
            ...prevData,
            answers: { ...prevData.answers, [question]: value },
        }));
    };

    const handleNextQuestion = () => {
        setCurrentQuestionIndex((prevIndex) => prevIndex + 1);
    };

    const isAllAnswered = () => {
        return questoes?.every(
            (question) =>
                personData.answers[question.questao_nome] !== undefined
        );
    };

    const riasecResult = (answers, questoes) => {
        const result = {
            Realista: 0,
            Investigativo: 0,
            Artístico: 0,
            Social: 0,
            Empreendedor: 0,
            Convencional: 0,
        };

        for (const [key, value] of Object.entries(answers)) {
            questoes.forEach((question) => {
                if (question.questao_nome === key) {
                    result[question.questao_categoria] += parseInt(value, 10);
                }
            });
        }

        setScoreData(
            Object.entries(result).map(([categoria, pontuacao]) => ({
                categoria,
                pontuacao,
            }))
        );

        const sortedResult = Object.entries(result).sort(
            ([, a], [, b]) => b - a
        );
        const strongestCategory = sortedResult.filter(
            ([, value]) => value === sortedResult[0][1]
        );

        resultadoRiasecService
            .getResultadosRiasecByCategoria(
                strongestCategory.map(([category]) => category)
            )
            .then((response) => {
                setUserResult(response);
                setResultDialogOpen(true);
            });
    };

    return (
        <>
            <Button variant="outlined" onClick={handleClickOpen}>
                Iniciar teste
            </Button>
            <CustomDialog open={open} onClose={handleClose}>
                <DialogHeader>Teste Vocacional</DialogHeader>
                <DialogBody>
                    {questoes.length > 0 &&
                        currentQuestionIndex < questoes.length && (
                            <>
                                <Typography
                                    variant="body2"
                                    align="center"
                                    mb={2}
                                    sx={{ marginTop: "16px" }}
                                >
                                    {currentQuestionIndex + 1}/{questoes.length}
                                </Typography>
                                <Box
                                    sx={{
                                        height: 12,
                                        backgroundColor: "lightgray",
                                        borderRadius: "32px",
                                        marginBottom: 2,
                                    }}
                                >
                                    <Box
                                        sx={{
                                            height: "100%",
                                            width: `${
                                                ((currentQuestionIndex + 1) /
                                                    questoes.length) *
                                                100
                                            }%`,
                                            backgroundColor: "#000000",
                                            borderRadius: "32px",
                                        }}
                                    />
                                </Box>
                                <FormControl fullWidth>
                                    <FormLabel sx={{ fontWeight: "bold" }}>
                                        {
                                            questoes[currentQuestionIndex]
                                                .questao_nome
                                        }
                                    </FormLabel>
                                    <RadioGroup
                                        name={questoes[currentQuestionIndex].id}
                                        value={
                                            personData.answers[
                                                questoes[currentQuestionIndex]
                                                    .questao_nome
                                            ] || ""
                                        }
                                        onChange={(event) =>
                                            handleAnswerChange(
                                                questoes[currentQuestionIndex]
                                                    .questao_nome,
                                                event.target.value
                                            )
                                        }
                                    >
                                        {[0, 1, 2, 3, 4].map((val) => (
                                            <FormControlLabel
                                                key={val}
                                                value={val.toString()}
                                                control={<Radio />}
                                                label={
                                                    [
                                                        "Odeio",
                                                        "Não gosto",
                                                        "Não tenho preferência",
                                                        "Gosto",
                                                        "Adoro",
                                                    ][val]
                                                }
                                            />
                                        ))}
                                    </RadioGroup>
                                </FormControl>
                            </>
                        )}
                </DialogBody>
                <CenteredDialogActions>
                    {currentQuestionIndex > 0 && (
                        <Button
                            onClick={() =>
                                setCurrentQuestionIndex(
                                    (prevIndex) => prevIndex - 1
                                )
                            }
                            variant="contained"
                            color="secondary"
                            sx={{
                                transition: "all 0.3s ease",
                                "&:hover": {
                                    backgroundColor: "#000000",
                                    boxShadow:
                                        "0px 4px 12px rgba(0, 0, 0, 0.3)",
                                },
                                "&:active": {
                                    transform: "scale(0.98)",
                                    boxShadow:
                                        "0px 8px 16px rgba(0, 0, 0, 0.3)",
                                },
                            }}
                        >
                            Voltar
                        </Button>
                    )}
                    {currentQuestionIndex < questoes.length - 1 ? (
                        <Button
                            onClick={handleNextQuestion}
                            variant="contained"
                            color="primary"
                            sx={{
                                transition: "all 0.3s ease",
                                "&:hover": {
                                    backgroundColor: "#007bb2",
                                    boxShadow:
                                        "0px 4px 12px rgba(0, 0, 0, 0.3)",
                                },
                                "&:active": {
                                    transform: "scale(0.98)",
                                    boxShadow:
                                        "0px 8px 16px rgba(0, 0, 0, 0.3)",
                                },
                            }}
                        >
                            Próxima
                        </Button>
                    ) : (
                        <Button
                            disabled={!isAllAnswered()}
                            onClick={() =>
                                questoes &&
                                riasecResult(personData.answers, questoes)
                            }
                            variant="contained"
                            color="primary"
                            sx={{
                                transition: "all 0.3s ease",
                                "&:hover": {
                                    backgroundColor: "#007bb2",
                                    boxShadow:
                                        "0px 4px 12px rgba(0, 0, 0, 0.3)",
                                },
                                "&:active": {
                                    transform: "scale(0.98)",
                                    boxShadow:
                                        "0px 8px 16px rgba(0, 0, 0, 0.3)",
                                },
                            }}
                        >
                            Finalizar
                        </Button>
                    )}
                </CenteredDialogActions>
            </CustomDialog>
            <CustomDialog
                open={resultDialogOpen}
                onClose={handleCloseResultDialog}
            >
                <DialogHeader>Resultado</DialogHeader>
                <DialogBody sx={{ marginTop: "16px" }}>
                    <Box
                        display="flex"
                        justifyContent="center"
                        gap={2}
                        alignItems="flex-end"
                    >
                        {scoreData.map(({ categoria, pontuacao }) => {
                            const blackBarHeight = (pontuacao / 40) * 100;
                            const grayBarHeight = 100 - blackBarHeight;

                            return (
                                <Box key={categoria} textAlign="center">
                                    <Box
                                        height={200}
                                        width={30}
                                        bgcolor="lightgray"
                                        display="flex"
                                        alignItems="flex-end"
                                        justifyContent="center"
                                        sx={{
                                            borderRadius: "8px",
                                            overflow: "hidden",
                                        }}
                                    >
                                        <Box
                                            sx={{
                                                height: `${blackBarHeight}%`,
                                                width: "5000%",
                                                bgcolor: "black",
                                                borderBottomLeftRadius: "8px",
                                                borderBottomRightRadius: "8px",
                                            }}
                                        />
                                        <Box
                                            sx={{
                                                height: `${grayBarHeight}%`,
                                                width: "100%",
                                                bgcolor: "lightgray",
                                                borderBottomLeftRadius: "8px",
                                                borderBottomRightRadius: "8px",
                                            }}
                                        />
                                    </Box>
                                    <Typography>{categoria[0]}</Typography>
                                </Box>
                            );
                        })}
                    </Box>
                    <Typography
                        variant="h6"
                        align="center"
                        fontWeight="bold"
                        mt={2}
                        mb={2}
                    >
                        SUA PERSONALIDADE PROFISSIONAL
                    </Typography>
                    {userResult?.map((result) => (
                        <Box key={result.categoria} textAlign="center">
                            <Typography variant="h7" fontWeight="bold">
                                {result.categoria}
                            </Typography>
                            <Typography>{result.descricao}</Typography>
                        </Box>
                    ))}
                </DialogBody>
                <CenteredDialogActions>
                    <Button
                        onClick={handleCloseResultDialog}
                        variant="contained"
                        color="primary"
                    >
                        Fechar
                    </Button>
                </CenteredDialogActions>
            </CustomDialog>
        </>
    );
}
