import React from 'react';
import Sidebar from '../../components/sidebar/Sidebar';
import { Screen } from '../../global/styles/Screen';
import {  Content } from './Components';
import { useEffect } from "react";
import { VerifyToken } from '../../global/api/VerifyToken';


function Home() {
  VerifyToken();

  return (
    <Screen>
      <Sidebar/>
      <Content>
      </Content>
    </Screen>
  );
}

export default Home;