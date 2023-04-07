import React, { useState, useEffect } from 'react';
import Sidebar from '../../components/sidebar/Sidebar';
import api from '../../global/services/api';
import { Screen } from '../../global/styles/Screen';
import { Content, Input, Form, TableCard, Select, Option } from './Components';

import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { VerifyToken } from '../../global/hooks/VerifyToken';
import { Controller, useForm } from 'react-hook-form';
import { TextField, Button } from '@material-ui/core';
import { GetAllLoans, PutLoan } from '../../global/hooks/Loans';
import { IStudent } from '../../components/interfaces/IStudent';
import { IBook } from '../../components/interfaces/IBook';
import { ILoan } from '../../components/interfaces/ILoan';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Devolutions() {
  VerifyToken();
  const { control, handleSubmit, reset } = useForm<ILoan>();
  const [students, setStudents]: any = useState([{}]);
  const addedStudents: { [key: string]: boolean } = {};
  const [selectBook, setSelectBook] = useState(false);
  const [loans, setLoans]: any = useState([{}]);
  const [books, setBooks]: any = useState([{}]);
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

  const onSubmit = async (data) => {
    console.log(data)
    //const updatedLoan = await PutLoan(data);
    //setLoans([...loans, newLoan]);
    //setBooks(books.filter((item) => item.id !== data.book));
    reset();
    //setCards(true);
    //setRegisterLoan(false);
    //setlistLoans(false);

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
      </Content>
    </Screen>
  );
}

export default Devolutions;