import  { useState, useEffect } from 'react';
import Sidebar from '../../components/sidebar/Sidebar';
import { Screen } from '../../global/styles/Screen';
import { Content, Form, TableCard, Option, Card, CardContainer } from './Components';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import PersonAddAltOutlinedIcon from '@mui/icons-material/PersonAddAltOutlined';
import ArrowBackSharpIcon from '@mui/icons-material/ArrowBackSharp';
import ListAltSharpIcon from '@mui/icons-material/ListAltSharp';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { VerifyToken } from '../../global/api/VerifyToken';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import { IStudent } from '../../components/interfaces/IStudent';
import { useForm, Controller } from "react-hook-form";
import { GetAllStudents, PostStudent } from '../../global/api/Students';
import { ToastContainer, toast } from 'react-toastify';
import { Typography  } from '@material-ui/core';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import InputMask from "react-input-mask";

function Students() {
  VerifyToken();
  const { control, handleSubmit, reset } = useForm<IStudent>();

  const [registerStudent, setRegisterStudent] = useState(false);
  const [listStudents, setlistStudents] = useState(false);
  const [cards, setCards] = useState(true);
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
    reset({ terms: false });
    const newsStudent = await PostStudent(data);
    setStudents((prevStudents: any) => [...prevStudents, newsStudent]);
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
              if (registerStudent){
                setRegisterStudent(false);
              } else {
                setlistStudents(false);
                setRegisterStudent(true);
                setCards(false);
              }
            }}>
              <PersonAddAltOutlinedIcon style={{fontSize: "1.25rem"}} />
              Adicionar Aluno
            </Card>
            <Card onClick={() => {
              if (listStudents){
                setlistStudents(false);
              } else {
                setRegisterStudent(false);
                setlistStudents(true);
                setCards(false);
              }
            }}>
              <ListAltSharpIcon style={{fontSize: "1.25rem"}} />
              Listar Alunos
            </Card>
          </CardContainer>
        }
        {!cards &&
          <p
            style={{color: "#1976d2", display: 'flex', alignItems: 'center', cursor: "pointer"}}
            onClick={() => {
            setRegisterStudent(false);
            setlistStudents(false);
            setCards(true);
          }}>
            <ArrowBackSharpIcon/> Voltar
          </p>
        }
        <Form onSubmit={handleSubmit(onSubmit)}
        style={
          registerStudent? {display: 'flex'} : {display: 'none'}}
        >
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
                {...field}
              />
            )}
          />
          <Controller
            name="cpf"
            control={control}
            rules={{ required: false }}
            defaultValue=""
            render={({ field }) => (
              <InputMask
                mask="999.999.999-99"
                maskPlaceholder={null}
                value={field.value}
                onChange={field.onChange}
                onBlur={field.onBlur}
              >
                  <TextField
                    label="CPF"
                    variant="outlined"
                    margin="normal"
                    {...field} />
              </InputMask>
            )}
          />
          <Controller
            name="email"
            control={control}
            defaultValue=""
            rules={{ required: false }}
            render={({ field }) => (
              <TextField
                label="Email"
                variant="outlined"
                margin="normal"
                type="email"
                {...field}
              />
            )}
          />
          <Controller
            name="phone"
            control={control}
            defaultValue=""
            rules={{ required: false }}
            render={({ field }) => (
              <InputMask
                mask="(99) 9.9999-9999"
                maskPlaceholder={null}
                value={field.value}
                onChange={field.onChange}
                onBlur={field.onBlur}
              >
                  <TextField
                    label="Telefone"
                    variant="outlined"
                    margin="normal"
                    {...field}
                  />
              </InputMask>
            )}
          />
          <Controller
            name="team"
            control={control}
            defaultValue=""
            rules={{ required: true }}
            render={({ field }) => (
              <TextField
                label="Série e Turma"
                variant="outlined"
                margin="normal"
                {...field}
              />
            )}
          />
          <Controller
            name="period"
            control={control}
            defaultValue=""
            rules={{ required: true }}
            render={({ field }) => (
              <TextField {...field}
                select
                sx={{mt: 2}}
                label="Período"
                SelectProps={{
                  native: true,
                }}
                //error={Boolean(formState.errors?.period)}
              >
                <Option disabled style={{display: "none"}}></Option>
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
          <Controller
            name="terms"
            control={control}
            defaultValue={false}
            rules={{ required: true }}
            render={({ field }) => (
              <FormControlLabel
                sx={{mt: 2}}
                style={{display: 'grid', gridAutoFlow: 'column'}}
                label={
                  <Typography variant="body1" style={{ fontSize: '12px' }}>
                    <strong>O titular</strong> autoriza a coleta e o processamento dos dados pessoais informados neste formulário para a finalidade de registro na base de dados e contato.
                  </Typography>
                }
                labelPlacement="end"
                control={
                  <Checkbox
                    sx={{ mr: '8px' }}
                    checked={field.value}
                    {...field}
                  />
                }
              />
              )}
          />
          <Button
            style={{ marginTop: '1rem', width: '4rem' }}
            type="submit"
            size="large"
            variant="contained"
          >
            <AddCircleOutlineIcon/>
          </Button>
        </Form>
        <TableCard
          style={!listStudents ? {display: 'none'} : {display: 'flex'}}
        >
          <TableContainer component={Paper}>
            <Table style={{ tableLayout: 'fixed' }} aria-label="simple table">
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