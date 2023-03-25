import styled, { createGlobalStyle } from 'styled-components';
export const GlobalStyle = createGlobalStyle`
    body {
        display: flex;
        justify-content: center;
        align-items: center;
        height: 100vh;
    }
`;
export const Box = styled.form`
    display: flex;
    flex-direction: column;
    width: 21.8rem;
    height: 21.8rem;
    background-color: #fff8;
    font-family: 'Roboto', sans-serif;
    border-radius: 0.3rem;
`;

export const LoginText = styled.p`
    margin: 2.8rem 0 1.5rem;
    background-color: #fff8;
    color: #5D478B;
    font-size: 2rem;
    text-align: center;
`;
export const Input = styled.input`
    background-color: #f8f8f8;
    font-size: 1rem;
    padding: 1rem 0.75rem 0.75rem;
    margin: 0.3rem 2.2rem 0.3rem;
    border-radius: 0.2rem;
    border: 0.06rem solid;
    color: #5D478B;
`;

export const Submit = styled.button`
    background-color: #4876FF;
    padding: 1rem 0.75rem 0.75rem;
    font-size: 1rem;
    margin: 1.25rem 2.2rem 0.3rem;
    border-radius: 0.2rem;
    border: 0.06rem solid #4876FF;
    color: #f8f8f8;
    &:hover {
        background-color: #836FFF;
    }
`;
