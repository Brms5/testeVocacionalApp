"use client";

import * as React from "react";
import Accordion from "@mui/material/Accordion";
import AccordionActions from "@mui/material/AccordionActions";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Button from "@mui/material/Button";
import BasicSelect from "@/ui/componentes/Select";
import TextField from "@mui/material/TextField";
import { useContext, useEffect, useMemo, useState } from "react";
import { instituicaoService } from "@/client/services/Instituicao";
import { modalidadeDeIngressoService } from "@/client/services/ModalidadeDeIngresso";
import { provaService } from "@/client/services/Prova";
import { GlobalContext } from "@/ui/context/GlobalContext";
import InputLabel from "@mui/material/InputLabel";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import { instituicaoTipoService } from "@/client/services/InstituicaoTipo";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import { useRouter } from "next/navigation";

// REFATORAR, CRIAR UM COMPONENTE PARA CADA ACCORDION

export default function Cadastro() {
    const {
        instituicaoSelecionada,
        setInstituicaoSelecionada,
        modalidadeSelecionada,
        setModalidadeSelecionada,
        provaSelecionada,
        setProvaSelecionada,
        token,
        setToken,
    } = useContext(GlobalContext);

    const [instituicaoLista, setInstituicaoLista] = useState<Instituicao[]>([]);
    const [modalidadeLista, setModalidadeLista] = useState<
        ModalidadeDeIngresso[]
    >([]);
    const [provaLista, setProvaLista] = useState<Prova[]>([]);
    const [instituicaoTipoLista, setInstituicaoTipoLista] = useState<
        InstituicaoTipo[]
    >([]);

    const [instituicao, setInstituicao] = useState<Instituicao>(
        {} as Instituicao
    );
    const [modalidade, setModalidade] = useState<ModalidadeDeIngresso>(
        {} as ModalidadeDeIngresso
    );
    const [prova, setProva] = useState<Prova>({} as Prova);

    const [novaInstituicao, setNovaInstituicao] =
        useState<InstituicaoCreateProps>({
            nome: "",
            informacao_geral: "",
            cidade: "",
            uf: "",
            website: "",
            imagem: "",
            instituicao_tipo_id: "",
            cursos: "",
        });

    const [novaModalidade, setNovaModalidade] =
        useState<ModalidadeDeIngressoCreateProps>({
            modalidade: "",
            data_inscricao_inicio: "",
            data_inscricao_final: "",
            data_isencao: "",
            valor: "",
            link: "",
            instituicao_id: "",
        });

    const [novaProva, setNovaProva] = useState<ProvaCreateProps>({
        nome: "",
        data_prova: "",
        modalidade_de_ingresso_id: "",
    });

    const [open, setOpen] = useState<boolean>(false);
    const [successResponse, setSuccessResponse] = useState<boolean>(false);

    const router = useRouter();

    useEffect(() => {
        if (!token) {
            router.push("/login");
        }
        instituicaoService.getInstituicao().then((instituicoes) => {
            setInstituicaoLista(instituicoes);
        });
        modalidadeDeIngressoService
            .getModalidadeDeIngresso()
            .then((modalidades) => {
                setModalidadeLista(modalidades);
            });
        provaService.getProva().then((provas) => {
            setProvaLista(provas);
        });
        instituicaoTipoService.getInstituicaoTipo().then((instituicaoTipos) => {
            setInstituicaoTipoLista(instituicaoTipos);
        });
    }, [instituicaoSelecionada, modalidadeSelecionada, provaSelecionada]);

    useMemo(() => {
        instituicaoLista.filter((instituicao) => {
            if (instituicao.id === instituicaoSelecionada) {
                setInstituicao(instituicao);
                // instituicaoTipoService.getInstituicaoTipoById(instituicao
                //   .instituicao_tipo_id).then((instituicaoTipo) => {
                //     setNovaInstituicao({
                //       ...novaInstituicao,
                //       instituicao_tipo_id: instituicaoTipo.id,
                //     });
                //   });
            }
        });
        modalidadeLista.filter((modalidade) => {
            if (modalidade.id === modalidadeSelecionada) {
                setModalidade(modalidade);
            }
        });
        provaLista.filter((prova) => {
            if (prova.id === provaSelecionada) {
                setProva(prova);
            }
        });
    }, [instituicaoSelecionada, modalidadeSelecionada, provaSelecionada]);

    const handleChangeInstituicao = (event: any) => {
        const { name, value } = event.target;

        if (instituicaoSelecionada === "Cadastro") {
            setNovaInstituicao({
                ...novaInstituicao,
                [name]: value,
            });
        } else {
            setInstituicao({
                ...instituicao,
                [name]: value,
            });
        }
    };

    const handleChangeModalidade = (event: any) => {
        const { name, value } = event.target;

        if (modalidadeSelecionada === "Cadastro") {
            setNovaModalidade({
                ...novaModalidade,
                [name]: value,
            });
        } else {
            setModalidade({
                ...modalidade,
                [name]: value,
            });
        }
    };

    const handleChangeProva = (event: any) => {
        const { name, value } = event.target;

        if (provaSelecionada === "Cadastro") {
            setNovaProva({
                ...novaProva,
                [name]: value,
            });
        } else {
            setProva({
                ...prova,
                [name]: value,
            });
        }
    };

    const handleSaveInstituicao = () => {
        if (instituicaoSelecionada === "Cadastro") {
            instituicaoService
                .saveInstituicao(novaInstituicao)
                .then((response) => {
                    setSuccessResponse(true);
                    setOpen(true);
                    setInstituicaoLista([...instituicaoLista, response]);
                    setInstituicaoSelecionada(response.id);
                    router.refresh();
                })
                .catch((error) => {
                    console.log("ERROR: ", error);
                    if (error.status === 401) {
                        setToken(null);
                    }
                    setSuccessResponse(false);
                    setOpen(true);
                });
        } else {
            instituicaoService
                .updateInstituicao(instituicao)
                .then((response) => {
                    setSuccessResponse(true);
                    setOpen(true);
                })
                .catch((error) => {
                    console.log("ERROR: ", error);
                    if (error.status === 401) {
                        setToken(null);
                    }
                    setSuccessResponse(false);
                    setOpen(true);
                });
        }
    };

    const handleRemoveInstituicao = () => {
        instituicaoService
            .deleteInstituicao(instituicao.nome)
            .then((response) => {
                setSuccessResponse(true);
                setOpen(true);
                setInstituicaoLista(
                    instituicaoLista.filter(
                        (item) => item.id !== instituicao.id
                    )
                );
                setInstituicaoSelecionada("Cadastro");
                setNovaInstituicao({
                    nome: "",
                    informacao_geral: "",
                    cidade: "",
                    uf: "",
                    website: "",
                    imagem: "",
                    instituicao_tipo_id: "",
                    cursos: "",
                });
                router.refresh();
            })
            .catch((error) => {
                console.log("ERROR: ", error);
                if (error.status === 401) {
                    setToken(null);
                }
                setSuccessResponse(false);
                setOpen(true);
            });
    };

    const handleSaveModalidade = () => {
        if (modalidadeSelecionada === "Cadastro") {
            // createModalidade();
            modalidadeDeIngressoService
                .saveModalidadeDeIngresso(novaModalidade)
                .then((response) => {
                    setSuccessResponse(true);
                    setOpen(true);
                    setModalidadeLista([...modalidadeLista, response]);
                    setModalidadeSelecionada(response.id);
                })
                .catch((error) => {
                    console.log("ERROR: ", error);
                    if (error.status === 401) {
                        setToken(null);
                    }
                    setSuccessResponse(false);
                    setOpen(true);
                });
        } else {
            modalidadeDeIngressoService
                .updateModalidadeDeIngresso(modalidade)
                .then((response) => {
                    setSuccessResponse(true);
                    setOpen(true);
                })
                .catch((error) => {
                    console.log("ERROR: ", error);
                    if (error.status === 401) {
                        setToken(null);
                    }
                    setSuccessResponse(false);
                    setOpen(true);
                });
        }
    };

    const handleRemoveModalidade = () => {
        modalidadeDeIngressoService
            .deleteModalidadeDeIngresso(modalidade.id)
            .then((response) => {
                setSuccessResponse(true);
                setOpen(true);
                setModalidadeLista(
                    modalidadeLista.filter((item) => item.id !== modalidade.id)
                );
                setModalidadeSelecionada("Cadastro");
                setNovaModalidade({
                    modalidade: "",
                    data_inscricao_inicio: "",
                    data_inscricao_final: "",
                    data_isencao: "",
                    valor: "",
                    link: "",
                    instituicao_id: "",
                });
            })
            .catch((error) => {
                console.log("ERROR: ", error);
                if (error.status === 401) {
                    setToken(null);
                }
                setSuccessResponse(false);
                setOpen(true);
            });
    };

    const handleSaveProva = () => {
        if (provaSelecionada === "Cadastro") {
            provaService
                .saveProva(novaProva)
                .then((response) => {
                    setSuccessResponse(true);
                    setOpen(true);
                    setProvaLista([...provaLista, response]);
                    setProvaSelecionada(response.id);
                })
                .catch((error) => {
                    console.log("ERROR: ", error);
                    if (error.status === 401) {
                        setToken(null);
                    }
                    setSuccessResponse(false);
                    setOpen(true);
                });
        } else {
            provaService
                .updateProva(prova)
                .then((response) => {
                    setSuccessResponse(true);
                    setOpen(true);
                })
                .catch((error) => {
                    console.log("ERROR: ", error);
                    if (error.status === 401) {
                        setToken(null);
                    }
                    setSuccessResponse(false);
                    setOpen(true);
                });
        }
    };

    const handleRemoveProva = () => {
        provaService
            .deleteProva(prova.id)
            .then((response) => {
                setSuccessResponse(true);
                setOpen(true);
                setProvaLista(
                    provaLista.filter((item) => item.id !== prova.id)
                );
                setProvaSelecionada("Cadastro");
                setNovaProva({
                    nome: "",
                    data_prova: "",
                    modalidade_de_ingresso_id: "",
                });
            })
            .catch((error) => {
                console.log("ERROR: ", error);
                if (error.status === 401) {
                    setToken(null);
                }
                setSuccessResponse(false);
                setOpen(true);
            });
    };

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <div className="md:flex sm:flex w-full h-15 justify-center align-middle mt-10 mb-10">
            <div className="md:flex-col sm:none w-full max-w-md h-15 justify-center mt-10">
                <Accordion defaultExpanded>
                    <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel1-content"
                        id="panel1-header"
                    >
                        Instituição
                    </AccordionSummary>
                    <AccordionDetails>
                        Cadastre ou edite uma nova instituição para que os
                        alunos possam conhece-la. Para cadastrar, escolha a
                        opção Cadastro. Para editar, escolha a Instituição.
                    </AccordionDetails>
                    <BasicSelect
                        label={"Instituição"}
                        entidadeProps={instituicaoLista}
                    />
                    <TextField
                        id="outlined-basic"
                        label="Nome"
                        name="nome"
                        variant="outlined"
                        fullWidth
                        value={
                            instituicaoSelecionada === "Cadastro"
                                ? novaInstituicao.nome
                                : instituicao.nome
                        }
                        onChange={handleChangeInstituicao}
                        type="text"
                        margin="dense"
                    />
                    <TextField
                        id="outlined-basic"
                        label="Informação Geral"
                        name="informacao_geral"
                        variant="outlined"
                        fullWidth
                        value={
                            instituicaoSelecionada === "Cadastro"
                                ? novaInstituicao.informacao_geral
                                : instituicao.informacao_geral
                        }
                        onChange={handleChangeInstituicao}
                        margin="dense"
                    />
                    <TextField
                        id="outlined-basic"
                        label="Cidade"
                        name="cidade"
                        variant="outlined"
                        fullWidth
                        value={
                            instituicaoSelecionada === "Cadastro"
                                ? novaInstituicao.cidade
                                : instituicao.cidade
                        }
                        onChange={handleChangeInstituicao}
                        margin="dense"
                    />
                    <TextField
                        id="outlined-basic"
                        label="UF"
                        name="uf"
                        variant="outlined"
                        fullWidth
                        value={
                            instituicaoSelecionada === "Cadastro"
                                ? novaInstituicao.uf
                                : instituicao.uf
                        }
                        onChange={handleChangeInstituicao}
                        margin="dense"
                    />
                    <TextField
                        id="outlined-basic"
                        label="Website"
                        name="website"
                        variant="outlined"
                        fullWidth
                        value={
                            instituicaoSelecionada === "Cadastro"
                                ? novaInstituicao.website
                                : instituicao.website
                        }
                        onChange={handleChangeInstituicao}
                        margin="dense"
                    />
                    <TextField
                        id="outlined-basic"
                        label="Imagem"
                        name="imagem"
                        variant="outlined"
                        fullWidth
                        value={
                            instituicaoSelecionada === "Cadastro"
                                ? novaInstituicao.imagem
                                : instituicao.imagem
                        }
                        onChange={handleChangeInstituicao}
                        margin="dense"
                    />
                    {/* <TextField
            id="outlined-basic"
            label="Tipo da Instituição"
            name="instituicao_tipo_id"
            variant="outlined"
            fullWidth
            value={instituicaoSelecionada === "Cadastro" ? novaInstituicao.instituicao_tipo_id : instituicao.instituicao_tipo_id}
            onChange={handleChangeInstituicao}
            disabled={instituicaoSelecionada === "Cadastro" ? false : true}
          /> */}
                    <InputLabel id="demo-simple-select-label">
                        Instituição Tipo
                    </InputLabel>
                    <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={
                            instituicaoSelecionada === "Cadastro"
                                ? novaInstituicao.instituicao_tipo_id
                                : instituicao.instituicao_tipo_id
                        }
                        label="Instituição Tipo"
                        name="instituicao_tipo_id"
                        onChange={handleChangeInstituicao}
                        margin="dense"
                        fullWidth
                    >
                        {instituicaoTipoLista.map((instituicaoTipo) => (
                            <MenuItem
                                key={instituicaoTipo.id}
                                value={instituicaoTipo.id}
                            >
                                {instituicaoTipo.nome}
                            </MenuItem>
                        ))}
                    </Select>
                    <TextField
                        id="outlined-basic"
                        label="Cursos"
                        name="cursos"
                        variant="outlined"
                        fullWidth
                        value={
                            instituicaoSelecionada === "Cadastro"
                                ? novaInstituicao.cursos
                                : instituicao.cursos
                        }
                        onChange={handleChangeInstituicao}
                        margin="dense"
                    />
                    <AccordionActions>
                        {instituicaoSelecionada === "Cadastro" ? (
                            <></>
                        ) : (
                            <Button onClick={() => handleRemoveInstituicao()}>
                                Excluir
                            </Button>
                        )}
                        <Button onClick={() => handleSaveInstituicao()}>
                            {instituicaoSelecionada === "Cadastro"
                                ? "Cadastrar"
                                : "Alterar"}
                        </Button>
                    </AccordionActions>
                </Accordion>

                <Accordion>
                    <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel2-content"
                        id="panel2-header"
                    >
                        Modalidade de ingresso
                    </AccordionSummary>
                    <AccordionDetails>
                        Cadastre ou edite uma nova modalidade de ingresso
                        correspondente a uma instituição. Para cadastrar,
                        escolha a opção Cadastro. Para editar, escolha a
                        Modalidade de ingresso.
                    </AccordionDetails>
                    <BasicSelect
                        label={"Modalidade de ingresso"}
                        entidadeProps={modalidadeLista}
                    />
                    <TextField
                        id="outlined-basic"
                        label="Modalidade"
                        name="modalidade"
                        variant="outlined"
                        fullWidth
                        value={
                            modalidadeSelecionada === "Cadastro"
                                ? novaModalidade.modalidade
                                : modalidade.modalidade
                        }
                        onChange={handleChangeModalidade}
                        margin="dense"
                    />
                    <TextField
                        id="outlined-basic"
                        name="data_inscricao_inicio"
                        label="Data de início da inscrição"
                        variant="outlined"
                        fullWidth
                        value={
                            modalidadeSelecionada === "Cadastro"
                                ? novaModalidade.data_inscricao_inicio
                                : modalidade?.data_inscricao_inicio
                        }
                        onChange={handleChangeModalidade}
                        margin="dense"
                    />
                    <TextField
                        id="outlined-basic"
                        name="data_inscricao_final"
                        label="Data de fim da inscrição"
                        variant="outlined"
                        fullWidth
                        value={
                            modalidadeSelecionada === "Cadastro"
                                ? novaModalidade.data_inscricao_final
                                : modalidade?.data_inscricao_final
                        }
                        onChange={handleChangeModalidade}
                        margin="dense"
                    />
                    <TextField
                        id="outlined-basic"
                        name="data_isencao"
                        label="Período de isenção"
                        variant="outlined"
                        fullWidth
                        value={
                            modalidadeSelecionada === "Cadastro"
                                ? novaModalidade.data_isencao
                                : modalidade?.data_isencao
                        }
                        onChange={handleChangeModalidade}
                        margin="dense"
                    />
                    <TextField
                        id="outlined-basic"
                        name="valor"
                        label="Valor da inscrição"
                        variant="outlined"
                        fullWidth
                        value={
                            modalidadeSelecionada === "Cadastro"
                                ? novaModalidade.valor
                                : modalidade?.valor
                        }
                        onChange={handleChangeModalidade}
                        margin="dense"
                    />
                    <TextField
                        id="outlined-basic"
                        name="link"
                        label="Link do edital"
                        variant="outlined"
                        fullWidth
                        value={
                            modalidadeSelecionada === "Cadastro"
                                ? novaModalidade.link
                                : modalidade?.link
                        }
                        onChange={handleChangeModalidade}
                        margin="dense"
                    />
                    {/* <TextField
            id="outlined-basic"
            name="instituicao_id"
            label="Instiuição de ingresso"
            variant="outlined"
            fullWidth
            value={modalidadeSelecionada === "Cadastro" ? novaModalidade.instituicao_id : modalidade?.instituicao_id}
            onChange={handleChangeModalidade}
          /> */}
                    <InputLabel id="demo-simple-select-label">
                        Instituição de ingresso
                    </InputLabel>
                    <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={
                            modalidadeSelecionada === "Cadastro"
                                ? novaModalidade.instituicao_id
                                : modalidade?.instituicao_id
                        }
                        label="Instituição de ingresso"
                        name="instituicao_id"
                        onChange={handleChangeModalidade}
                        margin="dense"
                        fullWidth
                    >
                        {instituicaoLista.map((instituicaoTipo) => (
                            <MenuItem
                                key={instituicaoTipo.id}
                                value={instituicaoTipo.id}
                            >
                                {instituicaoTipo.nome}
                            </MenuItem>
                        ))}
                    </Select>
                    <AccordionActions>
                        {modalidadeSelecionada === "Cadastro" ? (
                            <></>
                        ) : (
                            <Button onClick={() => handleRemoveModalidade()}>
                                Excluir
                            </Button>
                        )}
                        <Button onClick={() => handleSaveModalidade()}>
                            {modalidadeSelecionada === "Cadastro"
                                ? "Cadastrar"
                                : "Alterar"}
                        </Button>
                    </AccordionActions>
                </Accordion>

                <Accordion>
                    <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel3-content"
                        id="panel3-header"
                    >
                        Prova
                    </AccordionSummary>
                    <AccordionDetails>
                        Cadastre ou edite uma nova prova correspondente a uma
                        modalidade de ingresso. Para cadastrar, escolha a opção
                        Cadastro. Para editar, escolha a Prova.
                    </AccordionDetails>
                    <BasicSelect label={"Prova"} entidadeProps={provaLista} />
                    <TextField
                        id="outlined-basic"
                        name="nome"
                        label="Nome"
                        variant="outlined"
                        fullWidth
                        onChange={handleChangeProva}
                        margin="dense"
                        value={
                            provaSelecionada === "Cadastro"
                                ? novaProva.nome
                                : prova?.nome
                        }
                    />
                    <TextField
                        id="outlined-basic"
                        name="data_prova"
                        label="Data da prova"
                        variant="outlined"
                        fullWidth
                        onChange={handleChangeProva}
                        margin="dense"
                        value={
                            provaSelecionada === "Cadastro"
                                ? novaProva.data_prova
                                : prova?.data_prova
                        }
                    />
                    {/* <TextField
            id="outlined-basic"
            name="modalidade_de_ingresso_id"
            label="Modalidade de ingresso"
            variant="outlined"
            fullWidth
            onChange={handleChangeProva}
            value={provaSelecionada === "Cadastro" ? novaProva.modalidade_de_ingresso_id : prova?.modalidade_de_ingresso_id}
          /> */}
                    <InputLabel id="demo-simple-select-label">
                        Modalidade de ingresso
                    </InputLabel>
                    <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={
                            provaSelecionada === "Cadastro"
                                ? novaProva.modalidade_de_ingresso_id
                                : prova?.modalidade_de_ingresso_id
                        }
                        label="Modalidade de ingresso"
                        name="modalidade_de_ingresso_id"
                        onChange={handleChangeProva}
                        margin="dense"
                        fullWidth
                    >
                        {modalidadeLista.map((modalidade) => (
                            <MenuItem key={modalidade.id} value={modalidade.id}>
                                {modalidade.modalidade}
                            </MenuItem>
                        ))}
                    </Select>
                    <AccordionActions>
                        {provaSelecionada === "Cadastro" ? (
                            <></>
                        ) : (
                            <Button onClick={() => handleRemoveProva()}>
                                Excluir
                            </Button>
                        )}
                        <Button onClick={() => handleSaveProva()}>
                            {provaSelecionada === "Cadastro"
                                ? "Cadastrar"
                                : "Alterar"}
                        </Button>
                    </AccordionActions>
                </Accordion>
            </div>

            <Snackbar
                open={open}
                autoHideDuration={2500}
                onClose={handleClose}
                anchorOrigin={{ vertical: "top", horizontal: "center" }}
            >
                <Alert
                    onClose={handleClose}
                    severity={successResponse ? "success" : "error"}
                    variant="filled"
                    sx={{ width: "100%" }}
                >
                    {successResponse
                        ? "Ação realizada com sucesso!"
                        : "Erro ao realizar ação!"}
                </Alert>
            </Snackbar>
        </div>
    );
}
