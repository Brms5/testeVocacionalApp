"use client";

import * as React from "react";
import {
    Button,
    TextField,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    MenuItem,
    Radio,
    RadioGroup,
    FormControlLabel,
    FormControl,
    FormLabel,
} from "@mui/material";
import { questaoService } from "@/client/services/Questao";
import { useEffect } from "react";

interface personData {
    name: string;
    gender: string;
    age: string | number;
    answers: { [key: string]: string };
}

export default function MultiStepDialog() {
    const [open, setOpen] = React.useState(false);
    const [step, setStep] = React.useState(1);
    const [personData, setPersonData] = React.useState<personData>({
        name: "",
        gender: "",
        age: "",
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
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
        setStep(1);
        setPersonData({ name: "", gender: "", age: "", answers: {} });
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

        if (step < 2) {
            setStep((prevStep) => prevStep + 1);
        } else {
            handleClose();
        }
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

    const renderDialogContent = () => {
        switch (step) {
            case 1:
                return (
                    <>
                        <DialogTitle>Informações do usuário</DialogTitle>
                        <DialogContent>
                            <DialogContentText>
                                Para iniciar o teste, por favor, informe seu
                                nome.
                            </DialogContentText>
                            <TextField
                                autoFocus
                                required
                                margin="dense"
                                id="name"
                                name="name"
                                label="Nome completo"
                                type="text"
                                fullWidth
                                variant="standard"
                                defaultValue={personData.name}
                                style={{ marginBottom: "2rem" }}
                            />
                            <DialogContentText>
                                Agora informe seu gênero.
                            </DialogContentText>
                            <TextField
                                select
                                required
                                margin="dense"
                                id="gender"
                                name="gender"
                                label="Gênero"
                                fullWidth
                                variant="standard"
                                defaultValue={personData.gender}
                                style={{ marginBottom: "2rem" }}
                            >
                                <MenuItem value="male">Masculino</MenuItem>
                                <MenuItem value="female">Feminino</MenuItem>
                                <MenuItem value="other">Outro</MenuItem>
                            </TextField>
                            <DialogContentText>
                                E, por fim, informe sua idade.
                            </DialogContentText>
                            <TextField
                                required
                                margin="dense"
                                id="age"
                                name="age"
                                label="Idade"
                                type="number"
                                fullWidth
                                variant="standard"
                                defaultValue={personData.age}
                            />
                        </DialogContent>
                    </>
                );
            case 2:
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
                                            style={{ width: "100%" }} // Garante que cada grupo fique em uma linha
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
            default:
                return null;
        }
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
                    {step > 1 && (
                        <Button
                            onClick={() => setStep((prevStep) => prevStep - 1)}
                        >
                            Voltar
                        </Button>
                    )}
                    <Button
                        type="submit"
                        disabled={step === 2 && !isAllAnswered()}
                    >
                        {step === 2 ? "Finalizar" : "Avançar"}
                    </Button>
                </DialogActions>
            </Dialog>
        </React.Fragment>
    );
}
