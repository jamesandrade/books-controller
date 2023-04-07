import React, { useState, useEffect } from 'react';
import Sidebar from '../../components/sidebar/Sidebar';
import { Screen } from '../../global/styles/Screen';
import { Content, Form, TableCard, Option, CardContainer, Card } from './Components';
import LibraryAddIcon from '@mui/icons-material/LibraryAdd';
import ListAltSharpIcon from '@mui/icons-material/ListAltSharp';

import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { VerifyToken } from '../../global/api/VerifyToken';
import { Controller, useForm } from 'react-hook-form';
import { TextField, Button } from '@material-ui/core';
import { GetAllLoans, PutLoan } from '../../global/api/Loans';
import { IStudent } from '../../components/interfaces/IStudent';
import { IBook } from '../../components/interfaces/IBook';
import { ILoan } from '../../components/interfaces/ILoan';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {  useMediaQuery } from '@mui/material';

function Devolutions() {
  VerifyToken();
  const isSmallScreen = useMediaQuery('(max-width:850px)');
  const { control, handleSubmit, reset, setValue } = useForm<ILoan>();
  const [students, setStudents]: any = useState([{}]);
  const addedStudents: { [key: string]: boolean } = {};
  const [selectBook, setSelectBook] = useState(false);
  const [loans, setLoans]: any = useState([{}]);
  const [books, setBooks]: any = useState([{}]);
  const [registerDevolution, setRegisterDevolution] = useState(false);
  const [listDevolutions, setlistDevolutions] = useState(false);
  const [cards, setCards] = useState(true);
  const reasons = [
    {reason : "Não gostou do Livro", id: 1},
    {reason: "Terminou a Leitura", id: 2},
    {reason: "Expirou o prazo para devolução", id: 3}
  ]

  useEffect(() => {
    async function fetchLoans() {
      try {
        const loans = await GetAllLoans();
        let studentsList: IStudent[] = []
        loans.forEach((loan: any) => {
          if (!loan.returned && loan.student && !addedStudents[loan.student.name]) {
            studentsList.push(loan?.student);
            addedStudents[loan.student.name] = true;
          }
        })
        setStudents(studentsList);
        setLoans(loans);
      } catch (error) {
        console.error(error);
      }
    }
    fetchLoans();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function fetchBooks (student: IStudent) {
    let booksList: IBook[] = [];
    loans.forEach((loan: any) => {
      if(!loan.returned && loan.student && loan.student.id === student.id){
        booksList.push(loan.book);
      }
    });
    setBooks(booksList);
  }
  const updateValue = (fieldName, value) => {
    setValue(fieldName, value);
  };
  const onSubmit = async (data) => {
    const updatedLoan = await PutLoan(data);
    let loansList = loans;
    const index = loansList.findIndex((loan: any) => loan.id === data.id);
    if (index !== -1) {
      loansList[index] = updatedLoan;
    }

    setLoans(loansList)
    setBooks([])
    let studentsList: IStudent[] = []
    loans.forEach((loan: any) => {
      if (!loan.returned && loan.student && !addedStudents[loan.student.name]) {
        studentsList.push(loan?.student);
        addedStudents[loan.student.name] = true;
      }
    })
    setStudents(studentsList);
    reset();
    setCards(true);
    setRegisterDevolution(false);
    setlistDevolutions(false);

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
        { cards &&
          <CardContainer>
            <Card onClick={() => {
              if (registerDevolution){
                setRegisterDevolution(false);
              } else {
                setlistDevolutions(false);
                setRegisterDevolution(true);
                setCards(false);
              }
            }}>
              <LibraryAddIcon style={{fontSize: "1.25rem"}} />
              Cad. Devolução
            </Card>
            <Card onClick={() => {
              if (listDevolutions){
                setlistDevolutions(false);
              } else {
                setRegisterDevolution(false);
                setlistDevolutions(true);
                setCards(false);
              }
            }}>
              <ListAltSharpIcon style={{fontSize: "1.25rem"}} />
              Listar Devoluções
            </Card>
          </CardContainer>
        }
        {!cards && isSmallScreen &&
          <p
            style={{color: "#1976d2"}}
            onClick={() => {
            setRegisterDevolution(false);
            setlistDevolutions(false);
            setCards(true);
          }}>
            Voltar
          </p>
        }
        <Form onSubmit={handleSubmit(onSubmit)}
          style={
            isSmallScreen ? (registerDevolution ? {display: 'flex'} :
            {display: 'none'}) : {display: 'flex'}}
        >
          <Controller
            name="student"
            control={control}
            rules={{ required: true }}
            defaultValue=""
            render={({ field }) => (
              <TextField {...field}
                onChangeCapture={(e)=> {
                  const target = e.target as HTMLInputElement;
                  const studentId = target.value;
                  const selectedStudent = students.find((student: IStudent) => student.id === studentId);
                  fetchBooks(selectedStudent);
                  setSelectBook(true);
                }}
                sx={{ mb: 2, mt: 2 }}
                select
                label="Aluno"
                SelectProps={{
                  native: true,
                }}
              >
                <Option disabled style={{display: "none"}}></Option>
                  {students.map((option) => (
                    option.id &&
                      <Option
                        key={option.id}
                        value={option.id}
                      >
                        {option?.name} - {option?.year} {option?.team} {option?.period}
                      </Option>
                  ))}
              </TextField>
            )}
          />
          <Controller
            name="book"
            control={control}
            rules={{ required: true }}
            defaultValue=""
            render={({ field }) => (
              <TextField {...field}
                onChangeCapture={(e)=> {
                  const target = e.target as HTMLInputElement;
                  const bookId = target.value;
                  const selectedLoan = loans.find((loan: any) => loan.book.id === bookId);
                  selectedLoan.id &&
                    updateValue('returned', true);
                    updateValue('id', selectedLoan.id);
                }}
                sx={{ mb: 2, mt: 2 }}
                select
                disabled={!selectBook}
                label="Livro"
                SelectProps={{
                  native: true,
                }}
              >
                <Option disabled style={{display: "none"}}></Option>
                  {books.map((option) => (
                    option.id &&
                      <Option
                        key={option.id}
                        value={option.id}
                      >
                        {option?.title} - {option?.serial}
                      </Option>
                  ))}
              </TextField>
            )}
          />
          <Controller
            name="returned_at"
            control={control}
            defaultValue={new Date().toISOString().substr(0, 10)}
            rules={{ required: true }}
            render={({ field }) => (
              <TextField
                label="Data de Devolução"
                variant="outlined"
                margin="normal"
                disabled={!selectBook}
                sx={{ mb: 2 }}
                type="date"
                {...field}
              />
            )}
          />
          <Controller
            name="reason_devolution"
            control={control}
            rules={{ required: true }}
            render={({ field }) => (
              <TextField {...field}
                sx={{ mb: 2, mt: 2 }}
                select
                defaultValue=""
                disabled={!selectBook}
                label="Razão"
                SelectProps={{
                  native: true,
                }}
              >
                <Option disabled style={{display: "none"}}></Option>
                { reasons?.map((period) => (
                  <Option
                    key={period.id}
                    value={period?.id}
                  >
                    {period?.reason}
                  </Option>
                ))}
              </TextField>
            )}
          />
          <Button
            sx={{ mb: 2 }}
            style={{ marginTop: '1rem', width: '4rem' }}
            type="submit"
            size="large"
            variant="contained"
          >
            <AddCircleOutlineIcon/>
          </Button>
        </Form>
        <TableCard
          style={isSmallScreen && !listDevolutions ? {display: 'none'} : {display: 'flex'}}
        >
          <TableContainer component={Paper}>
            <Table style={{ tableLayout: 'fixed' }} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell align="left">Nome</TableCell>
                  <TableCell align="left">Livro</TableCell>
                  <TableCell align="left">Data de Devolução</TableCell>
                  <TableCell align="left">Razão</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {loans.map((row) => (
                  row.returned &&
                    <TableRow
                      key={row.id}
                      sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                    >
                    <TableCell component="th" scope="row" align="left">
                      {row?.student?.name}
                    </TableCell>
                    <TableCell component="th" scope="row" align="left">
                      {row?.book?.title} - {row?.book?.serial}
                    </TableCell>
                    <TableCell align="left">{new Date(row?.returned_at).toLocaleDateString('pt-br')}</TableCell>
                    <TableCell component="th" scope="row" align="left">
                      {reasons.find(reason => reason.id === row?.reason_devolution)?.reason}
                    </TableCell>
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

export default Devolutions;