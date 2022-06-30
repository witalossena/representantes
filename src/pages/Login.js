import React, { useState, useEffect} from "react";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";

import { useAuth } from "../hooks/useAuth";
import {Link } from "react-router-dom";

import Cookies from "js-cookie";

import AppLogo from "../components/appLogo";
export default function Login() {
  const {
    onLogin,  
    set_error,
    set_message,
  } = useAuth();

  const [password, set_password] = useState("");
  const [cpf_cnpj, set_cpf_cnpj] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    let cpf_cnpj = formData.get("CPFCNPJ");
    let password = formData.get("password");
    set_error(false);
    set_message("");

    if (cpf_cnpj) {
      Cookies.set("cpf_cnpj", cpf_cnpj);
    }

    if (password) {
      Cookies.set("password", password);
    }

    const res = await onLogin(cpf_cnpj, password);
  };

  useEffect(() => {
    let password_cookie = Cookies.get("password");
    let cpf_cnpj_cookie = Cookies.get("cpf_cnpj");

    if (password_cookie) {
      set_password(password_cookie);
    }

    if (cpf_cnpj_cookie) {
      set_cpf_cnpj(cpf_cnpj_cookie);
    }
  }, []);

  const handleChangeCPF_CNPJ = (event) => {
    set_cpf_cnpj(event.target.value);
  };

  const handleChangePass = (event) => {
    set_password(event.target.value);
  };

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <AppLogo />

        <Box component="form" onSubmit={handleSubmit} sx={{ mt: 12 }}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="email"
            label="CPF/CNPJ"
            name="CPFCNPJ"
            autoComplete="email"
            autoFocus
            value={cpf_cnpj}
            onChange={handleChangeCPF_CNPJ}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            label="Senha"
            type="password"
            id="password"
            autoComplete="current-password"
            value={password}
            onChange={handleChangePass}
          />

          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Entrar
          </Button>
          <Grid container>
            <Grid item xs={12} sx={{ textAlign: "center" }}>
              <Link to="forget">
                <Typography sx={{ fontSize: "12px" }}>
                  Esqueceu a senha?
                </Typography>
              </Link>
            </Grid>
            <Grid item xs={12} sx={{ textAlign: "center" }}>
              <Link to="registrar">
                <Typography sx={{ fontSize: "12px" }}>
                  Ainda não é representante? Cadastre Agora
                </Typography>
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Container>
  );
}
