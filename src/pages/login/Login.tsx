import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';

import { Box, LoginText, Input, Submit, GlobalStyle } from './Components';

function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const data = { email, password };
    const navigate = useNavigate();
    const handleSubmit = (event: any) => {
        event.preventDefault();
        fetch('http://localhost:5000/users/login', {
            method: 'POST',
            headers: {
            'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        })
        .then(response => response.json())
        .then(data => {
            localStorage.setItem('token', data.token);
            navigate('/home');
        })
        .catch(error => console.error(error));
    };
    return (
        <ThemeProvider theme={{}}>
        <GlobalStyle />

        <Box onSubmit={handleSubmit}>
            <LoginText>LOGIN</LoginText>
            <Input value={email}
                id="email"
                onChange={(event) => setEmail(event.target.value)}
                placeholder="Usuário"/>
            <Input type="password"
                id="password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                placeholder="Senha"/>
            <Submit type="submit">Entrar</Submit>
        </Box>
        </ThemeProvider>
    );
}

export default Login;
