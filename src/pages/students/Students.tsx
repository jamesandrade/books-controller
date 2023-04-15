import Sidebar from '../../components/sidebar/Sidebar';
import { Screen } from '../../global/styles/Screen';
import { Content, Card, CardContainer } from './Components';
import PersonAddAltOutlinedIcon from '@mui/icons-material/PersonAddAltOutlined';

import ListAltSharpIcon from '@mui/icons-material/ListAltSharp';
import { useNavigate } from 'react-router-dom';

function Students() {
  const navigate = useNavigate();

  return (
    <Screen>
      <Sidebar/>
        <Content>
          <CardContainer>
            <Card onClick={() => {
              navigate("/students/create")
              }}
            >
              <PersonAddAltOutlinedIcon style={{fontSize: "1.25rem"}} />
              Adicionar Aluno
            </Card>
            <Card onClick={() => {
              navigate("/students/list")
              }}
            >
              <ListAltSharpIcon style={{fontSize: "1.25rem"}} />
              Listar Alunos
            </Card>
          </CardContainer>
      </Content>
    </Screen>
  );
}

export default Students;