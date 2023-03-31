import styled from 'styled-components';

export const Content = styled.div`
    display: flex;
    justify-content: center;
    flex-direction: column;
    padding: 5rem 5rem 0;
    row-gap: 1rem;
`;
export const Form = styled.form`
    display: flex;
    flex-direction: row;
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

export const Option = styled.option`
    background-color: #ffff;
    font-size: 1rem;
    margin-right: 1rem;
    padding: 1rem 1rem 1rem 1rem;
    border-radius: 0.2rem;
    border: 0.06rem solid;
    color: #5D478B;
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