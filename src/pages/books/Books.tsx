import { useState, useEffect } from 'react';
import Sidebar from '../../components/sidebar/Sidebar';
import { Screen } from '../../global/styles/Screen';
import { Content, Form, TableCard } from './Components';
import { useForm, Controller } from "react-hook-form";
import { TextField, Button } from "@material-ui/core";
import { ToastContainer, toast } from 'react-toastify';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { VerifyToken } from '../../global/hooks/VerifyToken';
import { GetAllBooks, PostBook } from '../../global/hooks/Books';
import { IBook } from "../../components/interfaces/IBook";
import 'react-toastify/dist/ReactToastify.css';

function Books() {
  VerifyToken();
  const { control, handleSubmit, reset } = useForm<IBook>();
  const [books, setBooks]: any = useState([{}]);
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

  const onSubmit = async (data: IBook) => {
    const newBook = await PostBook(data);
    setBooks([...books, newBook]);
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
      <Sidebar />
      <ToastContainer />
      <Content>
        <Form onSubmit={handleSubmit(onSubmit)}>
          <Controller
            name="title"
            control={control}
            defaultValue=""
            rules={{ required: true }}
            render={({ field }) => (
              <TextField
                label="Título"
                variant="outlined"
                margin="normal"
                sx={{ mb: 2 }}
                autoFocus
                {...field}
              />
            )}
          />            
          <Controller
            name="author"
            control={control}
            defaultValue=""
            rules={{ required: true }}
            render={({ field }) => (
              <TextField
                label="Autor"
                variant="outlined"
                margin="normal"
                sx={{ mb: 2 }}
                autoFocus
                {...field}
              />
            )}
          />
          <Controller
            name="serial"
            control={control}
            defaultValue=""
            rules={{ required: true }}
            render={({ field }) => (
              <TextField
                label="Número de Série"
                variant="outlined"
                margin="normal"
                sx={{ mb: 2 }}
                autoFocus
                {...field}
              />
            )}
          />
          <Button
            sx={{ mb: 2 }}
            style={{ marginTop: '1rem' }}
            type="submit"
            size="small"
            variant="contained"
          >
            <AddCircleOutlineIcon/>
          </Button>        
        </Form>
        <TableCard>
          <TableContainer component={Paper}>
            <Table  sx={{ minWidth: 650 }} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell  align="left">Título</TableCell>
                  <TableCell  align="left">Autor</TableCell>
                  <TableCell  align="left">Número de Série</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {books?.map((row) => (
                  row?.title &&
                    <TableRow
                      key={row?.serial}
                      sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                    >
                    <TableCell component="th" scope="row" align="left">
                      {row?.title}
                    </TableCell>                     
                    <TableCell component="th" scope="row" align="left">
                      {row?.author}
                    </TableCell>
                    <TableCell align="left">{row?.serial}</TableCell>
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

export default Books;