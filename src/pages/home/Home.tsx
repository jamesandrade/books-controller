import React from 'react';
import Sidebar from '../../components/sidebar/Sidebar';
import { Screen } from '../../global/styles/Screen';
import {  Content } from './Components';

function Home() {
  return (
    <Screen>
      <Sidebar/>
      <Content>
        <p>Texto</p>
      </Content>
    </Screen>
  );
}

export default Home;