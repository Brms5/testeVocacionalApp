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
    Popover,
    Typography,
    Divider,
    Chip,
    Box,
    List,
    ListItem,
    ListItemText,
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

const categoryProfessions: Record<
    RiasecCategory,
    { professions: string[]; relatedPathways: string[] }
> = {
    Realista: {
        professions: [
            "Agricultura",
            "Assistente de Saúde",
            "Computação",
            "Construção",
            "Mecânico/Maquinista",
            "Engenharia",
            "Alimentação e Hospitalidade",
        ],
        relatedPathways: [
            "Recursos Naturais",
            "Serviços de Saúde",
            "Tecnologia Industrial e de Engenharia",
            "Artes e Comunicação",
        ],
    },
    Investigativo: {
        professions: [
            "Biologia Marinha",
            "Engenharia",
            "Química",
            "Zoologia",
            "Medicina/Cirurgia",
            "Economia do Consumidor",
            "Psicologia",
        ],
        relatedPathways: [
            "Serviços de Saúde",
            "Negócios",
            "Serviços Públicos e Humanos",
            "Tecnologia Industrial e de Engenharia",
        ],
    },
    Artístico: {
        professions: [
            "Comunicações",
            "Cosmetologia",
            "Artes Cênicas e de Performance",
            "Fotografia",
            "Rádio e TV",
            "Design de Interiores",
            "Arquitetura",
        ],
        relatedPathways: ["Serviços Públicos e Humanos", "Artes e Comunicação"],
    },
    Social: {
        professions: [
            "Aconselhamento",
            "Enfermagem",
            "Fisioterapia",
            "Turismo",
            "Publicidade",
            "Relações Públicas",
            "Educação",
        ],
        relatedPathways: ["Serviços de Saúde", "Serviços Públicos e Humanos"],
    },
    Empreendedor: {
        professions: [
            "Merchandising de Moda",
            "Imobiliário",
            "Marketing/Vendas",
            "Direito",
            "Ciência Política",
            "Comércio Internacional",
            "Bancos/Finanças",
        ],
        relatedPathways: [
            "Negócios",
            "Serviços Públicos e Humanos",
            "Artes e Comunicação",
        ],
    },
    Convencional: {
        professions: [
            "Contabilidade",
            "Relatórios Judiciais",
            "Seguros",
            "Administração",
            "Registros Médicos",
            "Bancos",
        ],
        relatedPathways: [
            "Serviços de Saúde",
            "Negócios",
            "Tecnologia Industrial e de Engenharia",
        ],
    },
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

    // Estados para controlar o popover de descrição da categoria
    const [anchorEl, setAnchorEl] = React.useState<HTMLElement | null>(null);
    const [popoverContent, setPopoverContent] = React.useState<{
        description: string;
        professions: string[];
        pathways: string[];
    }>({
        description: "",
        professions: [],
        pathways: [],
    });
    const [popoverTitle, setPopoverTitle] = React.useState<string>("");

    // Estado para controlar qual categoria está expandida na seção de profissões
    const [expandedCategory, setExpandedCategory] = React.useState<
        string | null
    >(null);

    // Função para abrir o popover ao clicar na barra
    const handleBarClick = (
        event: React.MouseEvent<HTMLDivElement>,
        category: RiasecCategory
    ) => {
        setAnchorEl(event.currentTarget);
        setPopoverTitle(category);
        setPopoverContent({
            description: categoryDescriptions[category],
            professions: categoryProfessions[category].professions,
            pathways: categoryProfessions[category].relatedPathways,
        });
    };

    // Função para fechar o popover
    const handlePopoverClose = () => {
        setAnchorEl(null);
    };

    // Função para alternar a expansão de uma categoria
    const handleCategoryToggle = (category: string) => {
        setExpandedCategory(expandedCategory === category ? null : category);
    };

    // Verifica se o popover está aberto
    const open_popover = Boolean(anchorEl);
    const popover_id = open_popover ? "category-popover" : undefined;

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

        // Define a primeira categoria como expandida por padrão
        if (strongestCategory.length > 0) {
            setExpandedCategory(strongestCategory[0][0]);
        }
    };

    // Função para renderizar as descrições de todas as categorias empatadas
    const renderCategoryDescriptions = () => {
        if (!userResult) return null;

        // Divide a string de resultado em categorias individuais
        const categories = userResult.split(", ");

        return (
            <>
                {categories.map((category, index) => (
                    <div key={index} style={{ marginBottom: "15px" }}>
                        <strong>{category}:</strong>
                        <p>
                            {categoryDescriptions[category as RiasecCategory]}
                        </p>
                    </div>
                ))}
            </>
        );
    };

    // Função para renderizar as profissões e caminhos relacionados às categorias com maior pontuação
    const renderCategoryProfessions = () => {
        if (!userResult) return null;

        // Divide a string de resultado em categorias individuais
        const categories = userResult.split(", ");

        return (
            <>
                {categories.map((category, index) => (
                    <div
                        key={index}
                        style={{
                            marginBottom: "20px",
                            border: "1px solid #e0e0e0",
                            borderRadius: "8px",
                            overflow: "hidden",
                        }}
                    >
                        {/* Cabeçalho da categoria (substitui AccordionSummary) */}
                        <div
                            onClick={() => handleCategoryToggle(category)}
                            style={{
                                padding: "10px 15px",
                                backgroundColor:
                                    categoryColors[category as RiasecCategory] +
                                    "33",
                                cursor: "pointer",
                                display: "flex",
                                justifyContent: "space-between",
                                alignItems: "center",
                            }}
                        >
                            <Typography variant="h6">{category}</Typography>
                            <span>
                                {expandedCategory === category ? "▲" : "▼"}
                            </span>
                        </div>

                        {/* Conteúdo da categoria (substitui AccordionDetails) */}
                        {expandedCategory === category && (
                            <div style={{ padding: "15px" }}>
                                <Box sx={{ mb: 2 }}>
                                    <Typography
                                        variant="subtitle1"
                                        fontWeight="bold"
                                    >
                                        Profissões relacionadas:
                                    </Typography>
                                    <Box
                                        sx={{
                                            display: "flex",
                                            flexWrap: "wrap",
                                            gap: 1,
                                            mt: 1,
                                        }}
                                    >
                                        {categoryProfessions[
                                            category as RiasecCategory
                                        ].professions.map((profession, i) => (
                                            <Chip
                                                key={i}
                                                label={profession}
                                                variant="outlined"
                                                style={{
                                                    borderColor:
                                                        categoryColors[
                                                            category as RiasecCategory
                                                        ],
                                                    margin: "4px",
                                                }}
                                            />
                                        ))}
                                    </Box>
                                </Box>
                                <Box>
                                    <Typography
                                        variant="subtitle1"
                                        fontWeight="bold"
                                    >
                                        Caminhos relacionados:
                                    </Typography>
                                    <List dense>
                                        {categoryProfessions[
                                            category as RiasecCategory
                                        ].relatedPathways.map((pathway, i) => (
                                            <ListItem key={i}>
                                                <ListItemText
                                                    primary={pathway}
                                                />
                                            </ListItem>
                                        ))}
                                    </List>
                                </Box>
                            </div>
                        )}
                    </div>
                ))}
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
                maxWidth="md"
                fullWidth
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
                            marginBottom: "30px",
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
                                    {/* Barra vertical clicável */}
                                    <div
                                        onClick={(e) =>
                                            handleBarClick(
                                                e,
                                                category as RiasecCategory
                                            )
                                        }
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
                                            cursor: "pointer", // Adiciona cursor de ponteiro para indicar que é clicável
                                            transition: "transform 0.2s", // Adiciona transição suave
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

                    <Divider sx={{ my: 2 }} />

                    <div
                        style={{
                            textAlign: "center",
                            marginTop: "20px",
                            marginBottom: "20px",
                        }}
                    >
                        <Typography variant="h6">
                            Sua personalidade profissional:
                        </Typography>
                        <Typography
                            variant="h5"
                            fontWeight="bold"
                            color="primary"
                        >
                            {userResult}
                        </Typography>
                    </div>

                    <div
                        style={{
                            marginTop: "10px",
                            maxWidth: "800px",
                            marginLeft: "auto",
                            marginRight: "auto",
                        }}
                    >
                        {renderCategoryDescriptions()}
                    </div>

                    <Divider sx={{ my: 3 }} />

                    <Typography variant="h6" align="center" gutterBottom>
                        Profissões e Caminhos Recomendados
                    </Typography>

                    <Box sx={{ mt: 2 }}>{renderCategoryProfessions()}</Box>

                    {/* Popover para exibir a descrição da categoria ao clicar na barra */}
                    <Popover
                        id={popover_id}
                        open={open_popover}
                        anchorEl={anchorEl}
                        onClose={handlePopoverClose}
                        anchorOrigin={{
                            vertical: "bottom",
                            horizontal: "center",
                        }}
                        transformOrigin={{
                            vertical: "top",
                            horizontal: "center",
                        }}
                    >
                        <Box sx={{ p: 3, maxWidth: "350px" }}>
                            <Typography
                                variant="h6"
                                sx={{ mb: 1, color: "primary.main" }}
                            >
                                {popoverTitle}
                            </Typography>

                            <Typography variant="body2" paragraph>
                                {popoverContent.description}
                            </Typography>

                            <Divider sx={{ my: 1.5 }} />

                            <Typography variant="subtitle2" fontWeight="bold">
                                Profissões relacionadas:
                            </Typography>

                            <Box
                                sx={{
                                    display: "flex",
                                    flexWrap: "wrap",
                                    gap: 0.5,
                                    mt: 1,
                                    mb: 1.5,
                                }}
                            >
                                {popoverContent.professions.map(
                                    (profession, index) => (
                                        <Chip
                                            key={index}
                                            label={profession}
                                            size="small"
                                            variant="outlined"
                                            style={{ margin: "2px" }}
                                        />
                                    )
                                )}
                            </Box>

                            <Typography variant="subtitle2" fontWeight="bold">
                                Caminhos relacionados:
                            </Typography>

                            <List dense sx={{ mt: 0.5 }}>
                                {popoverContent.pathways.map(
                                    (pathway, index) => (
                                        <ListItem key={index} sx={{ py: 0 }}>
                                            <ListItemText primary={pathway} />
                                        </ListItem>
                                    )
                                )}
                            </List>
                        </Box>
                    </Popover>
                    {/* Descrição e acesso do Painel Tableau */}
                    <div className="text-center mt-5 mb-4">
                        <h2 className="text-2xl font-semibold mb-2">
                            Exploração de Carreiras
                        </h2>
                        <p className="text-base mb-4">
                            Você já conhece seu perfil — agora mergulhe nas
                            profissões que combinam com ele.
                        </p>
                        <p className="text-base mb-4">
                            Acesse o painel interativo e veja detalhes,
                            possibilidades e caminhos para sua jornada
                            profissional.
                        </p>
                        <a
                            href="https://public.tableau.com/app/profile/welinton.passos/viz/Profisses-RIASEC/PginaPrincipal"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg transition"
                        >
                            Acessar Painel
                        </a>
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
