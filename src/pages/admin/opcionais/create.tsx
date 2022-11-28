import { useCallback, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';

import Head from 'next/head';
import { useRouter } from 'next/router';

import { useSnackbar } from 'notistack';
import * as Yup from 'yup';

import { yupResolver } from '@hookform/resolvers/yup';

import CustomBreadcrumbs from '@/components/custom-breadcrumbs';
import FormProvider, {
  RHFTextField,
} from '@/components/hook-form';

import { createOptional, getOpcional } from '@/services/filters';

import DashboardLayout from '@/layouts/AdminLayout';
import { LoadingButton } from '@mui/lab';
import { Box, Button, Card, Container, Grid, Stack, } from '@mui/material';

interface FormValuesProps {
  descricaoOpcional: string
}

MarcasCreatePage.getLayout = (page: React.ReactElement) => <DashboardLayout>{page}</DashboardLayout>;

export default function MarcasCreatePage() {
  const { push, query: { id } } = useRouter();

  const { enqueueSnackbar } = useSnackbar();
  const [rodandoLocal, setRodandoLocal] = useState(false)


  const NewOpcionalSchema = Yup.object().shape({
    descricaoOpcional: Yup.string().required('Nome é obrigatório'),
  });

  const methods = useForm<FormValuesProps>({
    resolver: yupResolver(NewOpcionalSchema)
  });

  const {
    reset,
    setValue,
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  const onSubmitAdd = async (data: FormValuesProps) => {
    try {
      await createOptional({
        descricaoOpcional: data.descricaoOpcional
      })
      enqueueSnackbar('Opcional criada com sucesso', { variant: 'success' });

      rodandoLocal ? push('/admin/opcionais') : push('/admin/opcionais.html')
    } catch (error: any) {
      console.log('error', error)
      enqueueSnackbar(error.response.data.mensagem, { variant: 'error' });
    }

  };

  const onSubmitEdit = async (data: FormValuesProps) => {
    try {
      await createOptional({
        idOpcional: Number(id),
        descricaoOpcional: data.descricaoOpcional
      })
      reset();
      enqueueSnackbar('Atualizado com Sucesso');
      rodandoLocal ? push('/admin/opcionais') : push('/admin/opcionais.html')
    } catch (error: any) {
      enqueueSnackbar(error.response.data.mensagem, { variant: 'error' });
    }
  }

  const loadData = useCallback(async () => {
    if (id) {
      const response = await getOpcional(Number(id))
      if (response) {
        setValue('descricaoOpcional', response.descricaoOpcional)
      }
    }
  }, [id])

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

  useEffect(() => {
    if (window.location.hostname.toLocaleLowerCase().indexOf("agileveiculos") <= - 1)
      setRodandoLocal(true);
    else
      setRodandoLocal(false);
  }, []);

  return (
    <>
      <Head>
        <title>{id ? "Editar Opcional" : "Criar Novo Opcional"}</title>
      </Head>
      <Container maxWidth={false}>
        <CustomBreadcrumbs
          heading={id ? "Editar Opcional" : "Criar Novo Opcional"}
          links={[
            {
              name: 'Início',
              href: rodandoLocal ? '/admin/dashboard' : '/admin/dashboard.html',
            },
            {
              name: 'Opcionais',
              href: rodandoLocal ? '/admin/opcionais' : '/admin/opcionais.html',
            },
            { name: 'Novo Opcional' },
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
                  <RHFTextField InputLabelProps={{ shrink: true }} name="descricaoOpcional" label="Nome do Opcional" />


                </Box>

                <Stack sx={{
                  flexDirection: 'row',
                  display: 'flex',
                  mt: 3,
                  gap: 2,
                  justifyContent: 'flex-end'
                }}>
                  <LoadingButton
                    sx={{
                      width: '70%',
                      display: 'flex',
                      justifySelf: 'center',
                    }}
                    type="submit" variant="contained" loading={isSubmitting}>
                    {!id ? 'Criar Opcional' : 'Salvar Mudanças'}
                  </LoadingButton>
                  <Button variant="outlined" color="inherit" onClick={() => rodandoLocal ? push('/admin/opcionais') : push('/admin/opcionais.html')}>
                    Cancelar
                  </Button>
                </Stack>

              </Card>
            </Grid>
          </Grid>
        </FormProvider>
      </Container>
    </>
  );
}
