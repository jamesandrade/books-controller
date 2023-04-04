import styled from 'styled-components';

export const Screen = styled.div`
    display: flex;
    height: 100vh;
    overflow: hidden;

    @media screen and (max-width: 1150px){
        display: grid;
    }
`;
