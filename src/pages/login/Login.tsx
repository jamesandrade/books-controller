import { useState, useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import { ThemeProvider } from 'styled-components';
import { GlobalStyle, Form } from "./Components";
import { useNavigate } from 'react-router-dom';
import api from "../../global/services/api";
import jwt_decode from "jwt-decode";
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';


interface LoginForm {
  email: string;
  password: string;
}

function Login() {
  const navigate = useNavigate();
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      const decodedToken: any = jwt_decode(token);
      if (decodedToken.exp >= Date.now() / 1000) {
        navigate("/home");
      }
    }
  }, [navigate])
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
              type="email"
              error={!!loginError}
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
              label="Senha"
              variant="outlined"
              margin="normal"
              fullWidth
              type="password"
              error={!!loginError}
              helperText={loginError || ""}
              {...field}
            />
          )}
        />
        <Button
          sx={{mt: 1}}
          type="submit"
          variant="contained"
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