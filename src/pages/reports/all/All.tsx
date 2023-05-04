import { Controller, useForm } from 'react-hook-form';
import Sidebar from '../../../components/sidebar/Sidebar';
import NorthIcon from '@mui/icons-material/North';
import SouthIcon from '@mui/icons-material/South';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { Screen } from '../../../global/styles/Screen';
import { Content, Form, TableCard } from './Components';
import { VerifyToken } from '../../../global/api/VerifyToken';
import { useEffect, useState } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { GetTopAll } from '../../../global/api/Reports';
function All(){
    VerifyToken();
    const currentYear = new Date().getFullYear();
    const defaultStartDate = `${currentYear}-01-01`;
    const defaultEndDate = `${currentYear}-12-31`;
    const [tops, setTops]: any = useState([]);
    const [teamAsc, setTeamAsc] = useState(false);
    const [teamDesc, setTeamDesc] = useState(false);
    const [periodAsc, setPeriodAsc] = useState(false);
    const [periodDesc, setPeriodDesc] = useState(false);
    const [booksAsc, setBooksAsc] = useState(false);
    const [booksDesc, setBooksDesc] = useState(true);
    const { control, handleSubmit } = useForm();
    useEffect(() => {
        async function fetchTops() {
          try {
            const tops = await GetTopAll(defaultStartDate, defaultEndDate);
            setTops(tops);
          } catch (error) {
            console.error(error);
          }
        }
        fetchTops();
      }, []);
      function getPeriodValue(period: string): number {
        switch (period) {
          case "Matutino":
            return 1;
          case "Vespertino":
            return 2;
          case "Noturno":
            return 3;
          default:
            return 0;
        }
      }
      function orderByTeamDesc(a, b) {
        const regex = /(\d+)\D+(\w+)/;
        const [, aNumber, aLetter] = a.student?.registration?.team?.match(regex);
        const [, bNumber, bLetter] = b.student?.registration?.team?.match(regex);
        const aNumberInt = parseInt(aNumber, 10);
        const bNumberInt = parseInt(bNumber, 10);
        if (aNumberInt > bNumberInt) {
          return -1;
        } else if (aNumberInt < bNumberInt) {
          return 1;
        } else {
          if (aLetter > bLetter) {
            return -1;
          } else if (aLetter < bLetter) {
            return 1;
          } else {
            return 0;
          }
        }
      }
    function orderByTeamAsc(a, b) {
        const regex = /(\d+)\D+(\w+)/;
        const [, aNumber, aLetter] = a.student?.registration?.team?.match(regex);
        const [, bNumber, bLetter] = b.student?.registration?.team?.match(regex);
        const aNumberInt = parseInt(aNumber, 10);
        const bNumberInt = parseInt(bNumber, 10);
        if (aNumberInt < bNumberInt) {
          return -1;
        } else if (aNumberInt > bNumberInt) {
          return 1;
        } else {
          if (aLetter < bLetter) {
            return -1;
          } else if (aLetter > bLetter) {
            return 1;
          } else {
            return 0;
          }
        }
      }
    function sortArray(value){
        if(value === 1){
            const orderedData = tops.sort((a, b) => orderByTeamDesc(a, b));
            setTops(orderedData);
        }
        else if (value === 2){
            const orderedData = tops.sort((a, b) => orderByTeamAsc(a, b));
            setTops(orderedData);
        }
        else if (value === 3){
            let DescPeriods = tops.sort((a, b) => {
                const periodA = getPeriodValue(a.student.registration.period);
                const periodB = getPeriodValue(b.student.registration.period);
                return periodB - periodA;
                }
            );
            setTops(DescPeriods);
        }
        else if (value === 4){
            let ascPeriods = tops.sort((a, b) => {
                const periodA = getPeriodValue(a.student.registration.period);
                const periodB = getPeriodValue(b.student.registration.period);
                return periodA - periodB;
                }
            );
            setTops(ascPeriods);
        }
        else if(value === 5){
            let descBooks = tops.sort((a, b) => a.read_books - b.read_books);
            console.log(descBooks);
            setTops(descBooks);
        }
        else if (value === 6){
            let ascBooks = tops.sort((a, b) => b.read_books - a.read_books);
            console.log(ascBooks);
            setTops(ascBooks);
        }
    }

      const onSubmit = async (data: any) => {
        if (data.start_date <= data.end_date){
          const tops = await GetTopAll(data.start_date, data.end_date);
          setTops(tops);
        }
      }
    return(
        <Screen>
            <Sidebar/>
            <Content>
                <Form onSubmit={handleSubmit(onSubmit)}>
                    <Controller
                        name="start_date"
                        control={control}
                        defaultValue={defaultStartDate}
                        rules={{ required: true }}
                        render={({ field }) => (
                            <TextField
                                label="Início"
                                sx={{ mb: 2 }}
                                variant="outlined"
                                margin="normal"
                                type="date"
                                {...field}
                            />
                        )}
                    />
                    <Controller
                        name="end_date"
                        control={control}
                        defaultValue={defaultEndDate}
                        rules={{ required: true }}
                        render={({ field }) => (
                            <TextField
                                label="Fim"
                                sx={{ mb: 2 }}
                                variant="outlined"
                                margin="normal"
                                type="date"
                                {...field}
                            />
                        )}
                    />
                    <Button
                        style={{ marginTop: '1rem', width: '13rem'}}
                        sx={{ mb: 2 }}
                        type="submit"
                        size="large"
                        variant="contained"
                    >
                        Filtrar
                    </Button>
                </Form>
                <TableCard>
                <TableContainer component={Paper}>
                    <Table style={{ tableLayout: 'fixed' }} aria-label="simple table">
                            <TableHead>
                                <TableRow style={{userSelect: 'none'}}>
                                    <TableCell align="left">Aluno</TableCell>
                                    <TableCell
                                        align="left"
                                        style={{cursor: 'pointer'}}
                                        onClick={ () =>
                                            {
                                                if(!teamAsc && !teamDesc){
                                                    setTeamAsc(true);
                                                    setPeriodAsc(false);
                                                    setPeriodDesc(false);
                                                    setBooksAsc(false);
                                                    setBooksDesc(false);
                                                    sortArray(2);
                                                }
                                                else if(!teamAsc && teamDesc){
                                                    setTeamDesc(false);
                                                    setTeamAsc(true);
                                                    setPeriodAsc(false);
                                                    setPeriodDesc(false);
                                                    setBooksAsc(false);
                                                    setBooksDesc(false);
                                                    sortArray(2);
                                                }
                                                else {
                                                    setTeamAsc(false);
                                                    setTeamDesc(true);
                                                    setPeriodAsc(false);
                                                    setPeriodDesc(false);
                                                    setBooksAsc(false);
                                                    setBooksDesc(false);
                                                    sortArray(1);
                                                }
                                            }
                                        }
                                    >
                                        Ano
                                        <NorthIcon style={teamAsc? {fontSize: '0.75rem'}: {display: 'none'}}/>
                                        <SouthIcon style={teamDesc? {fontSize: '0.75rem'}: {display: 'none'}}/>
                                    </TableCell>
                                    <TableCell
                                        align="left"
                                        style={{cursor: 'pointer'}}
                                        onClick={ () =>
                                            {
                                                if(!periodAsc && !periodDesc){
                                                    setPeriodAsc(true);
                                                    setTeamAsc(false);
                                                    setTeamDesc(false);
                                                    setBooksAsc(false);
                                                    setBooksDesc(false);
                                                    sortArray(4);
                                                }
                                                else if(!periodAsc && periodDesc){
                                                    setPeriodAsc(true);
                                                    setPeriodDesc(false);
                                                    setTeamDesc(false);
                                                    setTeamAsc(false);
                                                    setBooksAsc(false);
                                                    setBooksDesc(false);
                                                    sortArray(4);
                                                }
                                                else {
                                                    setPeriodAsc(false);
                                                    setPeriodDesc(true);
                                                    setTeamAsc(false);
                                                    setTeamDesc(false);
                                                    setBooksAsc(false);
                                                    setBooksDesc(false);
                                                    sortArray(3);
                                                }
                                            }
                                        }
                                    >
                                        Período
                                        <NorthIcon style={periodAsc? {fontSize: '0.75rem'}: {display: 'none'}}/>
                                        <SouthIcon style={periodDesc? {fontSize: '0.75rem'}: {display: 'none'}}/>
                                    </TableCell>
                                    <TableCell
                                        align="left"
                                        style={{cursor: 'pointer'}}
                                        onClick={ () =>
                                            {
                                                if(!booksAsc && !booksDesc){
                                                    setBooksAsc(true);
                                                    setBooksDesc(false);
                                                    setPeriodAsc(false);
                                                    setPeriodDesc(false);
                                                    setTeamAsc(false);
                                                    setTeamDesc(false);
                                                    sortArray(5);
                                                }
                                                else if(!booksAsc && booksDesc){
                                                    setBooksAsc(true);
                                                    setBooksDesc(false);
                                                    setPeriodAsc(false);
                                                    setPeriodDesc(false);
                                                    setTeamDesc(false);
                                                    setTeamAsc(false);
                                                    sortArray(5);
                                                }
                                                else {
                                                    setBooksAsc(false);
                                                    setBooksDesc(true);
                                                    setPeriodAsc(false);
                                                    setPeriodDesc(false);
                                                    setTeamAsc(false);
                                                    setTeamDesc(false);
                                                    sortArray(6);
                                                }
                                            }
                                        }
                                    >
                                        Livros Lidos
                                        <NorthIcon style={booksAsc? {fontSize: '0.75rem'}: {display: 'none'}}/>
                                        <SouthIcon style={booksDesc? {fontSize: '0.75rem'}: {display: 'none'}}/>
                                    </TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {tops?.map((row: any) => (
                                    row?.student &&
                                <TableRow
                                    key={row?.student?.ra}
                                >
                                    <TableCell component="th" scope="row" align="left">
                                        {row?.student?.name}
                                    </TableCell>
                                    <TableCell component="th" scope="row" align="left">
                                        {row?.student?.registration?.team}
                                    </TableCell>
                                    <TableCell component="th" scope="row" align="left">
                                        {row?.student?.registration?.period}
                                    </TableCell>
                                    <TableCell component="th" scope="row" align="left">
                                        {row?.read_books}
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
export default All;