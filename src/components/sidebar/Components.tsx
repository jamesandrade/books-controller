import styled from 'styled-components';

export const App = styled.div`
    background-color: #333;
    color: #fff;
    padding: 5rem 0.2rem 0;
    width: 12.5rem;
    font-family: 'Roboto', sans-serif;
    font-size: 0.75rem;
    @media screen and (max-width: 1150px){
        padding:0 0 0;
        height: 3rem;
        width: 100%;
      }
`;
  
export const Ul = styled.ul`
    list-style: none;
    margin: 0;
    padding: 0;
    @media screen and (max-width: 1150px){
        display: none;
    }
`;
  
export const UlMobile = styled.ul`
    position: absolute;
    list-style: none;
    height: 100%;
    width: 12.5rem;
    margin: 0;
    padding: 5rem 0.2rem 0;
    background-color: #333;
    @media screen and (min-width: 1151px){
        display: none;
        position: relative;
    }
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
export const Menu = styled.div`
    @media screen and (min-width: 1151px){
        display: none;
    }

    margin-left: 0.25rem;
    margin-top: 0.75rem;
`;

  