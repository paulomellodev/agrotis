import { useState } from "react";
import { Container } from "./style";

import {
  Box,
  Button,
  Grid,
  TextField,
  Typography,
  createTheme,
  ThemeProvider,
  Autocomplete,
} from "@mui/material";
import { useForm } from "react-hook-form";

import { toast } from "react-toastify";

import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";

import TodayIcon from "@mui/icons-material/Today";
import CloseIcon from "@mui/icons-material/Close";
import ReportProblemIcon from "@mui/icons-material/ReportProblem";

import { DesktopDatePicker } from "@mui/x-date-pickers";
import ptBR from "date-fns/locale/pt-BR";

const theme = createTheme({
  palette: {
    primary: {
      main: "#00796b",
    },
  },
});

const propriedades = [
  {
    id: 12345,
    nome: "Agrotis 1",
    cnpj: "04.909.987/0001-89",
  },
  {
    id: 12346,
    nome: "Agrotis 2",
    cnpj: "04.909.987/0001-88",
  },
  {
    id: 12347,
    nome: "Agrotis 3",
    cnpj: "04.909.987/0001-87",
  },
  {
    id: 12348,
    nome: "Agrotis 4",
    cnpj: "04.909.987/0001-86",
  },
  {
    id: 12349,
    nome: "Agrotis 5",
    cnpj: "04.909.987/0001-85",
  },
  {
    id: 12350,
    nome: "Agrotis 6",
    cnpj: "04.909.987/0001-84",
  },
];

const laboratorio = [
  {
    id: 12351,
    nome: "Agro Skynet",
  },
  {
    id: 12352,
    nome: "Umbrella Agro",
  },
  {
    id: 12353,
    nome: "Osborn Agro",
  },
  {
    id: 12354,
    nome: "Skyrim Agro",
  },
  {
    id: 12355,
    nome: "Agro Brasil",
  },
];

