import styled, { createGlobalStyle } from 'styled-components';

export const GlobalStyle = createGlobalStyle`
    body {
        display: flex;
        align-items: center;
        justify-content: center;
        height: 100vh;
    }
`;
export const Form = styled.form`
    display: flex;
    flex-direction: column;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 18rem;
    height: 18rem;
    font-family: 'Roboto', sans-serif;
    border-radius: 0.3rem;
`;