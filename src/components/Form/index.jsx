import { Button, TextField, Typography } from "@mui/material";
import { Box, Container } from "@mui/system";
import { useForm } from "react-hook-form";

const Form = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  return (
    <Container sx={{ margin: "50px" }}>
      <Box component="form" onSubmit={handleSubmit}>
        <Box component="header">
          <Typography>Teste front-end</Typography>
          <Button type="submit">Enviar</Button>
        </Box>
        <TextField required label="Nome" variant="standard" />
      </Box>
    </Container>
  );
};

export default Form;
