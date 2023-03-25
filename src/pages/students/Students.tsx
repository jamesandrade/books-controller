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

function Students() {
  const [name, setName] = useState('');
  const [students, setStudents]: any = useState([{}]);
  const [year, setYear] = useState('');
  const [team, setTeam] = useState('');
  const [period, setPeriod] = useState('');
  const token = localStorage.getItem('token');
  const data = { name, year, team,  period};
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
  })
  const handleSubmit = (event: any) => {
    event.preventDefault();
    const token = localStorage.getItem('token');
    api.post('http://localhost:5000/students', data, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
    })
    .then((response) => {
      setStudents([...students, response.data])
      console.log(students)
    })
    .catch(error => console.error(error));
  };
  return (
    <Screen>
      <Sidebar/>
        <Content>
          <Form onSubmit={handleSubmit}>
            <Input placeholder='Nome'
              value={name}
              id="name"
              onChange={(event) => setName(event.target.value)}
            />
            <Input placeholder='Ano'
              value={year}
              id="name"
              onChange={(event) => setYear(event.target.value)}
            />
            <Input placeholder='Turma'
              value={team}
              id="class"
              onChange={(event) => setTeam(event.target.value)}
            />
            <Input placeholder='Período'
              value={period}
              id="period"
              onChange={(event) => setPeriod(event.target.value)}
            />
            <Button type="submit"><AddCircleOutlineIcon/></Button>
          </Form>
        <TableCard>
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
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