import React, { useState, useEffect } from 'react';
import Sidebar from '../../components/sidebar/Sidebar';
import { Screen } from '../../global/styles/Screen';
import { Content, Form, TableCard, Option } from './Components';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { VerifyToken } from '../../global/hooks/VerifyToken';
import { FormControl, useMediaQuery } from '@mui/material';
import { IStudent } from '../../components/interfaces/IStudent';
import { useForm, Controller } from "react-hook-form";
import { GetAllStudents, PostStudent } from '../../global/hooks/Students';
import { ToastContainer, toast } from 'react-toastify';
import { TextField, Select, MenuItem, Button, InputLabel } from '@material-ui/core';

function Students() {
  VerifyToken();
  const isSmallScreen = useMediaQuery('(max-width:850px)');
  const { control, handleSubmit, reset } = useForm<IStudent>();

  const [students, setStudents]: any = useState([{}]);
  const periods = [
    {period : "Matutino", id: 1},
    {period: "Vespertino", id: 2},
    {period: "Noturno", id: 3}
  ]

  useEffect(() => {
    async function fetchStudents() {
      try {
        const students = await GetAllStudents();
        setStudents(students);
      } catch (error) {
        console.error(error);
      }
    }
    fetchStudents();
  }, []);

  const onSubmit = async (data: IStudent) => {
    const newsStudent = await PostStudent(data);
    setStudents((prevStudents: any) => [...prevStudents, newsStudent]);
    reset();
    toast.success('Registrado com Sucesso!', {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
  };
  return (
    <Screen>
      <Sidebar/>
        <Content>
        <ToastContainer />

        <Form onSubmit={handleSubmit(onSubmit)}>
          <Controller
            name="name"
            control={control}
            defaultValue=""
            rules={{ required: true }}
            render={({ field }) => (
              <TextField
                label="Nome"
                variant="outlined"
                margin="normal"
                sx={{ mb: 2 }}
                autoFocus
                {...field}
              />
            )}
          />
          <Controller
            name="year"
            control={control}
            defaultValue=""
            rules={{ required: true }}
            render={({ field }) => (
              <TextField
                label="Ano/Série"
                variant="outlined"
                margin="normal"
                sx={{ mb: 2 }}
                autoFocus
                {...field}
              />
            )}
          />
          <Controller
            name="team"
            control={control}
            defaultValue=""
            rules={{ required: true }}
            render={({ field }) => (
              <TextField
                label="Turma"
                variant="outlined"
                margin="normal"
                sx={{ mb: 2 }}
                autoFocus
                {...field}
              />
            )}
          />
          <Controller
            name="period"
            control={control}
            rules={{ required: true }}
            render={({ field }) => (
              <TextField {...field}
                sx={{ mb: 2, mt: 2 }}
                select
                defaultValue=""
                label="Período"
                SelectProps={{
                  native: true,
                }}
              >
                { periods?.map((period) => (
                  <Option
                    key={period.id}
                    value={period?.period}
                  >
                    {period?.period}
                  </Option>
              ))}
              </TextField>
            )}
          />
          <Button
            sx={{ mb: 2}}
            style={{ marginTop: '1rem', width: '4rem' }}
            type="submit"
            size="large"
            variant="contained"
          >
            <AddCircleOutlineIcon/>
          </Button>
          </Form>
        <TableCard>
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell align="left">Nome</TableCell>
                  <TableCell align="left">Ano</TableCell>
                  <TableCell align="left">Turma</TableCell>
                  <TableCell align="left">Período</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {students.map((row) => (
                  row.name &&
                    <TableRow
                      key={row?.name}
                      sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                    >
                    <TableCell component="th" scope="row" align="left">
                      {row?.name}
                    </TableCell>
                    <TableCell component="th" scope="row" align="left">
                      {row?.year}
                    </TableCell>
                    <TableCell align="left">{row?.team}</TableCell>
                    <TableCell align="left">{row?.period}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </TableCard>
      </Content>
    </Screen>
  );
}

export default Students;