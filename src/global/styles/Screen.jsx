import styled from 'styled-components';

export const Screen = styled.div`
    display: flex;
    flex-direction: row;
    gap: 15vh;
    align-items: center;
    @media screen and (max-width: 850px){
        flex-direction: column;
    }
`;
