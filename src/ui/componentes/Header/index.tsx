"use client";

import React, { useContext, useEffect, useState } from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import MenuItem from "@mui/material/MenuItem";
import Link from "next/link";
import { GlobalContext } from "@/ui/context/GlobalContext";
import { jwtDecode } from "jwt-decode";

const pages = ["Página Principal", "Instituições", "INFORMAÇÕES DO DOMBA"];

function Header() {
    const { token, setToken } = useContext(GlobalContext);
    const [anchorElNav, setAnchorElNav] = useState<null | HTMLElement>(null);

    useEffect(() => {
        const savedToken = localStorage.getItem("token");
        setToken(savedToken);

        if (savedToken) {
            const decodedToken: any = jwtDecode(savedToken);
            const currentTime = Date.now() / 1000;
            if (decodedToken.exp < currentTime) {
                localStorage.removeItem("token");
            }
        }
    }, [token, setToken]);

    const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorElNav(event.currentTarget);
    };

    const handleCloseNavMenu = () => {
        setAnchorElNav(null);
    };

    const handleLoginButton = () => {
        if (token) {
            localStorage.removeItem("token");
            setToken(null);
        }
    };

    return (
        <AppBar position="static" elevation={0}> {/* Removendo o sombreado */}
            <Container>
                <Toolbar disableGutters>
                    <Typography
                        variant="h6"
                        component="a"
                        href="/"
                        sx={{
                            mr: 10,
                            display: { xs: "none", md: "flex" },
                            fontFamily: "monospace",
                            fontWeight: 700,
                            letterSpacing: ".3rem",
                            color: "inherit",
                            textDecoration: "none",
                        }}
                    >
                        DOMBA
                    </Typography>

                    <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
                        <IconButton
                            size="large"
                            aria-label="menu"
                            aria-controls="menu-appbar"
                            onClick={handleOpenNavMenu}
                            color="inherit"
                        >
                            <MenuIcon />
                        </IconButton>
                        <Menu
                            id="menu-appbar"
                            anchorEl={anchorElNav}
                            anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
                            transformOrigin={{ vertical: "top", horizontal: "center" }}
                            open={Boolean(anchorElNav)}
                            onClose={handleCloseNavMenu}
                        >
                            {pages.map((page) => (
                                <MenuItem key={page} onClick={handleCloseNavMenu}>
                                    <Link
                                        href={page === "Página Principal" ? "/" : page === "Instituições" ? "/instituicoes" : "/informacoes"}
                                        style={{ textDecoration: "none", width: "100%" }}
                                    >
                                        <Typography textAlign="center">{page}</Typography>
                                    </Link>
                                </MenuItem>
                            ))}
                        </Menu>
                    </Box>

                    <Typography
                        variant="h5"
                        component="a"
                        href="/"
                        sx={{
                            mr: 2,
                            display: { xs: "flex", md: "none" },
                            flexGrow: 1,
                            fontFamily: "monospace",
                            fontWeight: 700,
                            letterSpacing: ".3rem",
                            color: "inherit",
                            textDecoration: "none",
                        }}
                    >
                        DOMBA
                    </Typography>

                    <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" }, justifyContent: "center" }}>
                        {pages.map((page) => (
                            <Link
                                key={page}
                                href={page === "Página Principal" ? "/" : page === "Instituições" ? "/instituicoes" : "/informacoes"}
                                style={{ textDecoration: "none", margin: '0 20px' }} // Aumentei o espaçamento
                            >
                                <Button
                                    onClick={handleCloseNavMenu}
                                    sx={{
                                        my: 2,
                                        color: "white",
                                        fontWeight: 600, // Peso da fonte ajustado
                                        "&:hover": {
                                            color: "#172554", // Cor ao passar o mouse
                                        },
                                    }}
                                >
                                    {page}
                                </Button>
                            </Link>
                        ))}
                    </Box>

                    <Box sx={{ display: "flex", justifyContent: "center", width: "100px" }}>
                        <Link href="/login">
                            <Button
                                fullWidth
                                sx={{
                                    my: 2,
                                    color: "white",
                                    fontWeight: 600, // Peso da fonte ajustado
                                    "&:hover": {
                                        color: "#172554", // Cor ao passar o mouse
                                    },
                                }}
                                onClick={handleLoginButton}
                            >
                                {token ? "SAIR" : "ENTRAR"}
                            </Button>
                        </Link>
                    </Box>
                </Toolbar>
            </Container>
        </AppBar>
    );
}

export default Header;



