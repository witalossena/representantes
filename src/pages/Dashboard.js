import React, { useEffect } from "react";
import whatslogo from "../whatsapp.png";
import phoneLogo from "../telephone.png";
import plus from "../plus.png";

import { useState } from "react";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import FilledInput from "@mui/material/FilledInput";
import InputLabel from "@mui/material/InputLabel";
import InputAdornment from "@mui/material/InputAdornment";
import FormControl from "@mui/material/FormControl";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import MenuAppBar from "../components/appbar";
import Modal from "@mui/material/Modal";
import { GetUserRepresentante } from "../hooks/useGetUserRepresentantes";
import { useRepresentante } from "../hooks/useRepresentante";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";

import Link from "@mui/material/Link";
import Switch from "@mui/material/Switch";
import AppLogo from "../components/appLogo";

import MenuItem from "@mui/material/MenuItem";

import Select from "@mui/material/Select";

import Search from "@mui/icons-material/Search";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 380,
  bgcolor: "background.paper",
  p: 4,
};

const Dashboard = () => {
  const [search, setSearch] = useState("");
  const [loading, set_loading] = useState(false);
  const [cliente_selected, set_clienteSelected] = useState(null);
  const [statusSearch, set_statusSearch] = useState("");

  const handleSelectChange = (event) => {
    set_statusSearch(event.target.value);
  };

  const {
    userRepresentantes_Data,
    handleGetUserRepresentantes,
    handleSearchUserRepresentante,
    handleSearchUserRepresentanteStatus
  } = GetUserRepresentante();

  const { handleRepresentanteActivation, response } = useRepresentante();

  const [open, setOpen] = useState(false);

  const handleOpen = (data) => {
    setOpen(true);
    set_clienteSelected(data);
  };

  function handleSearchChange(event) {
    event.preventDefault();
    setSearch(event.target.value.toLowerCase());
    handleSearchUserRepresentanteStatus(search) 
  }

  useEffect(() => {
    handleGetUserRepresentantes();
  }, []);

  const handleClienteActiveState = (CODCLIENTE, ATIVADESATIVA) => {
    set_loading(true);
    handleRepresentanteActivation(CODCLIENTE, ATIVADESATIVA);
  };

  useEffect(() => {
    const HandleGetUserRepresentantes = async () => {
      set_loading(true);
      await handleGetUserRepresentantes();
      set_loading(false);
    };

    HandleGetUserRepresentantes();
  }, [response]);

  const handleClose = () => setOpen(false);

 

  return (
    <>
      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={loading}
      >
        <CircularProgress color="inherit" />
      </Backdrop>

      <Modal open={open} onClose={handleClose}>
        {cliente_selected ? (
          <Box sx={style}>
            <Box sx={{ textAlign: "right" }}>
              <Button onClick={handleClose}>Fechar</Button>
            </Box>

            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                marginTop: 2,
                marginBottom: 2,
              }}
            >
              <Typography fontSize={11}>
                ENDEREÇO: {cliente_selected.Endereco}{" "}
                {cliente_selected.Complemento}
              </Typography>
              <Typography fontSize={11}>
                NUMERO: {cliente_selected.Numero}
              </Typography>
              <Typography fontSize={11}>
                CIDADE: {cliente_selected.Cidade}
              </Typography>
              <Typography fontSize={11}>
                ESTADO: {cliente_selected.Estado}
              </Typography>
              <Typography fontSize={11}>
                TELEFONE: {cliente_selected.Telefone}
              </Typography>
              <Typography fontSize={11}>
                SISTEMA: {cliente_selected.Sistema}
              </Typography>
            </Box>
          </Box>
        ) : null}
      </Modal>

      <MenuAppBar />

      <Container sx={{ mt: 6 }} component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            mb: 3,
            display: "flex",
            justifyContent: "center",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <AppLogo />
        </Box>
        <Box
          sx={{
            display: "flex",
            justifyContent: "right",
          }}
        >
          <Select
            fullWidth={true}
            onChange={handleSelectChange}
            value={statusSearch}
            defaultValue={0}
          >
            <MenuItem value={0}>TODOS</MenuItem>
            <MenuItem value={1}>ATIVO</MenuItem>
            <MenuItem value={2}>DESATIVADO</MenuItem>
          </Select>
        </Box>

        <Box sx={{ display: "flex" }}>
          <FormControl fullWidth variant="filled">
            <InputLabel htmlFor="filled-adornment-password">
              pesquisa por nome ou código de cliente
            </InputLabel>
            <FilledInput
              onChange={handleSearchChange}
              id="filled-adornment-password"
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    edge="end"
                  ></IconButton>
                </InputAdornment>
              }
            />
          </FormControl>
          <IconButton
            color="primary"
            aria-label="upload picture"
            component="span"
            onClick={() =>  handleSearchUserRepresentante(search, statusSearch)}
          >
            <Search />
          </IconButton>
        </Box>

        {userRepresentantes_Data ? (
          userRepresentantes_Data.map((p) => (
            <Box
              key={p.CodCliente}
              sx={{ display: "flex", marginTop: 2, marginBottom: 2 }}
            >
              <Card sx={{ width: "100%" }}>
                <CardContent>
                  <Typography fontSize={11}>
                    CÓDIGO DO CLIENTE: {p.CodCliente}
                  </Typography>
                  <Typography fontSize={11}>
                    NOME DO CLIENTE: {p.NomeRazaoSocial}
                  </Typography>
                  <Typography fontSize={11}>
                    RESPONSÁVEL: {p.Responsavel}
                  </Typography>
                </CardContent>
                <CardContent>
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                    }}
                  >
                    <Typography fontSize={8}>
                      ULTIMO ACESSO: {p.ULTIMOACESSO}
                    </Typography>

                    {p.ATIVO == "0" ? (
                      <Switch
                        sx={{ color: "red" }}
                        checked={true}
                        onChange={(e) =>
                          handleClienteActiveState(p.CodCliente, "1")
                        }
                        inputProps={{ "aria-label": "controlled" }}
                      />
                    ) : (
                      <Switch
                        color="error"
                        checked={false}
                        onChange={(e) =>
                          handleClienteActiveState(p.CodCliente, "0")
                        }
                        inputProps={{ "aria-label": "controlled" }}
                      />
                    )}
                  </Box>
                </CardContent>
                <Divider />
                <CardContent>
                  <Box sx={{ display: "flex", justifyContent: "space-around" }}>
                    <Link
                      target="_blank"
                      rel="noopener noreferrer"
                      href={`https://api.whatsapp.com/send?phone=55${p.Telefone}`
                        .replace("(", "")
                        .replace(")", "")
                        .replace("-", "")}
                    >
                      <img width={28} height={28} src={whatslogo} />
                    </Link>
                    <Link
                      href={`tel:${p.Telefone}`
                        .replace("(", "")
                        .replace(")", "")
                        .replace("-", "")}
                    >
                      <img width={28} height={28} src={phoneLogo} />
                    </Link>

                    <img
                      width={28}
                      height={28}
                      src={plus}
                      onClick={() => handleOpen(p)}
                    />
                  </Box>
                </CardContent>
              </Card>
            </Box>
          ))
        ) : (
          <>no data</>
        )}
      </Container>
    </>
  );
};

export default Dashboard;