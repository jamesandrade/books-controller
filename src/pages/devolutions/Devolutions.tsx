import React, { useState, useEffect } from 'react';
import Sidebar from '../../components/sidebar/Sidebar';
import { Screen } from '../../global/styles/Screen';
import { Content, Form, TableCard, Option, CardContainer, Card } from './Components';
import LibraryAddIcon from '@mui/icons-material/LibraryAdd';
import ListAltSharpIcon from '@mui/icons-material/ListAltSharp';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import ArrowBackSharpIcon from '@mui/icons-material/ArrowBackSharp';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { VerifyToken } from '../../global/api/VerifyToken';
import { Controller, useForm } from 'react-hook-form';
import { GetAllLoans, PutLoan } from '../../global/api/Loans';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {  Autocomplete, useMediaQuery } from '@mui/material';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { GetAllStudentsWithLoan, GetBooksOfStudent } from '../../global/api/Devolutions';

function Devolutions() {
  VerifyToken();
  const isSmallScreen = useMediaQuery('(max-width:850px)');
  const { control, handleSubmit, reset } = useForm();
  const [students, setStudents]: any = useState([{}]);
  const [selectedStudent, setSelectedStudent] = useState(false);
  const [loans, setLoans]: any = useState([{}]);
  const [books, setBooks]: any = useState([]);
  const [registerDevolution, setRegisterDevolution] = useState(false);
  const [listDevolutions, setlistDevolutions] = useState(false);
  const [cards, setCards] = useState(true);
  const reasons = [
    {reason : "Não gostou do Livro", id: 1},
    {reason: "Terminou a Leitura", id: 2},
    {reason: "Expirou o prazo para devolução", id: 3}
  ]

  useEffect(() => {
    async function fetchStudents() {
      try {
        let students = await GetAllStudentsWithLoan();
        students = students.map(item => ({
          label: `${item.ra} - ${item.name}`, name: item.name, id: item.id, ra: item.ra }));
          setStudents(students);
        } catch (error) {
        console.error(error);
      }
    }
    fetchStudents();
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
  async function loadBooks(value) {
    let books = await GetBooksOfStudent(value?.ra);
    books = books.map(item => ({
      label: `${item?.book?.title} - ${item?.book?.serial}`, loan_id: item?.id, title: item?.book?.title, serial: item?.book?.serial }));
    setBooks(books);
    setSelectedStudent(true);
  }
  function isSimpleDate(str: string): boolean {
    const regex = /^\d{4}-\d{2}-\d{2}$/;
    return regex.test(str);
  }
  function formatDate(str: string): string {
    const parts = str.split('-');
    const year = parts[0];
    const month = parts[1];
    const day = parts[2];
    //const date = new Date(`${year}-${month}-${day}`);
    const formattedDate = `${day}/${month}/${year}`;
    return formattedDate;
  }
  const onSubmit = async (data: any) => {
    let loan: any = {};
    Object.assign(loan, data);
    data.student = data.student.id;
    data.id = data.book.loan_id;
    delete data.book;
    data.returned = true;
    loan.returned = true;
    await PutLoan(data);
    setLoans([...loans, loan]);
    try {
      let students = await GetAllStudentsWithLoan();
      students = students.map(item => ({
        label: `${item.ra} - ${item.name}`, name: item.name, id: item.id, ra: item.ra }));
        setStudents(students);
      } catch (error) {
      console.error(error);
    }
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
            style={{color: "#1976d2", display: 'flex', alignItems: 'center', cursor: "pointer"}}
            onClick={() => {
            setRegisterDevolution(false);
            setlistDevolutions(false);
            setCards(true);
          }}>
            <ArrowBackSharpIcon/> Voltar
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
            defaultValue=""
            rules={{ required: true }}
            render={({ field }) => (
              <Autocomplete
                {...field}
                disablePortal
                freeSolo
                disableClearable
                id="combo-box-demo"
                options={students}
                getOptionLabel={(option: any) => option.label || ""}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="Aluno"
                    sx={{
                      mb: 2,
                      mt: 2,
                      paddingRight: 0,
                    }}
                    InputProps={{
                      ...params.InputProps,
                      type: "search",

                    }}
                    onChange={(e)=>{
                      if(e.target.value === "" || !e.target.value){
                        setSelectedStudent(false);
                        field.onChange(null);
                      }

                    }}
                  />
                )}
                onChange={(event, value) => {
                  loadBooks(value)
                  field.onChange(value);
                }}
              />
            )}
          />
          <Controller
            name="book"
            control={control}
            defaultValue=""
            rules={{ required: true }}
            render={({ field }) => (
              <Autocomplete
                {...field}
                disablePortal
                freeSolo
                disableClearable
                id="combo-box-demo"
                options={books}
                getOptionLabel={(option: any) => option.label || ""}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="Livro"
                    disabled={!selectedStudent || students.length <= 0}
                    sx={{
                      mb: 2,
                      mt: 2,
                      paddingRight: 0,
                    }}
                    InputProps={{
                      ...params.InputProps,
                      type: "search",

                    }}
                    onChange={(e)=>{
                      if(e.target.value === "" || !e.target.value){
                        field.onChange(null);
                      }

                    }}
                  />
                )}
                onChange={(event, value) => {
                  field.onChange(value);
                }}
              />
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
                sx={{ mb: 2 }}
                variant="outlined"
                margin="normal"
                disabled={ students.length <= 0}
                type="date"
                {...field}
              />
            )}
          />
          <Controller
            name="reason_devolution"
            control={control}
            rules={{ required: true }}
            defaultValue=""
            render={({ field }) => (
              <TextField {...field}
                select
                sx={{ mb: 2, mt: 2 }}
                disabled={ students.length <= 0}
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
            style={{ marginTop: '1rem', width: '4rem' }}
            sx={{ mb: 2 }}
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
                {loans.map((row, index) => (
                  row.returned &&
                    <TableRow
                      key={index}
                    >
                    <TableCell component="th" scope="row" align="left">
                      {row?.student?.name}
                    </TableCell>
                    <TableCell component="th" scope="row" align="left">
                      {row?.book?.title} - {row?.book?.serial}
                    </TableCell>
                    <TableCell align="left">
                      { isSimpleDate(row?.returned_at) ? formatDate(row.returned_at) :
                        row.returned_at
                        .split(" ")[1]
                        .replace(",", "")
                        .concat("/")
                        .concat((new Date(row.returned_at)).getUTCMonth() < 9 ? "0" + ((new Date(row.returned_at)).getUTCMonth() + 1) : ((new Date(row.returned_at)).getUTCMonth() + 1))
                        .concat("/")
                        .concat((new Date(row.returned_at)).getUTCFullYear())
                      }
                    </TableCell>
                    <TableCell component="th" scope="row" align="left">
                      {reasons.find(reason => reason.id === parseInt(row?.reason_devolution, 10))?.reason}
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