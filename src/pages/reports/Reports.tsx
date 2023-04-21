import Sidebar from '../../components/sidebar/Sidebar';
import { Screen } from '../../global/styles/Screen';
import { Content, Card, CardContainer } from './Components';
import TimelineIcon from '@mui/icons-material/Timeline';
import BarChartIcon from '@mui/icons-material/BarChart';
import { useNavigate } from 'react-router-dom';
import { VerifyToken } from '../../global/api/VerifyToken';
function Reports(){
  VerifyToken();
  const navigate = useNavigate();
  return (
    <Screen>
      <Sidebar/>
        <Content>
          <CardContainer>
            <Card onClick={() => {
              navigate("/reports/topfive")
              }}
            >
              <BarChartIcon style={{fontSize: "1.25rem"}} />
              Top 5 - Leitura
            </Card>
            <Card onClick={() => {
              navigate("/")
              }}
            >
              <TimelineIcon style={{fontSize: "1.25rem"}} />
              Histórico Individual
            </Card>
          </CardContainer>
      </Content>
    </Screen>
  );
}

export default Reports;