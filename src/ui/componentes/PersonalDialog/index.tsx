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
import { resultadoRiasecService } from "@/client/services/ResultadoRiasec";

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

const categoryDescriptions: Record<RiasecCategory, string> = {
    Realista:
        "Você prefere trabalhar com coisas práticas e tem grande habilidade com tarefas que exigem organização e eficiência.",
    Investigativo:
        "Você gosta de resolver problemas complexos e busca aprender e explorar novas ideias de forma analítica.",
    Artístico:
        "Você tem uma forte capacidade criativa, com grande interesse por atividades artísticas e expressão pessoal.",
    Social: "Você sente prazer em ajudar os outros, sendo mais voltado para interações interpessoais e atividades colaborativas.",
    Empreendedor:
        "Você é focado em resultados, com uma grande capacidade para tomar riscos e liderar projetos.",
    Convencional:
        "Você é detalhista e gosta de seguir regras e processos, com uma forte orientação para o planejamento e organização.",
};

const categoryColors: Record<RiasecCategory, string> = {
    Realista: "#FF5733", // Exemplo de cor para Realista
    Investigativo: "#33FF57", // Exemplo de cor para Investigativo
    Artístico: "#5733FF", // Exemplo de cor para Artístico
    Social: "#FF33A6", // Exemplo de cor para Social
    Empreendedor: "#FFCC33", // Exemplo de cor para Empreendedor
    Convencional: "#33CCFF", // Exemplo de cor para Convencional
};

export default function MultiStepDialog() {
    const [open, setOpen] = React.useState(false);
    const [resultDialogOpen, setResultDialogOpen] = React.useState(false);
    const [personData, setPersonData] = React.useState<personData>({
        answers: {},
    });
    const [questoes, setQuestoes] = React.useState<Questao[]>();
    const [userResult, setUserResult] = React.useState<string>("");
    const [resultValues, setResultValues] = React.useState<
        Record<RiasecCategory, number>
    >({
        Realista: 0,
        Investigativo: 0,
        Artístico: 0,
        Social: 0,
        Empreendedor: 0,
        Convencional: 0,
    });

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
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
        setPersonData({ answers: {} });
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
    ): void => {
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

        setResultValues(result);

        const sortedResult = Object.entries(result).sort(
            ([, valueA], [, valueB]) => valueB - valueA
        );

        const strongestCategory = sortedResult.filter(
            ([, value]) => value === sortedResult[0][1]
        );

        setUserResult(
            strongestCategory.map(([category]) => category).join(", ")
        );
        setResultDialogOpen(true);
    };

    return (
        <React.Fragment>
            <Button variant="outlined" onClick={handleClickOpen}>
                Iniciar teste
            </Button>
            <Dialog
                open={open}
                onClose={handleClose}
                PaperProps={{ component: "form", onSubmit: handleNext }}
            >
                <DialogTitle>Teste vocacional</DialogTitle>
                <DialogContent>
                    {questoes?.map((question) => (
                        <FormControl
                            key={question.id}
                            component="fieldset"
                            fullWidth
                            style={{ marginBottom: "1.5rem" }}
                        >
                            <FormLabel>{question.questao_nome}</FormLabel>
                            <RadioGroup
                                name={question.id}
                                value={
                                    personData.answers[question.questao_nome] ||
                                    ""
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
                                    label="Indiferente"
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
                <DialogActions>
                    <Button
                        type="submit"
                        disabled={!isAllAnswered()}
                        onClick={() =>
                            questoes &&
                            riasecResult(personData.answers, questoes)
                        }
                    >
                        Finalizar
                    </Button>
                </DialogActions>
            </Dialog>

            <Dialog
                open={resultDialogOpen}
                onClose={() => setResultDialogOpen(false)}
            >
                <DialogTitle style={{ textAlign: "center" }}>
                    Resultado do Teste
                </DialogTitle>
                <DialogContent>
                    <div
                        style={{
                            display: "flex",
                            alignItems: "flex-end",
                            justifyContent: "space-evenly",
                            marginTop: "20px",
                        }}
                    >
                        {Object.entries(resultValues).map(
                            ([category, value]) => (
                                <div
                                    key={category}
                                    style={{
                                        marginBottom: "10px",
                                        textAlign: "center",
                                    }}
                                >
                                    {/* Barra vertical */}
                                    <div
                                        style={{
                                            width: "30px", // Largura das barras
                                            height: `${
                                                (value /
                                                    Math.max(
                                                        ...Object.values(
                                                            resultValues
                                                        )
                                                    )) *
                                                200
                                            }px`, // Altura proporcional ao valor
                                            backgroundColor:
                                                categoryColors[
                                                    category as RiasecCategory
                                                ], // Aplica a cor com base na categoria
                                            borderRadius: "5px",
                                            marginBottom: "5px",
                                        }}
                                    >
                                        {/* Exibindo o valor no topo da barra */}
                                        <span
                                            style={{
                                                position: "absolute",
                                                bottom: "100%",
                                                width: "100%",
                                                textAlign: "center",
                                                paddingBottom: "5px",
                                                color: "black",
                                            }}
                                        >
                                            {value}
                                        </span>
                                    </div>
                                    {/* Inicial da categoria abaixo da barra */}
                                    <span
                                        style={{
                                            display: "block",
                                            marginTop: "5px",
                                        }}
                                    >
                                        {category[0]}{" "}
                                        {/* Pegando apenas a primeira letra */}
                                    </span>
                                </div>
                            )
                        )}
                    </div>
                    <div style={{ textAlign: "center", marginTop: "20px" }}>
                        <p>Sua personalidade profissional:</p>
                        <strong>{userResult}</strong>{" "}
                        {/* Resultado abaixo do texto */}
                    </div>
                    <div
                        style={{
                            marginTop: "10px",
                            maxWidth: "200px",
                            marginLeft: "auto",
                            marginRight: "auto",
                            textAlign: "center",
                        }}
                    >
                        <p>
                            {categoryDescriptions[userResult as RiasecCategory]}
                        </p>
                    </div>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setResultDialogOpen(false)}>
                        Fechar
                    </Button>
                </DialogActions>
            </Dialog>
        </React.Fragment>
    );
}
