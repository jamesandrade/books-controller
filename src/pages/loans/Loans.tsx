import React, { useState, useEffect } from 'react';
import Sidebar from '../../components/sidebar/Sidebar';
import { Screen } from '../../global/styles/Screen';
import { Form, Content, TableCard, Option, CardContainer, Card } from './Components';
import ListAltSharpIcon from '@mui/icons-material/ListAltSharp';
import LibraryAddIcon from '@mui/icons-material/LibraryAdd';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { VerifyToken } from '../../global/hooks/VerifyToken';
import 'react-toastify/dist/ReactToastify.css';
import { ILoan } from '../../components/interfaces/ILoan';
import { useMediaQuery } from '@mui/material';
import { Controller, useForm } from 'react-hook-form';
import { GetAllStudents } from '../../global/hooks/Students';
import { GetAllBooks } from '../../global/hooks/Books';
import { GetAllLoans, PostLoan } from '../../global/hooks/Loans';
import { ToastContainer, toast } from 'react-toastify';
import { TextField, Button } from '@material-ui/core';

function Loans() {
  VerifyToken();
  const isSmallScreen = useMediaQuery('(max-width:850px)');
  const { control, handleSubmit, reset, formState  } = useForm<ILoan>();
  const [loans, setLoans]: any = useState([{}]);
  const [students, setStudents]: any = useState([{}]);
  const [books, setBooks]: any = useState([{}]);
  const [registerLoan, setRegisterLoan] = useState(false);
  const [listLoans, setlistLoans] = useState(false);
  const [cards, setCards] = useState(true);

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

  useEffect(() => {
    async function fetchBooks() {
      try {
        const books = await GetAllBooks();
        setBooks(books);
      } catch (error) {
        console.error(error);
      }
    }
    fetchBooks();
  }, []);

  useEffect(() => {
    async function fetchLoans() {
      try {
        const loans = await GetAllLoans();
        setLoans(loans);
      } catch (error) {
        console.error(error);
      }
    }
    fetchLoans();
  }, []);

  const onSubmit = async (data: ILoan) => {
    const newLoan = await PostLoan(data);
    setLoans([...loans, newLoan]);
    setBooks(books.filter((item) => item.id !== data.book));
    reset();
    setCards(true);
    setRegisterLoan(false);
    setlistLoans(false);

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
              if (registerLoan){
                setRegisterLoan(false);
              } else {
                setlistLoans(false);
                setRegisterLoan(true);
                setCards(false);
              }
            }}>
              <LibraryAddIcon style={{fontSize: "1.25rem"}} />
              Cad. Empréstimo
            </Card>
            <Card onClick={() => {
              if (listLoans){
                setlistLoans(false);
              } else {
                setRegisterLoan(false);
                setlistLoans(true);
                setCards(false);
              }
            }}>
              <ListAltSharpIcon style={{fontSize: "1.25rem"}} />
              Listar Empréstimos
            </Card>
          </CardContainer>
        }
        {!cards && isSmallScreen &&
          <p
            style={{color: "#1976d2"}}
            onClick={() => {
            setRegisterLoan(false);
            setlistLoans(false);
            setCards(true);
          }}>
            Voltar
          </p>
        }
        <Form onSubmit={handleSubmit(onSubmit)}
          style={
          isSmallScreen ? (registerLoan ? {display: 'flex'} :
          {display: 'none'}) : {display: 'flex'}}
        >
          <Controller
            name="student"
            control={control}
            defaultValue=""
            rules={{ required: true }}
            render={({ field }) => (
              <TextField {...field}
                sx={{ mb: 2, mt: 2 }}
                select
                label="Aluno"
                SelectProps={{
                  native: true,
                }}
                error={Boolean(formState.errors?.student)}
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
            defaultValue=""
            rules={{ required: true }}
            render={({ field }) => (
              <TextField {...field}
                sx={{ mb: 2, mt: 2 }}
                select
                label="Livro"
                SelectProps={{
                  native: true,
                }}
                error={Boolean(formState.errors?.book)}
              >
                <Option disabled style={{display: "none"}}></Option>
                { books.map((option) => (
                  !option.is_loaned && option.id &&
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
            name="loan"
            control={control}
            defaultValue={new Date().toISOString().substr(0, 10)}
            rules={{ required: true }}
            render={({ field }) => (
              <TextField
                label="Data de Empréstimo"
                variant="outlined"
                margin="normal"
                sx={{ mb: 2 }}
                type="date"
                {...field}
              />
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
          style={isSmallScreen && !listLoans ? {display: 'none'} : {display: 'flex'}}
        >
          <TableContainer component={Paper}>
            <Table style={{ tableLayout: 'fixed' }} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell align="left">Nome</TableCell>
                  <TableCell align="left">Livro</TableCell>
                  <TableCell align="left">Data de Empréstimo</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {loans.map((row) => (
                  !row.returned &&
                    <TableRow
                      key={row.id}
                      sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                    >
                    <TableCell component="th" scope="row" align="left">
                      {row?.student?.name} - {row?.student?.year} {row?.student?.team}
                    </TableCell>
                    <TableCell component="th" scope="row" align="left">
                      {row?.book?.title} - {row?.book?.serial}
                    </TableCell>
                    <TableCell align="left">{new Date(row?.loan).toLocaleDateString('pt-br')}</TableCell>
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

export default Loans;