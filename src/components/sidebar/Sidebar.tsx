import React ,{ useState } from 'react';
import AutoStoriesIcon from '@mui/icons-material/AutoStories';
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import InsightsIcon from '@mui/icons-material/Insights';
import { ToastContainer, toast } from 'react-toastify';
import MenuIcon from '@mui/icons-material/Menu';
import ExitToAppOutlinedIcon from '@mui/icons-material/ExitToAppOutlined';
import PlaylistAddOutlinedIcon from '@mui/icons-material/PlaylistAddOutlined';
import PlaylistAddCheckOutlinedIcon from '@mui/icons-material/PlaylistAddCheckOutlined';
import 'react-toastify/dist/ReactToastify.css';

import { useNavigate } from 'react-router-dom';

import { App, Ul, Li, TextBar, Menu, UlMobile } from './Components';
function Sidebar() {
  const navigate = useNavigate();
  const [showMenu, setShowMenu] = useState(false);

  function handleClick() {
    showMenu ? setShowMenu(false) : setShowMenu(true);
  }

  const handleExit = (event: any) => {
    event.preventDefault()
    setTimeout(() => {
      toast.success('êxito!', {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    }, 5000);
    localStorage.removeItem('token')
    navigate('/');
  };

  return (
      <App>
        <Menu onClick={handleClick}>
          <MenuIcon/>
        </Menu>
        <ToastContainer />
          <Ul>
            <Li onClick={() => navigate('/students')}><TextBar><AccountBoxIcon/>Aluno</TextBar></Li>
            <Li onClick={() => navigate('/books')}><TextBar><AutoStoriesIcon/>Livro</TextBar></Li>
            <Li onClick={() => navigate('/loans')}><TextBar><PlaylistAddOutlinedIcon/>Empréstimos</TextBar></Li>
            <Li onClick={() => navigate('/devolutions')}><TextBar><PlaylistAddCheckOutlinedIcon/>Devoluções</TextBar></Li>
            <Li><TextBar><InsightsIcon/>Relatórios</TextBar></Li>
            <Li onClick={handleExit}><TextBar><ExitToAppOutlinedIcon/>Sair</TextBar></Li>

          </Ul>
          { showMenu &&
            <UlMobile>
              <Li onClick={() => navigate('/students')}><TextBar><AccountBoxIcon/>Aluno</TextBar></Li>
              <Li onClick={() => navigate('/books')}><TextBar><AutoStoriesIcon/>Livro</TextBar></Li>
              <Li onClick={() => navigate('/loans')}><TextBar><PlaylistAddOutlinedIcon/>Empréstimos</TextBar></Li>
              <Li onClick={() => navigate('/devolutions')}><TextBar><PlaylistAddCheckOutlinedIcon/>Devoluções</TextBar></Li>
              <Li><TextBar><InsightsIcon/>Relatórios</TextBar></Li>
              <Li onClick={handleExit}><TextBar><ExitToAppOutlinedIcon/>Sair</TextBar></Li>
          </UlMobile> }
      </App>
  );
}

export default Sidebar;