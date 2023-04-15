import styled from 'styled-components';

export const Content = styled.div`
    font-family: 'Roboto', sans-serif;
    display: flex;
    flex-direction: column;
    align-items: center;
    row-gap: 1rem;
    height: 85vh;
    width: 65vw;
    padding-bottom: 0;
    @media screen and (max-width: 850px){
        margin-top: 5rem;
        height: auto;
        width: 85vw;
    }
`;

export const Input = styled.input`
    background-color: #ffff;
    font-size: 1rem;
    margin-right: 1rem;
    padding: 1rem 1rem 1rem 1rem;
    border-radius: 0.2rem;
    border: 0.06rem solid;
    color: #5D478B;
`;

export const TableCard = styled.div`
    height: 95%;
    overflow-y: auto;
`;