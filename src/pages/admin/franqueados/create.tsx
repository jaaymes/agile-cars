import { RefObject, useCallback, useEffect, useRef, useState } from 'react';
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
} from '@/components/hook-form';
import Label from '@/components/label';

import { convertBase64 } from '@/utils/convertBase64';
import { normalizeCep, normalizeCEP, normalizeCnpj, normalizeCpf, normalizeNumber, normalizeWhatsapp } from '@/utils/normalize';
import { states } from '@/utils/states';

import { createColaborador, getColaborador, updateColaborador } from '@/services/colaboradores';
import { consultCep } from '@/services/consultCep';
import { createFranqueado, getFranqueado, getFranqueados } from '@/services/franqueados';

import DashboardLayout from '@/layouts/AdminLayout';
import { LoadingButton } from '@mui/lab';
import { Box, Card, colors, Container, FormControlLabel, Grid, MenuItem, Stack, Switch, TextField, TextFieldProps, Typography } from '@mui/material';


interface FormValuesProps {
  descricaoFranqueado: string
  cnpj: string
  cpf: string
  whatsapp: string
  endereco: string
  bairro: string
  cidade: string
  estado: string
  cep: string
  nroEndereco: string
  complemento: string
  uf: string
  dataCadastro?: string | Date
}

interface IOptions {
  value: string;
  label: string;
}

FranqueadosCreatePage.getLayout = (page: React.ReactElement) => <DashboardLayout>{page}</DashboardLayout>;

