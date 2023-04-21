import Sidebar from '../../../components/sidebar/Sidebar';
import { Screen } from '../../../global/styles/Screen';
import { Content, Form } from './Components';
import { VerifyToken } from '../../../global/api/VerifyToken';
import BarChartComponent from './components/BarChartComponent';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { Controller, useForm } from 'react-hook-form';
import { GetTopFive } from '../../../global/api/Reports';
import { useEffect, useState } from 'react';

function TopFive() {
  VerifyToken();
  const currentYear = new Date().getFullYear();
  const defaultStartDate = `${currentYear}-01-01`;
  const defaultEndDate = `${currentYear}-12-31`;
  const [tops, setTops] = useState([]);
  const [dates, setDates] = useState({start_date: defaultStartDate, end_date: defaultEndDate})
  const { control, handleSubmit } = useForm();
  function formatDate(str: string): string {
    const parts = str.split('-');
    const year = parts[0];
    const month = parts[1];
    const day = parts[2];
    //const date = new Date(`${year}-${month}-${day}`);
    const formattedDate = `${day}/${month}/${year}`;
    return formattedDate;
  }
  useEffect(() => {
    async function fetchTops() {
      try {
        const topFive = await GetTopFive(defaultStartDate, defaultEndDate);
        setTops(topFive);
      } catch (error) {
        console.error(error);
      }
    }
    fetchTops();
  }, []);
  const onSubmit = async (data: any) => {
    if (data.start_date <= data.end_date){
      const topFive = await GetTopFive(data.start_date, data.end_date);
      setDates(data);
      setTops(topFive);
    }
  }
  return (
    <Screen>
      <Sidebar/>
        <Content>
          <Form onSubmit={handleSubmit(onSubmit)}>
            <Controller
              name="start_date"
              control={control}
              defaultValue={defaultStartDate}
              rules={{ required: true }}
              render={({ field }) => (
                <TextField
                  label="Início"
                  sx={{ mb: 2 }}
                  variant="outlined"
                  margin="normal"
                  type="date"
                  {...field}
                />
              )}
            />
            <Controller
              name="end_date"
              control={control}
              defaultValue={defaultEndDate}
              rules={{ required: true }}
              render={({ field }) => (
                <TextField
                  label="Fim"
                  sx={{ mb: 2 }}
                  variant="outlined"
                  margin="normal"
                  type="date"
                  {...field}
                />
              )}
            />
            <Button
              style={{ marginTop: '1rem', width: '13rem'}}
              sx={{ mb: 2 }}
              type="submit"
              size="large"
              variant="contained"
            >
              Pesquisar
            </Button>
          </Form>
        <BarChartComponent data={tops} />
        <p style={{display: 'flex', justifyContent: 'center'}}>Top 5 - Leitura | Período: {formatDate(dates.start_date)} à {formatDate(dates.end_date)}</p>
      </Content>
    </Screen>
  );
}

export default TopFive;