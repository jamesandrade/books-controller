import Sidebar from '../../../components/sidebar/Sidebar';
import { Screen } from '../../../global/styles/Screen';
import { Content, Form } from './Components';
import { VerifyToken } from '../../../global/api/VerifyToken';
import BarChartComponent from './components/BarChartComponent';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { Controller, useForm } from 'react-hook-form';

function TopFive() {
  VerifyToken();
  const { control, handleSubmit, reset } = useForm();
  const data = [
    { label: "Mário Pelota", value: 55, color: "#FFD700" },
    { label: "João sem Braço", value: 20, color: "#C0C0C0" },
    { label: "Raul Gil", value: 18, color: "#cd7f32" },
    { label: "Paula Fernandes", value: 15, color: "#FF6347" },
    { label: "Maiara Maraisa", value: 13, color: "#6B8E23" },
  ];
  VerifyToken();
  return (
    <Screen>
      <Sidebar/>
        <Content>
          <Form>
            <Controller
              name="start_date"
              control={control}
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
              defaultValue="19/04/2023"
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
        <BarChartComponent data={data} />
        <p style={{display: 'flex', justifyContent: 'center'}}>Top 5 - Leitura | Período: **/**/**** à **/**/**** </p>
      </Content>
    </Screen>
  );
}

export default TopFive;