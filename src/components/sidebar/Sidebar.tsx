import React from 'react';
import AutoStoriesIcon from '@mui/icons-material/AutoStories';
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import ImportExportIcon from '@mui/icons-material/ImportExport';
import InsightsIcon from '@mui/icons-material/Insights';
import { useNavigate } from 'react-router-dom';


import { App, Ul, Li, TextBar } from './Components';
function Sidebar() {
  const navigate = useNavigate();
  return (
      <App>
        <Ul>
          <Li onClick={() => navigate('/students')}><TextBar><AccountBoxIcon/>Aluno</TextBar></Li>
          <Li onClick={() => navigate('/books')}><TextBar><AutoStoriesIcon/>Livro</TextBar></Li>
          <Li onClick={() => navigate('/loans')}><TextBar><ImportExportIcon/>Empréstimos/Devoluções</TextBar></Li>
          <Li><TextBar><InsightsIcon/>Relatórios</TextBar></Li>
        </Ul>
      </App>
  );
}

export default Sidebar;