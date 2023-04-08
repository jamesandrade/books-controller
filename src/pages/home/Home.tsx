import React from 'react';
import Sidebar from '../../components/sidebar/Sidebar';
import { Screen } from '../../global/styles/Screen';
import {  Card, CardContainer, Content } from './Components';
import { useEffect } from "react";
import { VerifyToken } from '../../global/api/VerifyToken';


function Home() {
  VerifyToken();

  return (
    <Screen>
      <Sidebar/>
      <Content>
        <CardContainer>
          <Card>
            Alunos
          </Card>
          <Card>
            Livros
          </Card>
          <Card>
            Empréstimos
          </Card>
          <Card>
            Devoluções
          </Card>
          <Card>
            Relatórios
          </Card>
          </CardContainer>
      </Content>
    </Screen>
  );
}

export default Home;