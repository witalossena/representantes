import React from "react";

import { useState, useEffect } from "react";

import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import axios from "axios";
import { cpf, cnpj } from "cpf-cnpj-validator";
import FormHelperText from "@mui/material/FormHelperText";
import api from "../services/api";
import PhotoCamera from "@mui/icons-material/PhotoCamera";
import { styled } from "@mui/material/styles";
import MenuAppBar from "../components/appbar";
import AppLogo from "../components/appLogo";
import AppAlert from "../components/appAlert";
import { Navigate, useNavigate } from "react-router-dom";

// import {decode as base64_decode, encode as base64_encode} from 'base-64'

const Input = styled("input")({
  display: "none",
});

export default function Register() {
  const [cpf_cnpj, set_cpfCnpj] = useState("");
  const [cep, set_cep] = useState("");
  const [razao, set_razao] = useState("");
  const [numero, set_numero] = useState("");
  const [endereco, set_endereco] = useState("");
  const [cidade, set_cidade] = useState("");
  const [estado, set_estado] = useState("");
  const [complemento, set_complemento] = useState("");
  const [btnDisabled, set_btn_disabled] = useState(false);
  const [Bairro, set_Bairro] = useState("");

  const [selectedImage, setSelectedImage] = useState(null);

  const sleep = (milliseconds) => {
    return new Promise((resolve) => setTimeout(resolve, milliseconds));
  };

  const navigate = useNavigate();

  const clean = () => {
    set_cpfCnpj("");
    set_cep("");
    set_razao("");
    set_numero("");
    set_endereco("");
    set_cidade("");
    set_estado("");
    set_complemento("");
    set_Bairro("");
    set_btn_disabled(false);
    set_Bairro("")
    setSelectedImage(null)
    
    
  };

  const [error, set_error] = useState("");
  const [alertInfo, set_alertInfo] = useState({
    message: "",
    error: false,
    open: false,
  });

  const handleImageUpload = async (CNPJ_CPF, email) => {
    const formData = new FormData();

    formData.append("data", selectedImage);
    formData.append("CNPJ_CPF", CNPJ_CPF);
    formData.append("email", email);

    axios.post(
      "http://localhost:5000/api/representante/FileUpload/",
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);

    let data = {
      CNPJCPF: formData.get("CNPJ_CPF"),
      RazaoSocial: formData.get("razaosocial"),
      CEP: formData.get("cep"),
      Numero: formData.get("numero"),
      Endereco: formData.get("endereco"),
      Bairro: formData.get("Bairro"),
      Complemento: formData.get("complemento"),
      Cidade: formData.get("cidade"),
      EstadoUF: formData.get("estado"),
      Nome: formData.get("nome"),
      RG: formData.get("rg"),
      CPF: formData.get("cpf"),
      Telefone: formData.get("telefone"),
      Email: formData.get("email"),
      Senha: formData.get("Senha"),
    };

    const res = await api.post("new/representante", data);

    if (res.data) {
      handleImageUpload(formData.get("CNPJ_CPF"), formData.get("email"));
    }

    if (res.data) {
      set_alertInfo({
        open: true,
      });

      clean();
      await sleep(3000);
      navigate("/dashboard");
    }

    console.log(res.data);
  };

  const handleChangeCPF_CNPJ = (event) => {
    set_cpfCnpj(event.target.value);
  };

  const handleChangeRazao = (event) => {
    set_razao(event.target.value);
  };

  const handleChangeCep = (event) => {
    set_cep(event.target.value);
  };

  const handleChangeEndereco = (event) => {
    set_endereco(event.target.value);
  };

  const handleChangeCidade = (event) => {
    set_cidade(event.target.value);
  };

  const handleChangeNumero = (event) => {
    set_numero(event.target.value);
  };

  const handleChangeEstado = (event) => {
    set_estado(event.target.value);
  };

  const handleChangeComplemento = (event) => {
    set_complemento(event.target.value);
  };

  const handleChangeBairro = (event) => {
    set_Bairro(event.target.value);
  };

  useEffect(() => {
    let cep_formatado = cep.trim();

    if (cep.includes("-")) {
      cep_formatado = cep.replace("-", "");
    }
    if (cep.includes(".")) {
      cep_formatado = cep.replace(".", "");
    }

    if (cep_formatado.length >= 8) {
      axios
        .get(`https://viacep.com.br/ws/${cep_formatado}/json/`)
        .then((retorno) => {
          if (retorno.data.cep) {
            console.log(retorno.data);
            set_endereco(`${retorno.data.logradouro}, ${retorno.data.bairro}`);
            set_cidade(retorno.data.localidade);
            set_estado(retorno.data.uf);
            set_complemento(retorno.data.complemento);
            set_Bairro(retorno.data.bairro);
          }

          if (!retorno.data.cep) {
            alert("CEP INCORRETO OU NÃO ENCONTRADO");
          }
        })
        .catch((err) => console.log(err));
    }
  }, [cep]);

  useEffect(() => {
    if (cpf_cnpj) {
      if (!(cpf.isValid(cpf_cnpj) || cnpj.isValid(cpf_cnpj))) {
        set_error("error");
        set_btn_disabled(true);
      } else {
        set_error("");
        set_btn_disabled(false);
      }
    } else {
      set_error("");
      set_btn_disabled(false);
    }
  }, [cpf_cnpj]);

  return (
    <>
      <AppAlert data={alertInfo} />
      <MenuAppBar />

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

          <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={12}>
                <TextField
                  autoComplete="given-name"
                  name="CNPJ_CPF"
                  required
                  fullWidth
                  id="CNPJ_CPF"
                  label="CNPJ/CPF"
                  autoFocus
                  color={error}
                  value={cpf_cnpj}
                  onChange={handleChangeCPF_CNPJ}
                  aria-describedby="component-helper-text"
                />
                {error ? (
                  <FormHelperText id="component-error-text">
                    CPF OU CNPJ INCORRETO
                  </FormHelperText>
                ) : null}
              </Grid>
              <Grid item xs={12} sm={12}>
                <TextField
                  required
                  fullWidth
                  id="razaosocial"
                  label="RAZÃO SOCIAL"
                  name="razaosocial"
                  autoComplete="family-name"
                  value={razao}
                  onChange={handleChangeRazao}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  id="cep"
                  label="CEP"
                  name="cep"
                  value={cep}
                  autoComplete="cep"
                  onChange={handleChangeCep}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  id="numero"
                  label="NUMERO"
                  name="numero"
                  autoComplete="numero"
                  onChange={handleChangeNumero}
                  value={numero}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  id="Bairro"
                  label="Bairro"
                  name="Bairro"
                  autoComplete="Bairro"
                  onChange={handleChangeBairro}
                  value={Bairro}
                />
              </Grid>
              <Grid item xs={12} sm={12}>
                <TextField
                  required
                  fullWidth
                  id="endereco"
                  label="ENDERECO"
                  name="endereco"
                  value={endereco}
                  onChange={handleChangeEndereco}
                />
              </Grid>

              <Grid item xs={12} sm={12}>
                <TextField
                  fullWidth
                  id="complemento"
                  label="COMPLEMENTO"
                  name="complemento"
                  onChange={handleChangeComplemento}
                  value={complemento}
                />
              </Grid>

              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  id="cidade"
                  label="CIDADE"
                  name="cidade"
                  autoComplete="cidade"
                  value={cidade}
                  onChange={handleChangeCidade}
                />
              </Grid>

              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  id="estado"
                  label="ESTADO"
                  name="estado"
                  autoComplete="estado"
                  value={estado}
                  onChange={handleChangeEstado}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <Typography>DADOS PESSOAIS</Typography>
              </Grid>

              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="nome"
                  label="NOME"
                  name="nome"
                  autoComplete=""
                />
              </Grid>

              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  id="rg"
                  label="RG"
                  name="rg"
                  autoComplete="rg"
                />
              </Grid>

              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  id="cpf"
                  label="CPF"
                  name="cpf"
                  autoComplete="cpf"
                />
              </Grid>

              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="telefone"
                  label="TELEFONE/CELULAR"
                  name="telefone"
                  autoComplete="telefone"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="email"
                  label="EMAIL"
                  name="email"
                  autoComplete="email"
                />
              </Grid>

              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="Senha"
                  label="Senha"
                  name="Senha"
                  autoComplete="Senha"
                  type="password"
                />
              </Grid>
              <Grid item xs={6}>
                <label htmlFor="contained-button-file">
                  <Input
                    accept="image/*,application/pdf"
                    id="contained-button-file"
                    multiple
                    type="file"
                    onChange={(event) => {
                      setSelectedImage(event.target.files[0]);
                    }}
                  />
                  <Button
                    variant="contained"
                    endIcon={<PhotoCamera />}
                    component="span"
                  >
                    Anexar RG
                  </Button>
                </label>
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              disabled={btnDisabled}
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Finalizar Cadastro
            </Button>
          </Box>
        </Box>
      </Container>
    </>
  );
}
