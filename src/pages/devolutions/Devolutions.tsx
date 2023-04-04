import React, { useState, useEffect } from 'react';
import Sidebar from '../../components/sidebar/Sidebar';
import api from '../../global/services/api';
import { Screen } from '../../global/styles/Screen';
import { Content, Input, Button, Form, TableCard, Select, Option } from './Components';

import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { VerifyToken } from '../../global/hooks/VerifyToken';



function Devolutions() {
  VerifyToken();
  const [loans, setLoans]: any = useState([{}]);
  const [student, setStudent] = useState('');
  const [students, setStudents]: any = useState([{}]);
  const [book, setBook] = useState('');
  const [books, setBooks]: any = useState([{}]);
  const [selectDisabled, setSelectDisabled] = useState(true);

  const [loan, setLoan] = useState(new Date().toISOString().substr(0, 10));
  const [devolution, setDevolution] = useState('');

  const token = localStorage.getItem('token');
  const data = { student, book, loan};
  useEffect(() => {
    api.get('http://localhost:5000/students',{
        headers: {
          'Authorization': `Bearer ${token}`,
        },
    })
    .then((response) => {
      setStudents(response.data)
    })
    .catch(error => console.error(error));
  }, [])

  useEffect(() => {
    api.get('http://localhost:5000/books',{
        headers: {
          'Authorization': `Bearer ${token}`,
        },
    })
    .then((response) => {
      setBooks(response.data)
    })
    .catch(error => console.error(error));
  }, [])
  useEffect(() => {
    api.get('http://localhost:5000/loans',{
        headers: {
          'Authorization': `Bearer ${token}`,
        },
    })
    .then((response) => {
      setLoans(response.data)
    })
    .catch(error => console.error(error));
  }, [])
  const handleSelect = async (event: any) =>{
    await setStudent((prevState: any)=> {return event.target.value});
    console.log(student);
    if (student !== ''){
      setSelectDisabled(false);
    }
  }
  const handleSubmit = (event: any) => {
    event.preventDefault();
    const token = localStorage.getItem('token');
    api.post('http://localhost:5000/loans', data, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
    })
    .then((response) => {
      setLoans([...loans, response.data])
      setBooks([])
    })
    .catch(error => console.error(error));
  };
  return (
    <Screen>
      <Sidebar/>
        <Content>
          <Form onSubmit={handleSubmit}>
            <Select 
              onChange={handleSelect}
              value={student}
            >
              <Option value="" disabled selected>
                Selecione um aluno
              </Option>
              {loans
              .filter((obj, index, self) =>
              index === self.findIndex((o) => o.student?.id === obj.student?.id))
              .map((option) => (
                !option.returned &&
                  <Option key= {option?.id} value={option?.id}>
                    {option?.student?.name} - {option?.student?.year} {option?.student?.team} {option?.student?.period}
                  </Option>
              ))}
            </Select>
            <Select 
              value={book}
              disabled={selectDisabled}
              onChange={(event) => setBook(event.target.value)}
            >
              <Option value="" disabled selected>
                Selecione um livro
              </Option>
              {loans
              .map((option) => (
                !option.returned && option?.student?.id === student && 
                  <Option key= {option?.book?.title} value={option?.book?.id}>
                    {option?.book?.author} - {option?.book?.title} - {option?.book?.serial}
                  </Option>
              ))}
            </Select>
            <Input placeholder='Data de empréstimo'
              value={loan}
              disabled={selectDisabled}
              type="date"
              id="date-loan"
              name="date-loan"
              onChange={(event) => setLoan(event.target.value)}
            />
            <Button
              disabled={selectDisabled}
              type="submit">
                <AddCircleOutlineIcon/>
            </Button>
          </Form>
          <TableCard>
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
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
                      key={row?.id}
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

export default Devolutions;