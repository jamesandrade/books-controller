import React, { useState, useEffect } from 'react';
import Sidebar from '../../components/sidebar/Sidebar';
import api from '../../global/services/api'
import { Screen } from '../../global/styles/Screen';
import { Content, Input, Button, Form, TableCard } from './Components';

import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

function Books() {
  const [books, setBooks]: any = useState([{}]);
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [serial, setSerial] = useState('');
  const token = localStorage.getItem('token');
  const data = { title, author, serial};
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
  const handleSubmit = (event: any) => {
    event.preventDefault();
    const token = localStorage.getItem('token');
    api.post('http://localhost:5000/books', data, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
    })
    .then((response) => {
      setBooks([...books, response.data])
      console.log(books)
    })
    .catch(error => console.error(error));
  };
  return (
    <Screen>
      <Sidebar/>
        <Content>
          <Form onSubmit={handleSubmit}>
            <Input placeholder='Título'
              value={title}
              id="name"
              onChange={(event) => setTitle(event.target.value)}
            />
            <Input placeholder='Autor'
              value={author}
              id="name"
              onChange={(event) => setAuthor(event.target.value)}
            />
            <Input placeholder='Número de Série'
              value={serial}
              id="class"
              onChange={(event) => setSerial(event.target.value)}
            />
            <Button type="submit"><AddCircleOutlineIcon/></Button>
          </Form>
        <TableCard>
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell align="left">Título</TableCell>
                  <TableCell align="left">Autor</TableCell>
                  <TableCell align="left">Número de Série</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {books.map((row) => (
                  row.title &&
                    <TableRow
                      key={row?.title}
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