import styled from 'styled-components';

export const App = styled.div`
    background-color: #333;
    color: #fff;
    padding: 5rem 0.2rem 0;
    width: 12.5rem;
    font-family: 'Roboto', sans-serif;
    font-size: 0.75rem;
`;
  
export const Ul = styled.ul`
    list-style: none;
    margin: 0;
    padding: 0;
`;
  
export const Li = styled.li`
    margin: 0;
    padding: 0;
`;
  
export const TextBar = styled.a`
    -webkit-user-select: none;
    -khtml-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    -o-user-select: none;
    user-select: none;
    color: #fff;
    display: flex;
    padding: 0.62rem;
    gap: 0.5rem;
    text-decoration: none;
    align-items: center;
    &:hover{
        background-color: #555;
    }
`;
  