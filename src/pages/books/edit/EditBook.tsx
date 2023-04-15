import Sidebar from '../../../components/sidebar/Sidebar';
import { Screen } from '../../../global/styles/Screen';
import { Content, Form } from './Components';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import ArrowBackSharpIcon from '@mui/icons-material/ArrowBackSharp';
import { VerifyToken } from '../../../global/api/VerifyToken';
import { useForm, Controller } from "react-hook-form";
import { ToastContainer, toast } from 'react-toastify';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import { Base64 } from 'js-base64';
import { useEffect } from 'react';
import { GetOneBook, PutBook } from '../../../global/api/Books';
import { IBook } from '../../../components/interfaces/IBook';

function EditBook(props: any) {
  const navigate = useNavigate();
  VerifyToken();
  const { serial } = useParams();
  let serialDecoded: string = "";
  if (!serial || typeof serial !== 'string') {
    navigate("/books");
  }
  else {
    serialDecoded = Base64.decode(serial);
  }
  const { control, handleSubmit, reset, setValue } = useForm<IBook>();
  useEffect(() => {
    async function fetchBook() {
      try {
        const book = await GetOneBook(serialDecoded);
        setValue('serial', book?.serial);
        setValue('title', book?.title);
        setValue('author', book?.author);
        setValue('id', book?.id);

      } catch (error) {
        console.error(error);
      }
    }
    fetchBook();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onSubmit = async (data: IBook) => {
    await PutBook(data);
    reset();
    toast.success('Atualizado com Sucesso!', {
      position: "top-right",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
    setTimeout(() => {
      navigate(-1);
    },2000);
  };
  return (
    <Screen>
      <Sidebar/>
        <Content>
        <ToastContainer />
        <p
          style={{color: "#1976d2", display: 'flex', alignItems: 'center', cursor: "pointer"}}
          onClick={() => {
          navigate(-1)
          }}
        >
          <ArrowBackSharpIcon/> Voltar
        </p>
        <Form onSubmit={handleSubmit(onSubmit)}>
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
                {...field}
              />
            )}
          />
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
                {...field}
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
      </Content>
    </Screen>
  );
}

export default EditBook;