import { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { TextField, Button } from "@material-ui/core";
import { ThemeProvider } from 'styled-components';
import { GlobalStyle, Form } from "./Components";
import { useNavigate } from 'react-router-dom';
import api from "../../global/services/api";

import { createTheme } from '@material-ui/core';


interface LoginForm {
  email: string;
  password: string;
}

function Login() {
  const navigate = useNavigate();
  const { control, handleSubmit } = useForm<LoginForm>();
  const [loginError, setLoginError] = useState("");

  const onSubmit = (data: LoginForm) => {
    api
      .post("/users/login", data, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((response) => {
        localStorage.setItem("token", response.data.token);
        navigate("/home");
      })
      .catch((error) => {
        setLoginError("Erro ao fazer login. Verifique suas credenciais.");
        console.error(error);
      });
  };

  return (
    <ThemeProvider theme={{}}>
      
      <GlobalStyle />
      

      <Form onSubmit={handleSubmit(onSubmit)}>
        <Controller
          name="email"
          control={control}
          defaultValue=""
          rules={{ required: true }}
          render={({ field }) => (
            <TextField
              label="Email"
              variant="outlined"
              margin="normal"
              sx={{ mb: 2 }}
              autoFocus
              error={!!loginError}
              helperText={loginError || ""}
              {...field}
            />
          )}
        />
        <Controller
          name="password"
          control={control}
          defaultValue=""
          rules={{ required: true }}
          render={({ field }) => (
            <TextField
              label="Password"
              variant="outlined"
              margin="normal"
              sx={{ mb: 2 }}
              fullWidth
              type="password"
              error={!!loginError}
              helperText={loginError || ""}
              {...field}
            />
          )}
        />
        <Button
          type="submit"
          variant="contained"
          color="primary"
          fullWidth
          size="large"
        >
          Login
        </Button>
      </Form>
    </ThemeProvider>
  );
}

export default Login;