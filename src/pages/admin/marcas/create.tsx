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
import LoadingScreen from '@/components/loading-screen';

import { createMarca, getMarca } from '@/services/products';

import DashboardLayout from '@/layouts/AdminLayout';
import { LoadingButton } from '@mui/lab';
import { Box, Button, Card, Container, Grid, Stack, } from '@mui/material';

interface FormValuesProps {
  descricaoMarca: string
}

MarcasCreatePage.getLayout = (page: React.ReactElement) => <DashboardLayout>{page}</DashboardLayout>;

export default function MarcasCreatePage() {
  const { push, query: { id } } = useRouter();

  const { enqueueSnackbar } = useSnackbar();
  const [isLoading, setIsLoading] = useState(false)
  const [rodandoLocal, setrodandoLocal] = useState(true);

  const NewMarcaSchema = Yup.object().shape({
    descricaoMarca: Yup.string().required('Nome é obrigatório'),
  });

  const methods = useForm<FormValuesProps>({
    resolver: yupResolver(NewMarcaSchema)
  });

  const {
    reset,
    setValue,
    handleSubmit,
    watch,
    formState: { isSubmitting },
  } = methods;

  const watchAllFields = watch();

  const onSubmitAdd = async (data: FormValuesProps) => {
    try {
      await createMarca({
        descricaoMarca: data.descricaoMarca,
      })
      enqueueSnackbar('Marca criada com sucesso', { variant: 'success' });

      if (rodandoLocal)
        push('/admin/marcas')
      else
        push('/admin/marcas.html')


    } catch (error: any) {
      console.log('error', error)
      enqueueSnackbar(error.response.data.mensagem, { variant: 'error' });
    }

  };

  useEffect(() => {
    if (window.location.hostname.toLocaleLowerCase().indexOf("agileveiculos") <= - 1)
      setrodandoLocal(true);
    else
      setrodandoLocal(false);
  }, []);


  const onSubmitEdit = async (data: FormValuesProps) => {
    try {
      await createMarca({
        idMarca: Number(id),
        descricaoMarca: data.descricaoMarca,
      })
      reset();
      enqueueSnackbar('Atualizado com Sucesso');

      if (rodandoLocal)
        push('/admin/marcas')
      else
        push('/admin/marcas.html')



    } catch (error: any) {
      enqueueSnackbar(error.response.data.mensagem, { variant: 'error' });
    }
  }

  const loadData = useCallback(async () => {
    if (id) {
      setIsLoading(true)
      const response = await getMarca(Number(id))
      if (response) {
        setValue('descricaoMarca', response.descricaoMarca)
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

  useEffect(() => {
    loadData()
  }, [id]);
  return (
    <>
      <Head>
        <title>{id ? "Editar Marca" : "Criar nova Marca"}</title>
      </Head>
      {
        isLoading ? (
          <LoadingScreen />
        ) :
          <Container maxWidth={false}>
            <CustomBreadcrumbs
              heading={id ? "Editar Marca" : "Criar nova Marca"}
              links={[
                {
                  name: 'Início',
                  href: rodandoLocal ? '/admin/dashboard' : '/admin/dashboard.html',
                },
                {
                  name: 'Marcas',
                  href: rodandoLocal ? '/admin/marcas' : '/admin/marcas.html',
                },
                { name: 'Nova Marca' },
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
                      <RHFTextField InputLabelProps={{ shrink: true }} name="descricaoMarca" label="Nome da Marca" value={watchAllFields.descricaoMarca || ''} />
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
                          display: 'flex',
                          justifySelf: 'center',
                        }}
                        type="submit" variant="contained" loading={isSubmitting}>
                        {!id ? 'Criar Marca' : 'Salvar Mudanças'}
                      </LoadingButton>

                      <Button variant="outlined" color="inherit" onClick={() => rodandoLocal ? push('/admin/marcas') : push('/admin/marcas.html')}>
                        Cancelar
                      </Button>
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
