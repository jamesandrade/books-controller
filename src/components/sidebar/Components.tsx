import styled from 'styled-components';

export const App = styled.div`
    background-color: #333;
    color: #fff;
    padding: 5rem 0.2rem 0;
    width: 12.5rem;
    z-index: 1;
    font-family: 'Roboto', sans-serif;
    font-size: 0.75rem;
    @media screen and (min-width: 851px){
        height: 100vh;
        overflow: hidden;
    }
    @media screen and (max-width: 850px){
        padding: 0 0 0;
        position: fixed;
        width: 100%;
        height: 3rem;
      }
`;
export const Ul = styled.ul`
    list-style: none;
    margin: 0;
    padding: 0;
    height: 100vh;
    @media screen and (max-width: 850px){
        display: none;
    }
`;

export const UlMobile = styled.ul`
    position: absolute;
    list-style: none;
    margin: 0;
    padding-top: 5rem;
    height: 100vh;
    width: 12.5rem;
    background-color: #333;
    @media screen and (min-width: 851px){
        display: none;
    }
`;
export const Li = styled.li`
    cursor: pointer;
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
export const Menu = styled.div`
    @media screen and (min-width: 851px){
        display: none;
    }
    margin-left: 0.25rem;
    margin-top: 0.75rem;
`;