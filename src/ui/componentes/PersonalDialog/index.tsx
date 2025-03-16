"use client";

import * as React from "react";
import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    Radio,
    RadioGroup,
    FormControlLabel,
    FormControl,
    FormLabel,
} from "@mui/material";
import { questaoService } from "@/client/services/Questao";
import { useEffect } from "react";

interface personData {
    answers: { [key: string]: string };
}

type RiasecCategory =
    | "Realista"
    | "Investigativo"
    | "Artístico"
    | "Social"
    | "Empreendedor"
    | "Convencional";

type Questao = {
    id: string;
    questao_nome: string;
    questao_categoria: RiasecCategory;
};

export default function MultiStepDialog() {
    const [open, setOpen] = React.useState(false);
    const [personData, setPersonData] = React.useState<personData>({
        answers: {},
    });
    const [questoes, setQuestoes] = React.useState<Questao[]>();

    useEffect(() => {
        questaoService
            .getAllQuestao()
            .then((response) => {
                setQuestoes(response);
            })
            .catch((error) => {
                console.log("Erro ao buscar questões:", error);
            });
    }, []);

    const handleClickOpen = () => {
        if (questoes === undefined) {
            questaoService
                .getAllQuestao()
                .then((response) => {
                    setQuestoes(response);
                })
                .catch((error) => {
                    console.log("Erro ao buscar questões:", error);
                });
        }
        console.log("Questoes: ", questoes);
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
        setPersonData({ answers: {} });
        console.log(personData);
    };

    const handleNext = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        if (questoes === undefined) {
            return;
        }

        const newFormData = new FormData(event.currentTarget);
        const updatedData = Object.fromEntries(newFormData.entries());

        setPersonData((prevData) => ({
            ...prevData,
            ...updatedData,
            age: updatedData.age ? Number(updatedData.age) : "",
        }));

        handleClose();
    };

    const handleAnswerChange = (question: string, value: string) => {
        setPersonData((prevData) => ({
            ...prevData,
            answers: { ...prevData.answers, [question]: value },
        }));
    };

    const isAllAnswered = () => {
        return questoes?.every(
            (question) => personData.answers[question.questao_nome]
        );
    };

    const riasecResult = (
        answers: { [key: string]: string },
        questoes: { questao_nome: string; questao_categoria: RiasecCategory }[]
    ) => {
        const result: Record<RiasecCategory, number> = {
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

        console.log("Resultado: ", result);
        return result;
    };

    const renderDialogContent = () => {
        return (
            <>
                <DialogTitle>Teste vocacional</DialogTitle>
                <DialogContent
                    dividers
                    style={{ maxHeight: "400px", overflowY: "auto" }}
                >
                    {questoes &&
                        questoes.map((question) => (
                            <FormControl
                                key={question.id}
                                component="fieldset"
                                fullWidth
                                style={{ marginBottom: "1.5rem" }}
                            >
                                <FormLabel
                                    component="legend"
                                    style={{ display: "block" }}
                                >
                                    {question.questao_nome}
                                </FormLabel>
                                <RadioGroup
                                    name={question.id}
                                    style={{ width: "100%" }}
                                    value={
                                        personData.answers[
                                            question.questao_nome
                                        ] || ""
                                    }
                                    onChange={(event) =>
                                        handleAnswerChange(
                                            question.questao_nome,
                                            event.target.value
                                        )
                                    }
                                >
                                    <FormControlLabel
                                        value="0"
                                        control={<Radio />}
                                        label="Odeio"
                                    />
                                    <FormControlLabel
                                        value="1"
                                        control={<Radio />}
                                        label="Não gosto"
                                    />
                                    <FormControlLabel
                                        value="2"
                                        control={<Radio />}
                                        label="Não tenho preferência"
                                    />
                                    <FormControlLabel
                                        value="3"
                                        control={<Radio />}
                                        label="Gosto"
                                    />
                                    <FormControlLabel
                                        value="4"
                                        control={<Radio />}
                                        label="Adoro"
                                    />
                                </RadioGroup>
                            </FormControl>
                        ))}
                </DialogContent>
            </>
        );
    };

    return (
        <React.Fragment>
            <Button variant="outlined" onClick={handleClickOpen}>
                Iniciar teste
            </Button>
            <Dialog
                open={open}
                onClose={handleClose}
                PaperProps={{
                    component: "form",
                    onSubmit: handleNext,
                }}
            >
                {renderDialogContent()}
                <DialogActions>
                    {/* <Button onClick={() => setStep((prevStep) => prevStep - 1)}>
                        Voltar
                    </Button> */}

                    <Button
                        type="submit"
                        disabled={!isAllAnswered() || !questoes}
                        onClick={() => {
                            if (questoes) {
                                riasecResult(personData.answers, questoes);
                            }
                        }}
                    >
                        {"Finalizar"}
                    </Button>
                </DialogActions>
            </Dialog>
        </React.Fragment>
    );
}
