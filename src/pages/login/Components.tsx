import styled, { createGlobalStyle } from 'styled-components';
export const GlobalStyle = createGlobalStyle`
    body {
        display: flex;
        justify-content: center;
        align-items: center;
    }
`;
export const Form = styled.form`
    display: flex;
    flex-direction: column;
    width: 21.8rem;
    height: 21.8rem;
    background-color: #fff8;
    font-family: 'Roboto', sans-serif;
    border-radius: 0.3rem;
`;