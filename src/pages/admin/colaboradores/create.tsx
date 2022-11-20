import { useCallback, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';

import Head from 'next/head';
import { useRouter } from 'next/router';

import { useSnackbar } from 'notistack';
import * as Yup from 'yup';

import { useAuth } from '@/hooks/useAuth';

import { yupResolver } from '@hookform/resolvers/yup';

import CustomBreadcrumbs from '@/components/custom-breadcrumbs';
import FormProvider, {
  RHFTextField,
  RHFUploadAvatar,
} from '@/components/hook-form';
import Label from '@/components/label';
import LoadingScreen from '@/components/loading-screen';
import { CustomFile } from '@/components/upload';

import { convertBase64 } from '@/utils/convertBase64';
import { fData } from '@/utils/formatNumber';
import { normalizePhone } from '@/utils/normalize';

import { createColaborador, getColaborador, updateColaborador } from '@/services/colaboradores';
import { getFranqueados } from '@/services/franqueados';

import { IUserAccountGeneral } from '@/@types/user';
import DashboardLayout from '@/layouts/AdminLayout';
import { LoadingButton } from '@mui/lab';
import { Box, Card, colors, Container, FormControlLabel, Grid, MenuItem, Stack, Switch, TextField, Typography } from '@mui/material';

interface FormValuesProps extends Omit<IUserAccountGeneral, 'avatarUrl'> {
  avatarUrl: CustomFile | string | null;
  phoneNumber: string
  descricaoFuncionario: string
  email: string
  senha?: string,
  idFranqueado: string,
}

interface IOptions {
  value: string;
  label: string;
}

UserCreatePage.getLayout = (page: React.ReactElement) => <DashboardLayout>{page}</DashboardLayout>;

export default function UserCreatePage() {
  const { push, query: { id } } = useRouter();
  const { user } = useAuth()

  const { enqueueSnackbar } = useSnackbar();
  const [active, setActive] = useState<boolean>(false);
  const [franqueados, setFranqueados] = useState<IOptions[]>([])
  const [dataUser, setDataUser] = useState<FormValuesProps | null>(null)
  const [isLoading, setIsLoading] = useState(false)

  const NewUserSchema = Yup.object().shape({
    descricaoFuncionario: Yup.string().required('Nome é obrigatório'),
    email: Yup.string().email('Email inválido').required('Email é obrigatório'),
    idFranqueado: Yup.string().required('Franqueado é obrigatório'),
  });

  const methods = useForm<FormValuesProps>({
    resolver: yupResolver(NewUserSchema)
  });

  const {
    register,
    reset,
    watch,
    setValue,
    handleSubmit,
    formState: { isSubmitting, errors },
  } = methods;

  const values = watch();

  const handleGetFranqueados = useCallback(async () => {
    const { collection } = await getFranqueados()
    const options = collection.map((item: IFranqueados) => ({
      value: item.idFranqueado,
      label: item.descricaoFranqueado
    }))
    setFranqueados(options)
  }, []);

  const onSubmitAdd = async (data: FormValuesProps) => {
    if (!data.avatarUrl) {
      enqueueSnackbar('Avatar é obrigatório', { variant: 'error' });
      return
    }
    try {
      const image = await convertBase64(data.avatarUrl)
      await createColaborador({
        descricaoFuncionario: data.descricaoFuncionario,
        email: data.email,
        dataCadastro: new Date(),
        foneCelular: data.phoneNumber,
        imagem: String(image),
        senha: data.senha || '123456',
        idSituacao: active ? 1 : 2,
        idFranqueado: Number(data?.idFranqueado),
      })
      enqueueSnackbar('Colaborador criado com sucesso', { variant: 'success' });
      push('/admin/colaboradores')
    } catch (error: any) {
      console.log('error', error)
      enqueueSnackbar(error.response.data.mensagem, { variant: 'error' });
    }

  };

  const onSubmitEdit = async (data: FormValuesProps) => {
    const image = typeof data.avatarUrl === 'string' ? data.avatarUrl : await convertBase64(data.avatarUrl)
    try {
      await updateColaborador({
        descricaoFuncionario: data.descricaoFuncionario,
        email: data.email,
        dataCadastro: dataUser?.dataCadastro,
        foneCelular: data.phoneNumber,
        senha: dataUser?.senha,
        imagem: String(image),
        idSituacao: active ? 1 : 2,
        idFranqueado: Number(data?.idFranqueado),
        idFuncionario: Number(id),
      })
      reset();
      enqueueSnackbar('Atualizado com Sucesso');
      push('/admin/colaboradores');
    } catch (error: any) {
      enqueueSnackbar(error.response.data.mensagem, { variant: 'error' });
    }
  }

  const loadData = useCallback(async () => {
    setIsLoading(true)
    if (id) {
      const response = await getColaborador(Number(id), user?.idfranqueado)
      if (response) {
        setValue('avatarUrl', response.imagem)
        setValue('descricaoFuncionario', response.descricaoFuncionario)
        setValue('email', response.email)
        setValue('phoneNumber', response.foneCelular)
        setValue('idFranqueado', response.idFranqueado)
        setActive(response.idSituacao === 1 ? true : false)
        setDataUser(response)
      }
      setIsLoading(false)
    }

  }, [id])

  const onSubmit = async (data: FormValuesProps) => {
    if (!id) {
      await onSubmitAdd(data)
    } else {
      await onSubmitEdit(data)
    }
  }

  const handleDrop = useCallback(
    (acceptedFiles: File[]) => {
      const file = acceptedFiles[0];
      const newFile = Object.assign(file, {
        preview: URL.createObjectURL(file),
      });

      if (file) {
        setValue('avatarUrl', newFile);
      }
    },
    [setValue]
  );

  useEffect(() => {
    handleGetFranqueados()
  }, []);

  useEffect(() => {
    loadData()
  }, [id]);
  return (
    <>
      <Head>
        <title>{id ? "Editar Colaborador" : "Criar novo Colaborador"}</title>
      </Head>
      {
        isLoading ? (
          <LoadingScreen />
        ) :
          <Container maxWidth={false}>
            <CustomBreadcrumbs
              heading={id ? "Editar Colaborador" : "Criar novo Colaborador"}
              links={[
                {
                  name: 'Início',
                  href: '/',
                },
                {
                  name: 'Colaboradores',
                  href: '/admin/colaboradores',
                },
                { name: 'Novo Colaborador' },
              ]}
            />

            <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
              <Grid container spacing={3}>
                <Grid item xs={12} md={4}>
                  <Card sx={{ pt: 10, pb: 5, px: 3 }}>
                    <Label
                      color={active ? 'success' : 'error'}
                      sx={{ textTransform: 'uppercase', position: 'absolute', top: 24, right: 24 }}
                    >
                      {active ? 'Ativo' : 'Inativo'}
                    </Label>

                    <Box sx={{ mb: 5 }}>
                      <RHFUploadAvatar
                        name="avatarUrl"
                        maxSize={3145728}
                        onDrop={handleDrop}
                        helperText={
                          <Typography
                            variant="caption"
                            sx={{
                              mt: 2,
                              mx: 'auto',
                              display: 'block',
                              textAlign: 'center',
                              color: 'text.secondary',
                            }}
                          >
                            Permitidos *.jpeg, *.jpg, *.png, *.gif
                            <br /> Máximo {fData(3145728)}
                          </Typography>
                        }
                      />
                    </Box>

                    <FormControlLabel
                      labelPlacement="start"
                      control={<Switch
                        sx={{
                          '&.Mui-checked': {
                            color: 'primary.main',
                          }
                        }}
                        checked={active}
                        onChange={(event) =>
                          setActive(event.target.checked)
                        }
                      />
                      }
                      label={
                        <>
                          <Typography variant="subtitle2" sx={{ mb: 0.5 }}>
                            Status
                          </Typography>
                        </>
                      }
                      sx={{ mx: 0, mb: 3, width: 1, justifyContent: 'space-between' }}
                    />
                  </Card>
                </Grid>

                <Grid item xs={12} md={8}>
                  <Card sx={{ py: 6.5, px: 4 }}>
                    <Box
                      rowGap={4}
                      columnGap={2}
                      display="grid"
                      gridTemplateColumns={{
                        xs: 'repeat(1, 1fr)',
                        sm: 'repeat(2, 1fr)',
                      }}
                    >
                      <RHFTextField
                        InputLabelProps={{
                          shrink: true
                        }}
                        name="descricaoFuncionario" label="Nome do Colaborador" />
                      <RHFTextField
                        InputLabelProps={{
                          shrink: true
                        }}
                        name="email" label="Email" />
                      <RHFTextField
                        InputLabelProps={{
                          shrink: true
                        }}
                        inputProps={{
                          maxLength: 15,
                        }}
                        name="phoneNumber" label="Celular" value={normalizePhone(values.phoneNumber)} />

                      <Box>
                        <RHFTextField
                          InputLabelProps={{
                            shrink: true
                          }}
                          name="senha" label="Senha" type="password" />
                        <Typography variant="caption" sx={{ mb: 0.5, color: colors?.grey[500] }}>
                          senha padrao: 123456
                        </Typography>
                      </Box>

                      <TextField
                        value={values.idFranqueado || ''}
                        size="medium"
                        select
                        label="Franqueado"
                        error={!!errors.idFranqueado}
                        helperText={errors.idFranqueado?.message}
                        {...register('idFranqueado', { required: true })}
                      >
                        {franqueados.map((option) => (
                          <MenuItem key={option.value} value={option.value}>
                            {option.label}
                          </MenuItem>
                        ))}
                      </TextField>
                    </Box>

                    <Stack alignItems="flex-end" sx={{ mt: 3 }}>
                      <LoadingButton type="submit" variant="contained" loading={isSubmitting}>
                        {!id ? 'Criar Colaborador' : 'Salvar Mudanças'}
                      </LoadingButton>
                    </Stack>
                  </Card>
                </Grid>
              </Grid>
            </FormProvider>
          </Container>
      }

    </>
  );
}
