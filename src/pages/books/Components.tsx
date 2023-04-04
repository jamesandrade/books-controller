import styled from 'styled-components';

export const Content = styled.div`
    display: flex;
    flex-direction: column;
    padding: 5rem 12rem 0.25rem;
    align-items: center;

    row-gap: 1rem;
`;
export const Form = styled.form`
    display: flex;
    flex-direction: row;

    column-gap: 1rem;
`;

export const TableCard = styled.div`
    overflow-y: auto;
    ::-webkit-scrollbar {
        width: 0px;
    }
`;