import Sidebar from '../../../components/sidebar/Sidebar';
import { Screen } from '../../../global/styles/Screen';
import { Content, Form, Option } from './Components';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import ArrowBackSharpIcon from '@mui/icons-material/ArrowBackSharp';
import { VerifyToken } from '../../../global/api/VerifyToken';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import { IStudent } from '../../../components/interfaces/IStudent';
import { useForm, Controller } from "react-hook-form";
import { GetOneStudent, PutStudent } from '../../../global/api/Students';
import { ToastContainer, toast } from 'react-toastify';
import { Typography  } from '@material-ui/core';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import InputMask from "react-input-mask";
import { useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import { Base64 } from 'js-base64';
import { useEffect } from 'react';

function EditStudents(props: any) {
  const navigate = useNavigate();
  VerifyToken();
  const { ra } = useParams();
  let raDecoded: string = "";
  if (!ra || typeof ra !== 'string') {
    navigate("/students");
  }
  else {
    raDecoded = Base64.decode(ra);
  }
  const { control, handleSubmit, reset, setValue } = useForm<IStudent>();

  useEffect(() => {
    async function fetchStudent() {
      try {
        const student = await GetOneStudent(raDecoded);
        setValue('name', student?.name)
        setValue('cpf', student?.cpf)
        setValue('email', student?.email)
        setValue('phone', student?.phone)
        setValue('team', student?.registration?.team)
        setValue('period', student?.registration?.period)
      } catch (error) {
        console.error(error);
      }
    }
    fetchStudent();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const periods = [
    {period : "Matutino", id: 1},
    {period: "Vespertino", id: 2},
    {period: "Noturno", id: 3}
  ]
  const onSubmit = async (data: IStudent) => {
    data.ra = raDecoded;
    await PutStudent(data);
    reset({ terms: false });
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
          <TextField
            label="RA"
            disabled={true}
            value={raDecoded}
            variant="outlined"
            margin="normal"
          />
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
      </Content>
    </Screen>
  );
}

export default EditStudents;