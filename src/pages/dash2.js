import React, { useEffect } from "react";
import whatslogo from "../whatsapp.png";
import phoneLogo from "../telephone.png";
import plus from "../plus.png";
import calendar from "../calendar.png";

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
import { useNavigate } from "react-router-dom";
import MenuAppBar from "../components/appbar";
import Modal from "@mui/material/Modal";
import { GetUserRepresentante } from "../hooks/useGetUserRepresentantes";
import { useRepresentante } from "../hooks/useRepresentante";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";
import logo from "../logo_sismega.jpeg";

import { handleDataVencimento } from "../hooks/useUpdateDataVencimento";

import Link from "@mui/material/Link";
import Switch from "@mui/material/Switch";
import AppLogo from "../components/appLogo";

import MenuItem from "@mui/material/MenuItem";

import Select from "@mui/material/Select";

import Search from "@mui/icons-material/Search";
import Moment from "moment";
import AppClientCounter from "../components/AppClientCounter";

import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormLabel from "@mui/material/FormLabel";
import ReactPaginate from "react-paginate";

import Stack from "@mui/material/Stack";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 380,
  bgcolor: "background.paper",
  p: 4,
};

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const Dash2 = () => {
  const [search, setSearch] = useState("");
  const [loading, set_loading] = useState(false);
  const [cliente_selected, set_clienteSelected] = useState(null);
  const [statusSearch, set_statusSearch] = useState(0);
  const navigate = useNavigate();
  const [pageNumber, set_pageNumber] = useState(0);

  const usersPerPage = 30;
  const pagesVisited = pageNumber * usersPerPage;

  const handleSelectChange = async (event) => {
    set_statusSearch(event.target.value);
    set_loading(true);
    await handleSearchUserRepresentanteStatus(event.target.value);
    set_loading(false);
  };

  const [openSucess, set_openSucess] = useState(false);

  const {
    userRepresentantes_Data,
    handleGetUserRepresentantes,
    handleSearchUserRepresentante,
    handleSearchUserRepresentanteStatus,
    isLoading,
  } = GetUserRepresentante();

  const { UpdateDataVencimento } = handleDataVencimento();

  const { handleRepresentanteActivation, response } = useRepresentante();

  const [open, setOpen] = useState(false);

  const handleOpen = (data) => {
    setOpen(true);
    set_clienteSelected(data);
  };

  const [openCalendar, setOpenOpenCalendar] = useState(false);

  const handleOpenCalendar = (data) => {
    setOpenOpenCalendar(true);
    set_clienteSelected(data);
  };

  function handleSearchChange(event) {
    event.preventDefault();
    setSearch(event.target.value.toLowerCase());
  }

  const handleClienteActiveState = (CODCLIENTE, ATIVADESATIVA) => {
    set_loading(true);
    handleRepresentanteActivation(CODCLIENTE, ATIVADESATIVA);
    window.location.reload(true);
  };

  useEffect(() => {
    handleSearchUserRepresentanteStatus(0);
  }, []);

  useEffect(() => {
    const HandleGetUserRepresentantes = async () => {
      set_loading(true);
      await handleSearchUserRepresentanteStatus(0);
      set_loading(false);
    };

    HandleGetUserRepresentantes();
  }, [response]);

  const handleClose = () => setOpen(false);

  const handleCloseCalendar = () => setOpenOpenCalendar(false);

  const [value, setValue] = React.useState("");

  const handleChange = async (event) => {
    set_loading(true);
    await UpdateDataVencimento(event.target.value, cliente_selected.CodCliente);
    set_loading(false);
    set_openSucess(true);
    handleCloseCalendar(true);
    set_clienteSelected(null);
  
  };

  const displayData = userRepresentantes_Data
    .slice(pagesVisited, pagesVisited + usersPerPage)
    .map((p) => {
      return (
        <>
          <Box
            key={p.CodCliente}
            sx={{ display: "flex", marginTop: 2, marginBottom: 2 }}
          >
            <Card
              elevation={2}
              sx={{ width: "100%", border: "1px", borderColor: "black" }}
            >
              <CardContent>
                <Box
                  mb={2}
                  sx={{
                    backgroundColor: "#1976d2",
                    paddingTop: 2,
                    paddingBottom: 2,
                  }}
                >
                  <Typography ml={2} color="white" fontSize={14}>
                    {p.NomeRazaoSocial}
                  </Typography>
                </Box>

                <Typography fontSize={13}>
                  CÓDIGO DO CLIENTE: {p.CodCliente}
                </Typography>

                {/* <Typography fontSize={11}>
                    NOME DO CLIENTE: {p.NomeRazaoSocial}
                  </Typography> */}
                <Typography fontSize={13}>
                  RESPONSÁVEL: {p.Responsavel}
                </Typography>
                <Typography fontSize={13}>CNPJ/CPF: {p.CPFCNPJ}</Typography>
              </CardContent>
              <CardContent>
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                  }}
                >
                  <Typography fontSize={10}>
                    ULTIMO ACESSO:{" "}
                    {Moment(p.ULTIMOACESSO).format("DD-MM-YYYY HH:mm")}
                  </Typography>

                  {p.ATIVO == "0" ? (
                    <Switch
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
                <Box sx={{ display: "flex", justifyContent: "flex-start" }}>
                  <Link
                    mr={2}
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
                    mr={2}
                    href={`tel:${p.Telefone}`
                      .replace("(", "")
                      .replace(")", "")
                      .replace("-", "")}
                  >
                    <img width={28} height={28} src={phoneLogo} />
                  </Link>

                  <Link onClick={() => handleOpen(p)}>
                    <img width={28} height={28} src={plus} />
                  </Link>

                  <Link ml={2} onClick={() => handleOpenCalendar(p)}>
                    <img width={28} height={28} src={calendar} />
                  </Link>
                </Box>
              </CardContent>
            </Card>
          </Box>
        </>
      );
    });

  const pageCount = Math.ceil(userRepresentantes_Data.length / usersPerPage);

  const changePage = ({ selected }) => {
    set_pageNumber(selected);
  };

  const handleCloseSuccess = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    set_openSucess(false);
  };

  return (
    <>
      <Stack sx={{ width: "100%"}}>
        <Snackbar
          open={openSucess}
          autoHideDuration={6000}
          onClose={handleCloseSuccess}        

        >
          <Alert
            onClose={handleClose}
            severity="success"
            sx={{ width: "100%" }}
          >
            Dados alterado com sucesso
          </Alert>
        </Snackbar>
      </Stack>

      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={loading}
      >
        <CircularProgress color="inherit" />
      </Backdrop>

      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={isLoading}
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

      <Modal open={openCalendar} onClose={handleCloseCalendar}>
        <Box sx={style}>
          <Box sx={{ textAlign: "right" }}>
            <Button onClick={handleCloseCalendar}>Fechar</Button>
          </Box>

          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              marginTop: 2,
              marginBottom: 2,
            }}
          >
            <FormControl>
              <FormLabel id="demo-controlled-radio-buttons-group">
                Data de vencimento
              </FormLabel>
              <RadioGroup
                aria-labelledby="demo-controlled-radio-buttons-group"
                name="controlled-radio-buttons-group"
                value={value}
                onChange={handleChange}
              >
                <FormControlLabel value="1" control={<Radio />} label="1 mês" />
                <FormControlLabel
                  value="3"
                  control={<Radio />}
                  label="3 meses"
                />
                <FormControlLabel
                  value="6"
                  control={<Radio />}
                  label="6 meses"
                />
                <FormControlLabel
                  value="12"
                  control={<Radio />}
                  label="1 ano"
                />
              </RadioGroup>
            </FormControl>
          </Box>
        </Box>
      </Modal>
      <MenuAppBar />

      <Container sx={{ mt: 6 }} component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            mb: 5,
            display: "flex",
            justifyContent: "center",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <>
            <img style={{ width: "100px" }} src={logo} />
            <Typography mt={2} component="h1" variant="h5">
              representação de sucesso
            </Typography>
          </>
        </Box>
        <Box
          sx={{
            display: "flex",
            justifyContent: "right",
            mb: 5,
          }}
        >
          <Select
            sx={{ width: 150, height: 30 }}
            onChange={handleSelectChange}
            value={statusSearch}
          >
            <MenuItem value={3}>TODOS</MenuItem>
            <MenuItem value={0}>ATIVO</MenuItem>
            <MenuItem value={1}>DESATIVADO</MenuItem>
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
                  <IconButton edge="end"></IconButton>
                </InputAdornment>
              }
            />
          </FormControl>
          <IconButton
            color="primary"
            aria-label="upload picture"
            component="span"
            onClick={() => handleSearchUserRepresentante(search, statusSearch)}
          >
            <Search />
          </IconButton>
        </Box>

        {displayData}
      </Container>

      <Container
        maxWidth="xs"
        sx={{
          display: "flex",
          width: "100%",
          justifyContent: "center",
        }}
      >
        <ReactPaginate
          previousLabel={"Anterior"}
          nextLabel={"Próximo"}
          pageCount={pageCount}
          onPageChange={changePage}
          containerClassName={"paginationBttns"}
          previousLinkClassName={"previousBttn"}
          nextClassName="pageItem"
          pageLinkClassName="page-link"
          nextLinkClassName={"nextBttn"}
          disabledClassName={"paginationDisabled"}
          activeClassName={"paginationActive"}
          pageRangeDisplayed={1}
        />
      </Container>
    </>
  );
};

export default Dash2;
