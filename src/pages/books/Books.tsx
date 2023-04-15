import { useState, useEffect } from 'react';
import Sidebar from '../../components/sidebar/Sidebar';
import { Screen } from '../../global/styles/Screen';
import { Content, Form, TableCard, CardContainer, Card } from './Components';
import { useForm, Controller } from "react-hook-form";
import { useMediaQuery } from '@mui/material';
import { ToastContainer, toast } from 'react-toastify';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import PostAddOutlinedIcon from '@mui/icons-material/PostAddOutlined';
import ListAltSharpIcon from '@mui/icons-material/ListAltSharp';
import EditIcon from '@mui/icons-material/Edit';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { VerifyToken } from '../../global/api/VerifyToken';
import { GetAllBooks, PostBook } from '../../global/api/Books';
import { IBook } from "../../components/interfaces/IBook";
import 'react-toastify/dist/ReactToastify.css';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

function Books() {
  VerifyToken();
  const isSmallScreen = useMediaQuery('(max-width:850px)');
  const { control, handleSubmit, reset } = useForm<IBook>();
  const [books, setBooks]: any = useState([{}]);
  const [registerBook, setRegisterBook] = useState(false);
  const [listBooks, setlistBooks] = useState(false);
  const [cards, setCards] = useState(true);

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
    setCards(true);
    setRegisterBook(false);
    setlistBooks(false);

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
      <Content>
        <ToastContainer />
        { cards &&
          <CardContainer>
            <Card onClick={() => {
              if (registerBook){
                setRegisterBook(false);
              } else {
                setlistBooks(false);
                setRegisterBook(true);
                setCards(false);
              }
            }}>
              <PostAddOutlinedIcon style={{fontSize: "1.25rem"}} />
              Adicionar Livro
            </Card>
            <Card onClick={() => {
              if (listBooks){
                setlistBooks(false);
              } else {
                setRegisterBook(false);
                setlistBooks(true);
                setCards(false);
              }
            }}>
              <ListAltSharpIcon style={{fontSize: "1.25rem"}} />
              Listar Livros
            </Card>
          </CardContainer>
        }
        {!cards && isSmallScreen &&
          <p
            style={{color: "#1976d2"}}
            onClick={() => {
            setRegisterBook(false);
            setlistBooks(false);
            setCards(true);
          }}>
            Voltar
          </p>
        }

        <Form onSubmit={handleSubmit(onSubmit)}
          style={
            isSmallScreen ? (registerBook ? {display: 'flex'} :
              {display: 'none'}) : {display: 'flex'}}
        >
          <Controller
            name="title"
            control={control}
            defaultValue=""
            rules={{ required: true }}
            render={({ field }) => (
              <TextField
                label="Título"
                sx={{ mb: 2 }}
                variant="outlined"
                margin="normal"
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
                sx={{ mb: 2 }}
                variant="outlined"
                margin="normal"
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
                sx={{ mb: 2 }}
                variant="outlined"
                margin="normal"
                {...field}
              />
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
          style={isSmallScreen && !listBooks ? {display: 'none'} : {display: 'flex'}}
        >
          <TableContainer component={Paper}>
            <Table style={{ tableLayout: 'fixed' }} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell  align="left">Título</TableCell>
                  <TableCell align="left">Autor</TableCell>
                  <TableCell align="left">Número de Série</TableCell>
                  <TableCell align="left">Opções</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {books?.map((row) => (
                  row?.title &&
                    <TableRow
                      key={row?.serial}
                    >
                    <TableCell component="th" scope="row" align="left">
                      {row?.title}
                    </TableCell>
                    <TableCell component="th" scope="row" align="left">
                      {row?.author}
                    </TableCell>
                    <TableCell component="th" scope="row" align="left">
                      {row?.serial}
                    </TableCell>
                    <TableCell
                      align="left"
                      >
                        <EditIcon />
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

export default Books;