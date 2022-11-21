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
import { Box, Card, Container, Grid, } from '@mui/material';

interface FormValuesProps {
  descricaoMarca: string
}

MarcasCreatePage.getLayout = (page: React.ReactElement) => <DashboardLayout>{page}</DashboardLayout>;

export default function MarcasCreatePage() {
  const { push, query: { id } } = useRouter();

  const { enqueueSnackbar } = useSnackbar();
  const [isLoading, setIsLoading] = useState(false)

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
    formState: { isSubmitting },
  } = methods;

  const onSubmitAdd = async (data: FormValuesProps) => {
    try {
      await createMarca({
        descricaoMarca: data.descricaoMarca,
      })
      enqueueSnackbar('Marca criada com sucesso', { variant: 'success' });
      push('/admin/marcas')
    } catch (error: any) {
      console.log('error', error)
      enqueueSnackbar(error.response.data.mensagem, { variant: 'error' });
    }

  };

  const onSubmitEdit = async (data: FormValuesProps) => {
    try {
      await createMarca({
        idMarca: Number(id),
        descricaoMarca: data.descricaoMarca,
      })
      reset();
      enqueueSnackbar('Atualizado com Sucesso');
      push('/admin/marcas');
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
                  href: '/admin',
                },
                {
                  name: 'Marcas',
                  href: '/admin/marcas',
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
                      <RHFTextField InputLabelProps={{ shrink: true }} name="descricaoMarca" label="Nome da Marca" />

                      <LoadingButton
                        sx={{
                          width: '70%',
                          display: 'flex',
                          justifySelf: 'center',
                        }}
                        type="submit" variant="contained" loading={isSubmitting}>
                        {!id ? 'Criar Marca' : 'Salvar Mudanças'}
                      </LoadingButton>
                    </Box>

                  </Card>
                </Grid>
              </Grid>
            </FormProvider>
          </Container>
      }

    </>
  );
}
