import React, { useState, useEffect } from 'react';
import Sidebar from '../../components/sidebar/Sidebar';
import { Screen } from '../../global/styles/Screen';
import { Form, Content, TableCard, Option, CardContainer, Card } from './Components';
import ListAltSharpIcon from '@mui/icons-material/ListAltSharp';
import LibraryAddIcon from '@mui/icons-material/LibraryAdd';
import DisabledByDefaultIcon from '@mui/icons-material/DisabledByDefault';
import { btoa } from 'js-base64';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { VerifyToken } from '../../global/api/VerifyToken';
import 'react-toastify/dist/ReactToastify.css';
import { ILoan } from '../../components/interfaces/ILoan';
import { Autocomplete, useMediaQuery } from '@mui/material';
import { Controller, useForm } from 'react-hook-form';
import { GetAllStudents } from '../../global/api/Students';
import { GetAllBooks } from '../../global/api/Books';
import { GetAllLoans, PostLoan } from '../../global/api/Loans';
import { ToastContainer, toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Modal from 'react-modal';
Modal.setAppElement('#root');
const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    backgroundColor: '#fff',
    border: '1px solid #ccc',
    borderRadius: '4px',
    outline: 'none',
    padding: '20px',
    width: '31.25rem',
    height: '31.25rem',
    fontFamily: 'Roboto, sans-serif'
  },
  overlay: {
    backgroundColor: 'rgba(0, 0, 0, 0.5)'
  }
};

const customStylesSmallScreen = {
  content: {
    top: '25rem',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    backgroundColor: '#fff',
    border: '1px solid #ccc',
    borderRadius: '4px',
    outline: 'none',
    width: '20rem',
    height: '29rem',
    fontFamily: 'Roboto, sans-serif'
  },
  overlay: {
    backgroundColor: 'rgba(0, 0, 0, 0.5)'
  }
};
function Loans() {
  VerifyToken();
  const navigate = useNavigate();
  const isSmallScreen = useMediaQuery('(max-width:850px)');
  const { control, handleSubmit, reset, formState  } = useForm<ILoan>();
  const [loans, setLoans]: any = useState([{}]);
  const [students, setStudents]: any = useState([{}]);
  const [filteredStudents, setFilteredStudents]: any = useState([{}]);
  const [bookSelected, setBookSelected] = useState(false);
  const [books, setBooks]: any = useState([{}]);
  const [registerLoan, setRegisterLoan] = useState(false);
  const [listLoans, setlistLoans] = useState(false);
  const [cards, setCards] = useState(true);
  const [isOpen, setIsOpen] = useState(false);
  const [selectedStudent, setSelectedStudent]: any = useState(false);
  function openModal() {
    setIsOpen(true);
  }
  function closeModal() {
    setIsOpen(false);
  }

  useEffect(() => {
    async function fetchStudents() {
      try {
        let students = await GetAllStudents();
        setStudents(students);
        students = students.map(item => ({
          label: `${item.pending? "* ": ""} ${item.ra} - ${item.name}`, id: item.id }));
        setFilteredStudents(students)
      } catch (error) {
        console.error(error);
      }
    }
    fetchStudents();
  }, []);

  useEffect(() => {
    async function fetchBooks() {
      try {
        let books = await GetAllBooks();
        books = books.filter(item => !item.is_loaned)
        .map(item => ({ label: `${item.serial} - ${item.title}`, id: item.id }));
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

  function verifyIsPending(query: any) {
    const obj = students.find(obj => obj.id === query.id);
    setSelectedStudent(obj);
    if(obj?.pending === true) {
      return openModal();
    }
  }
  const onSubmit = async (data: any) => {
    data.student = data.student.id
    data.book = data.book.id
    console.log(data)
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
        <Modal
          isOpen={isOpen}
          onRequestClose={closeModal}
          contentLabel="Modal"
          style={isSmallScreen? customStylesSmallScreen: customStyles}
        >
          <div
            style={{display: 'flex', flexDirection: 'column', gap:'1rem', alignItems: 'end'}}
          >
            <DisabledByDefaultIcon
              style={{cursor: "pointer"}}
              onClick={closeModal}
            />
            <div
              style={{display: 'flex', flexDirection: 'column', gap:'1rem', alignItems: 'start'}}
            >
               <p style={{color: 'red'}}>Pendente de Atualização</p>
               <br/>
               <p>Para prosseguir com o empréstimo de livro para o aluno {selectedStudent.name}, por favor, atualize os dados cadastrais!</p>
               <br/>
              <Button
                type="submit"
                size="large"
                variant="contained"
                onClick={() => {
                  let ra = btoa(selectedStudent?.ra);
                  navigate(`/students/edit/${ra}`)
                }}
              >
                Atualizar
              </Button>
            </div>
          </div>
        </Modal>
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
              <Autocomplete
                {...field}
                disablePortal
                freeSolo
                disableClearable
                id="combo-box-demo"
                options={filteredStudents}
                getOptionLabel={(option: any) => option.label || ""}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label={isOpen ? "": "Aluno"}
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
                        setSelectedStudent(false);
                      }
                    }}
                  />
                )}
                onChange={(event, value) => {
                  field.onChange(value);
                  verifyIsPending(value);
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
                    label={isOpen ? "": "Livro"}
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
                        setBookSelected(false);
                      }
                    }}
                  />
                )}
                onChange={(event, value) => {
                  setBookSelected(true);
                  field.onChange(value);
                }}
              />
            )}
          />
          <Controller
            name="loan"
            control={control}
            defaultValue={new Date().toISOString().substr(0, 10)}
            rules={{ required: true }}
            render={({ field }) => (
              <TextField
                label={isOpen ? "" : "Data de Empréstimo"}
                sx={{ mb: 2 }}
                variant="outlined"
                margin="normal"
                type="date"
                {...field}
              />
            )}
          />
          <Button
            style={{ marginTop: '1rem', width: '4rem' }}
            sx={{ mb: 2 }}
            type="submit"
            size="large"
            disabled={!selectedStudent || selectedStudent.pending || !bookSelected}
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
                    <TableCell align="left">
                      {row?.loan &&
                        row.loan
                          .split(" ")[1]
                          .replace(",", "")
                          .concat("/")
                          .concat((new Date(row.loan)).getUTCMonth() < 9 ? "0" + ((new Date(row.loan)).getUTCMonth() + 1) : ((new Date(row.loan)).getUTCMonth() + 1))
                          .concat("/")
                          .concat((new Date(row.loan)).getUTCFullYear())
                      }
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

export default Loans;