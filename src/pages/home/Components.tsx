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
export const Form = styled.form`
    display: flex;
    flex-direction: row;
    gap: 1rem;
    @media screen and (max-width: 850px){
        gap: 0;
        flex-direction: column;
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

export const Button = styled.button`
    border: none;
    background: none;
    margin: 0 1rem 0rem;
    color:  #4876FF;
    &:hover {
        color: #836FFF;
    }
`;

export const TableCard = styled.div`
    height: 80%;
    overflow-y: auto;
`;

export const Option = styled.option`
`;

export const Select = styled.select`
    background-color: #ffff;
    font-size: 1rem;
    margin-right: 1rem;
    padding: 1rem 1rem 1rem 1rem;
    border-radius: 0.2rem;
    border: 0.06rem solid;
    color: #5D478B;
`;
export const Card = styled.div`
    display: flex;
    font-size: 0.75rem;
    justify-content: center;
    align-content: center;
    flex-direction: column;
    align-items: center;
    background-color: #808080;
    color: #ffffff;
    width: 7rem;
    height: 7rem;
    border-radius: 0.3rem;
    gap: 1rem;
`;
export const CardContainer = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: center;
    gap: 2rem;
    @media screen and (min-width: 851px){
        display: none;
    }
`;