export default function FranqueadosCreatePage() {
  const { push, query: { id } } = useRouter();
  const { user } = useAuth()

  const { enqueueSnackbar } = useSnackbar();
  const [active, setActive] = useState<boolean>(false);
  const [dataFranqueador, setDataFranqueador] = useState<FormValuesProps | null>(null)
  const [isLoading, setIsLoading] = useState(false)

  const NewUserSchema = Yup.object().shape({
    descricaoFranqueado: Yup.string().required('Nome é obrigatório'),
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
    setFocus,
    formState: { isSubmitting, errors },
  } = methods;

  const values = watch();

  const onSubmitAdd = async (data: FormValuesProps) => {
    try {
      await createFranqueado({
        descricaoFranqueado: data.descricaoFranqueado,
        idSituacao: active ? 1 : 2,
        bairro: data.bairro,
        cep: data.cep,
        cidade: data.cidade,
        complemento: data.complemento,
        cnpj: data.cnpj,
        cpf: data.cpf,
        endereco: data.endereco,
        uf: data.uf,
        dataCadastro: new Date(),
        dataCancelamento: !active ? new Date() : undefined,
        nroEndereco: data.nroEndereco,
        whatsapp: data.whatsapp,
        logr: ""
      })
      enqueueSnackbar('Franqueado criado com sucesso', { variant: 'success' });
      push('/admin/franqueados')
    } catch (error: any) {
      console.log('error', error)
      enqueueSnackbar(error.response.data.mensagem, { variant: 'error' });
    }

  };

  const onSubmitEdit = async (data: FormValuesProps) => {
    try {
      await createFranqueado({
        idFranqueado: Number(id),
        descricaoFranqueado: data.descricaoFranqueado,
        idSituacao: active ? 1 : 2,
        bairro: data.bairro,
        cep: data.cep,
        cidade: data.cidade,
        complemento: data.complemento,
        cnpj: data.cnpj,
        cpf: data.cpf,
        endereco: data.endereco,
        uf: data.uf,
        dataCadastro: dataFranqueador?.dataCadastro,
        dataCancelamento: !active ? new Date() : undefined,
        nroEndereco: data.nroEndereco,
        whatsapp: data.whatsapp,
        logr: ""
      })
      reset();
      enqueueSnackbar('Atualizado com Sucesso');
      push('/admin/franqueados');
    } catch (error: any) {
      enqueueSnackbar(error.response.data.mensagem, { variant: 'error' });
    }
  }


  const loadData = useCallback(async () => {
    if (id) {
      const response = await getFranqueado(Number(id))
      console.log("🚀 ~ file: create.tsx ~ line 142 ~ loadData ~ response", response)
      if (response) {
        setValue('descricaoFranqueado', response.descricaoFranqueado)
        setValue('cnpj', response.cnpj)
        setValue('cpf', response.cpf)
        setValue('whatsapp', response.whatsapp)
        setValue('endereco', response.endereco)
        setValue('bairro', response.bairro)
        setValue('cidade', response.cidade)
        setValue('uf', response.uf)
        setValue('cep', response.cep)
        setValue('nroEndereco', response.nroEndereco)
        setValue('complemento', response.complemento)
        setActive(response.idSituacao === 1 ? true : false)
        setDataFranqueador(response)
      }
    }

  }, [id])

  async function handleCep(zipcode: string) {
    setIsLoading(true)
    const data = await consultCep(normalizeNumber(zipcode))
    // console.log("🚀 ~ file: create.tsx ~ line 124 ~ handleCep ~ data", data)

    if (typeof data !== 'boolean') {
      setValue('endereco', data.logradouro)
      setValue('bairro', data.bairro)
      setValue('uf', data.uf)
      setValue('cidade', data.localidade)
      setValue('complemento', data.complemento)

      setIsLoading(false)
      setFocus('nroEndereco')
    } else {
      setValue('endereco', '')
      setValue('bairro', '')
      setValue('uf', '')
      setValue('cidade', '')
      setValue('complemento', '')
    }
    setIsLoading(false)
  }

  const onSubmit = async (data: FormValuesProps) => {
    if (!id) {
      await onSubmitAdd(data)
    } else {
      await onSubmitEdit(data)
    }
  }

  useEffect(() => {
    loadData()
  }, [id]);
  return (
    <>
      <Head>
        <title>Criar novo Franqueado</title>
      </Head>
      <Container maxWidth={false}>
        <CustomBreadcrumbs
          heading="Criar novo Franqueado"
          links={[
            {
              name: 'Início',
              href: '/',
            },
            {
              name: 'Franqueados',
              href: '/admin/franqueados',
            },
            { name: 'Novo Franqueador' },
          ]}
        />

        <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <Card sx={{ py: 6.5, px: 4 }}>
                <Box
                  sx={{
                    p: 1
                  }}
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
                    name="descricaoFranqueado" label="Nome do Franqueador" />

                  <RHFTextField InputLabelProps={{ shrink: true }} value={normalizeCnpj(values.cnpj)} name="cnpj" label="CNPJ da Empresa" />
                  <RHFTextField InputLabelProps={{ shrink: true }} value={normalizeCpf(values.cpf)} name="cpf" label="CPF do Responsável" />
                  <RHFTextField InputLabelProps={{ shrink: true }}
                    inputProps={{
                      maxLength: 15,
                    }}
                    value={normalizeWhatsapp(values.whatsapp)} name="whatsapp" label="WhatsApp" />


                  <TextField
                    InputLabelProps={{
                      shrink: true
                    }}
                    inputProps={{
                      maxLength: 9,
                    }}
                    fullWidth
                    variant="outlined"
                    margin="none"
                    label="CEP"
                    value={normalizeCep(watch('cep'))}
                    helperText={errors?.cep?.message}
                    {...register('cep', {
                      onChange: (event: React.ChangeEvent<HTMLInputElement>) => handleCep(event.target.value),
                      required: true
                    })}
                    error={!!errors.cep}
                  />

                  <TextField
                    InputLabelProps={{
                      shrink: true
                    }}
                    fullWidth
                    variant="outlined"
                    margin="none"
                    label="Endereço"
                    error={!!errors.endereco}
                    helperText={errors?.endereco?.message}
                    {...register('endereco', { required: true })}
                  />

                  <TextField
                    InputLabelProps={{
                      shrink: true
                    }}
                    fullWidth
                    variant="outlined"
                    margin="none"
                    label="Número"
                    error={!!errors.nroEndereco}
                    helperText={errors?.nroEndereco?.message}
                    {...register('nroEndereco', { required: true })}
                  />


                  <RHFTextField InputLabelProps={{ shrink: true }} name="complemento" label="Complemento" />

                  <RHFTextField InputLabelProps={{ shrink: true }} name="bairro" label="Bairro" />

                  <RHFTextField InputLabelProps={{ shrink: true }} name="cidade" label="Cidade" />

                  <TextField
                    select
                    fullWidth
                    label="Estado"
                    value={values.uf ? values.uf : ''}
                    {...register('uf', { required: true })}
                    error={!!errors.uf}
                    helperText={errors.uf?.message}
                  >
                    {states.map((state) => (
                      <MenuItem key={state.value} value={state.value}>
                        {state.label}
                      </MenuItem>
                    ))}
                  </TextField>

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
                    sx={{ mx: 0, mb: 3, width: 1, justifyContent: 'center', alignContent: 'center' }}
                  />
                  <Label
                    color={active ? 'success' : 'error'}
                    sx={{ textTransform: 'uppercase', position: 'absolute', top: 23, right: 24 }}
                  >
                    {active ? 'Ativo' : 'Cancelado'}
                  </Label>
                </Box>

                <Stack alignItems="flex-end" sx={{ mt: 3 }}>
                  <LoadingButton type="submit" variant="contained" loading={isSubmitting}>
                    {!id ? 'Criar Franqueado' : 'Salvar Mudanças'}
                  </LoadingButton>
                </Stack>
              </Card>
            </Grid>
          </Grid>
        </FormProvider>
      </Container>
    </>
  );
}