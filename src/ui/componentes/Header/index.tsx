"use client";

import React, { useContext, useEffect } from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { GlobalContext } from "@/ui/context/GlobalContext";
import { jwtDecode } from "jwt-decode";

function Header() {
    const { token, setToken } = useContext(GlobalContext);

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

    return (
        <AppBar position="static" elevation={0}>
            {" "}
            {/* Removendo o sombreado */}
            <Container>
                <Toolbar disableGutters>
                    <Typography
                        variant="h4"
                        component="a"
                        href="/"
                        sx={{
                            // mr: 10,
                            display: { xs: "none", md: "flex" },
                            fontFamily: "monospace",
                            fontWeight: 700,
                            letterSpacing: ".2rem",
                            color: "inherit",
                            textDecoration: "none",
                        }}
                    >
                        TESTE VOCACIONAL
                    </Typography>

                    <Typography
                        variant="h5"
                        component="a"
                        href="/"
                        sx={{
                            // mr: 2,
                            display: { xs: "flex", md: "none" },
                            flexGrow: 1,
                            fontFamily: "monospace",
                            fontWeight: 700,
                            letterSpacing: ".2rem",
                            color: "inherit",
                            textDecoration: "none",
                        }}
                    >
                        TESTE VOCACIONAL
                    </Typography>
                </Toolbar>
            </Container>
        </AppBar>
    );
}

export default Header;
