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

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
        setStep(1);
        setPersonData({ name: "", gender: "", age: "", answers: {} });
    };

    const handleNext = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
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
            console.log("Final data:", personData);
            handleClose();
        }
    };

    const handleAnswerChange = (question: string, value: string) => {
        setPersonData((prevData) => ({
            ...prevData,
            answers: { ...prevData.answers, [question]: value },
        }));
    };

    const questions = [
        { id: "q1", text: "Prefere trabalhar em equipe ou sozinho?" },
        { id: "q2", text: "Gosta mais de exatas ou humanas?" },
        { id: "q3", text: "Prefere ambientes dinâmicos ou estruturados?" },
        { id: "q4", text: "Se sente mais confortável liderando ou seguindo?" },
        { id: "q5", text: "Gosta de resolver problemas técnicos?" },
    ];

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
                            {questions.map((question) => (
                                <FormControl
                                    key={question.id}
                                    component="fieldset"
                                    style={{ marginBottom: "1.5rem" }}
                                >
                                    <FormLabel component="legend">
                                        {question.text}
                                    </FormLabel>
                                    <RadioGroup
                                        name={question.id}
                                        value={
                                            personData.answers[question.id] ||
                                            ""
                                        }
                                        onChange={(event) =>
                                            handleAnswerChange(
                                                question.id,
                                                event.target.value
                                            )
                                        }
                                    >
                                        <FormControlLabel
                                            value="option1"
                                            control={<Radio />}
                                            label="Opção 1"
                                        />
                                        <FormControlLabel
                                            value="option2"
                                            control={<Radio />}
                                            label="Opção 2"
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
                    <Button type="submit">
                        {step === 2 ? "Finalizar" : "Avançar"}
                    </Button>
                </DialogActions>
            </Dialog>
        </React.Fragment>
    );
}
