import  React, { useState, useEffect } from 'react';
import Sidebar from '../../../components/sidebar/Sidebar';
import { Screen } from '../../../global/styles/Screen';
import { Content, TableCard } from './Components';
import WysiwygIcon from '@mui/icons-material/Wysiwyg';
import EditIcon from '@mui/icons-material/Edit';
import ArrowBackSharpIcon from '@mui/icons-material/ArrowBackSharp';
import BrandingWatermarkIcon from '@mui/icons-material/BrandingWatermark';
import GroupsIcon from '@mui/icons-material/Groups';
import BadgeSharpIcon from '@mui/icons-material/BadgeSharp';
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import SmartphoneIcon from '@mui/icons-material/Smartphone';
import EmailSharpIcon from '@mui/icons-material/EmailSharp';
import DisabledByDefaultIcon from '@mui/icons-material/DisabledByDefault';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { VerifyToken } from '../../../global/api/VerifyToken';
import { GetAllStudents } from '../../../global/api/Students';
import TextField from '@mui/material/TextField';
import { useNavigate } from 'react-router-dom';
import { btoa } from 'js-base64';
import { useMediaQuery } from '@mui/material';
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
function ListStudents() {
  VerifyToken();
  const navigate = useNavigate();
  const [students, setStudents]: any = useState([{}]);
  const [filteredStudents, setFilteredStudents]: any = useState([{}]);

  const [isOpen, setIsOpen] = useState(false);
  const [selectedStudent, setSelectedStudent]: any = useState({});
  function setFilter(query){
    if(query === ""){
      setFilteredStudents(students)
    }
    const filteredData = students.filter((item) => {
      return item.name.toLowerCase().includes(query.toLowerCase())
        | item.ra.toLowerCase().includes(query.toLowerCase())
        | item.registration.team.toLowerCase().includes(query.toLowerCase())
        | item.registration.period.toLowerCase().includes(query.toLowerCase())
    })
    setFilteredStudents(filteredData);
  }
  function openModal(student) {
    setSelectedStudent(student);
    setIsOpen(true);
  }
  function closeModal() {
    setIsOpen(false);
  }
  const isSmallScreen = useMediaQuery('(max-width:850px)');

  useEffect(() => {
    async function fetchStudents() {
      try {
        const students = await GetAllStudents();
        setStudents(students);
        setFilteredStudents(students)
      } catch (error) {
        console.error(error);
      }
    }
    fetchStudents();
  }, []);

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
              {selectedStudent && selectedStudent?.pending && <p style={{color: 'red'}}>Pendente de Atualização</p>}

              {selectedStudent &&(
              <>
                <div
                  style={{display: 'flex', flexDirection: 'row', gap:'1rem', alignItems: 'center'}}
                >
                  <AccountBoxIcon />
                  <p>{selectedStudent?.name}</p>
                </div>
                <div
                  style={{display: 'flex', flexDirection: 'row', gap:'1rem', alignItems: 'center'}}
                >
                  <BadgeSharpIcon />
                  <p>RA {selectedStudent?.ra}</p>
                </div>
                {selectedStudent?.phone &&
                  <div
                    style={{display: 'flex', flexDirection: 'row', gap:'1rem', alignItems: 'center'}}
                  >
                    <SmartphoneIcon />
                    <p>{selectedStudent?.phone}</p>
                  </div>
                }
                {selectedStudent?.email &&
                  <div
                    style={{display: 'flex', flexDirection: 'row', gap:'1rem', alignItems: 'center'}}
                  >
                    <EmailSharpIcon />
                    <p>{selectedStudent?.email}</p>
                  </div>
                }
                {selectedStudent?.cpf &&
                  <div
                    style={{display: 'flex', flexDirection: 'row', gap:'1rem', alignItems: 'center'}}
                  >
                    <BrandingWatermarkIcon />
                    <p>CPF {selectedStudent?.cpf}</p>
                  </div>
                }
                <div
                  style={{display: 'flex', flexDirection: 'row', gap:'1rem', alignItems: 'center'}}
                >
                  <GroupsIcon />
                  <p>{selectedStudent?.registration?.team} {selectedStudent?.registration?.period}</p>
                </div>
              </>
              )}
            </div>
          </div>
        </Modal>
          <p
            style={{color: "#1976d2", display: 'flex', alignItems: 'center', cursor: "pointer"}}
            onClick={() => {
            navigate("/students")
            }}
          >
            <ArrowBackSharpIcon/> Voltar
          </p>
        <TableCard
          style={{display: 'flex', flexDirection: 'column'}}
        >
          <TextField
            label={isOpen ? "": "Pesquisar"}
            variant="outlined"
            margin="normal"
            onChange={(event) => setFilter(event.target.value)}
          />
          <TableContainer component={Paper}>
            <Table style={{ tableLayout: 'fixed' }} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell align="left">RA</TableCell>
                  <TableCell align="left">Nome</TableCell>
                  <TableCell align="left">Turma</TableCell>
                  <TableCell align="left">Período</TableCell>
                  <TableCell align="left">Opções</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {filteredStudents.map((row) => (
                  row.name &&
                    <TableRow
                      key={row?.name}
                      sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                    >
                    <TableCell
                      style={row?.pending ? {color: 'red'} : {color: 'black'}}
                      component="th"
                      scope="row"
                      align="left"
                    >
                      {row?.pending &&
                        "* "
                      }
                      {row?.ra}
                    </TableCell>
                    <TableCell
                      style={row?.pending ? {color: 'red'} : {color: 'black'}}
                      component="th"
                      scope="row"
                      align="left"
                      >
                        {row?.name}
                    </TableCell>
                    <TableCell
                    style={row?.pending ? {color: 'red'} : {color: 'black'}}
                    component="th"
                    scope="row"
                    align="left"
                    >
                      {row?.registration?.team}
                    </TableCell>
                    <TableCell
                      style={row?.pending ? {color: 'red'} : {color: 'black'}}
                      align="left"
                      >
                        {row?.registration?.period}
                    </TableCell>
                    <TableCell
                      align="left"
                    >
                      <div
                        style={!isSmallScreen ? {display: 'flex', gap: '1rem'} : {}}
                      >
                        <WysiwygIcon
                          style={{cursor: 'pointer'}}
                          onClick={() => openModal(row)}
                        />
                        <EditIcon
                          style={{cursor: 'pointer'}}
                          onClick={() => {
                            let ra = btoa(row?.ra);
                            navigate(`/students/edit/${ra}`)
                          }}
                        />
                      </div>
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

export default ListStudents;