const Form = () => {
  const [dataInicial, setDataInicial] = useState(null);
  const [dataFinal, setDataFinalInicial] = useState(null);
  const [labSelecionado, setLabSelecionado] = useState({});
  const [propSelecionado, setPropSelecionado] = useState({});

  const LIMITE_CARACTERES = 40;
  const LIMITE_CARACTERES_OBSERVACOES = 1000;

  const [datas, setDatas] = useState({ nome: "", observacoes: "" });

  const handleChange = (inputData) => (e) => {
    setDatas({ ...datas, [inputData]: e.target.value });
  };

  const handleChangeStartDate = (newValue) => {
    setDataInicial(newValue);
  };

  const handleChangeEndDate = (newValue) => {
    setDataFinalInicial(newValue);
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const sendForm = (data) => {
    console.log(errors);
    data.infosPropriedade = propSelecionado;
    data.cnpj = propSelecionado.cnpj;
    delete data.infosPropriedade.cnpj;
    data.laboratorio = labSelecionado;
    data.dataFinal = dataFinal;
    data.dataInicial = dataInicial;
    toast.success("Cadastro realizado com sucesso!");
    console.log(data);
  };

  return (
    <ThemeProvider theme={theme}>
      <Container>
        <Box
          component="form"
          onSubmit={handleSubmit(sendForm)}
          sx={{
            "& .MuiFormHelperText-root": {
              textAlign: "right",
            },
          }}
        >
          <Grid
            component="header"
            container
            sx={{
              justifyContent: "space-between",
              bgcolor: "primary.main",
              color: "#fff",
              py: "8px",
              px: "20px",
            }}
          >
            <Typography component="h1" variant="h6" sx={{ lineHeight: 2 }}>
              Teste front-end
            </Typography>
            <Button type="submit" sx={{ color: "#fff" }}>
              Salvar
            </Button>
          </Grid>
          <Box component="div" sx={{ px: "25px", py: "25px" }}>
            <Grid container spacing={2}>
              <Grid item xs={6}>
                <TextField
                  fullWidth
                  label="Nome *"
                  variant="standard"
                  value={datas.nome}
                  inputProps={{
                    maxLength: LIMITE_CARACTERES,
                    onChange: handleChange("nome"),
                  }}
                  helperText={`${datas.nome.length}/${LIMITE_CARACTERES}`}
                  {...register("nome", { required: true })}
                  error={!!errors.nome}
                />
              </Grid>

              <LocalizationProvider
                dateAdapter={AdapterDateFns}
                adapterLocale={ptBR}
              >
                <Grid item xs={3}>
                  <DesktopDatePicker
                    label="Data Inicial"
                    inputFormat="dd/MM/yyyy"
                    value={dataInicial}
                    onChange={handleChangeStartDate}
                    renderInput={(params) => (
                      <TextField
                        required
                        {...register("dataInicial")}
                        fullWidth
                        variant="standard"
                        {...params}
                        error={!!errors.dataInicial}
                      />
                    )}
                    components={{
                      OpenPickerIcon: TodayIcon,
                    }}
                  />
                </Grid>
                <Grid item xs={3}>
                  <DesktopDatePicker
                    label="Data Final"
                    inputFormat="dd/MM/yyyy"
                    value={dataFinal}
                    onChange={handleChangeEndDate}
                    renderInput={(params) => (
                      <TextField
                        required
                        {...register("dataFinal")}
                        fullWidth
                        variant="standard"
                        {...params}
                        helperText="Info"
                        error={!!errors.dataFinal}
                      />
                    )}
                    components={{
                      OpenPickerIcon: TodayIcon,
                    }}
                  />
                </Grid>
              </LocalizationProvider>
            </Grid>
            <Grid container spacing={2} sx={{ mt: 1 }}>
              <Grid item xs={6}>
                <Autocomplete
                  options={propriedades}
                  onChange={(e, value) => setPropSelecionado(value)}
                  renderInput={(params) => {
                    return (
                      <TextField
                        required
                        {...params}
                        {...register("infosPropriedade")}
                        variant="standard"
                        fullWidth
                        label="Propriedades"
                        helperText={
                          !!errors.infosPropriedade ? (
                            "Error"
                          ) : params.inputProps.value ? (
                            `CNPJ ${
                              propriedades.find(
                                (prop) => prop.nome === params.inputProps.value
                              ).cnpj
                            }`
                          ) : (
                            <span></span>
                          )
                        }
                        sx={{
                          "& .MuiFormHelperText-root": {
                            textAlign: "left",
                          },
                        }}
                        error={!!errors.infosPropriedade}
                      />
                    );
                  }}
                  blurOnSelect="mouse"
                  fullWidth
                  getOptionLabel={(option) => option.nome}
                  renderOption={(props, option) => (
                    <li {...props}>
                      <Box
                        component="span"
                        sx={{
                          width: 14,
                          height: 14,
                          flexShrink: 0,
                          borderRadius: "3px",
                          mr: 1,
                          mt: "2px",
                        }}
                      />
                      <Box
                        sx={{
                          flexGrow: 1,
                          "& span": {
                            color: "#586069",
                          },
                        }}
                      >
                        {option.nome}
                        <br />
                        <span>{option.cnpj}</span>
                      </Box>
                      <Box
                        component={CloseIcon}
                        sx={{ opacity: 0.6, width: 18, height: 18 }}
                      />
                    </li>
                  )}
                />
              </Grid>
              <Grid item xs={6}>
                <Autocomplete
                  options={laboratorio}
                  onChange={(e, value) => setLabSelecionado(value)}
                  renderInput={(params) => {
                    return (
                      <TextField
                        {...params}
                        variant="standard"
                        fullWidth
                        required
                        label="Laboratórios"
                        {...register("laboratorio")}
                        helperText={
                          !!errors.laboratorio && [
                            <ReportProblemIcon key={params.inputProps.value} />,
                            "Error",
                          ]
                        }
                        error={!!errors.infosPropriedade}
                        sx={{
                          "& .MuiFormHelperText-root": {
                            textAlign: "left",
                            display: "flex",
                            svg: { w: "10px", h: "5px" },
                          },
                        }}
                      />
                    );
                  }}
                  blurOnSelect="mouse"
                  fullWidth
                  getOptionLabel={(option) => option.nome}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  variant="standard"
                  label="Observações"
                  multiline
                  rows={4}
                  value={datas.observacoes}
                  inputProps={{
                    maxLength: LIMITE_CARACTERES_OBSERVACOES,
                    onChange: handleChange("observacoes"),
                  }}
                  helperText={`${datas.observacoes.length}/${LIMITE_CARACTERES_OBSERVACOES}`}
                  {...register("observacoes")}
                  sx={{ mt: 2 }}
                />
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
};

export default Form;
