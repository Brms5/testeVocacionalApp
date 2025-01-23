"use client";

import * as React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import MenuItem from "@mui/material/MenuItem";

interface personData {
    name: string;
    gender: string;
    age: string | number;
}

export default function MultiStepDialog() {
    const [open, setOpen] = React.useState(false);
    const [step, setStep] = React.useState(1);
    const [personData, setPersonData] = React.useState<personData>({
        name: "",
        gender: "",
        age: "",
    });

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
        setStep(1); // Reset to the first step
        setPersonData({ name: "", gender: "", age: "" }); // Clear form data
    };

    const handleNext = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const newFormData = new FormData(event.currentTarget);
        const updatedData = Object.fromEntries(newFormData.entries());

        setPersonData((prevData) => ({
            ...prevData,
            ...updatedData,
            age: updatedData.age ? Number(updatedData.age) : "", // Convert age to number
        }));

        if (step < 3) {
            setStep((prevStep) => prevStep + 1);
        } else {
            console.log("Final data:", {
                ...personData,
                age: updatedData.age ? Number(updatedData.age) : "",
            });
            handleClose();
        }
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
                            />
                        </DialogContent>
                    </>
                );
            case 2:
                return (
                    <>
                        <DialogTitle>Selecione o gênero</DialogTitle>
                        <DialogContent>
                            <DialogContentText>
                                Informe seu gênero.
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
                            >
                                <MenuItem value="male">Masculino</MenuItem>
                                <MenuItem value="female">Feminino</MenuItem>
                                <MenuItem value="other">Outro</MenuItem>
                            </TextField>
                        </DialogContent>
                    </>
                );
            case 3:
                return (
                    <>
                        <DialogTitle>Informe sua idade</DialogTitle>
                        <DialogContent>
                            <DialogContentText>
                                Por favor, informe sua idade.
                            </DialogContentText>
                            <TextField
                                autoFocus
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
                        {step === 3 ? "Finalizar" : "Avançar"}
                    </Button>
                </DialogActions>
            </Dialog>
        </React.Fragment>
    );
}
