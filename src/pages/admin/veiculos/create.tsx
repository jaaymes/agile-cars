import { useCallback, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';

import Head from 'next/head';
import { useRouter } from 'next/router';

import { useSnackbar } from 'notistack';
import * as Yup from 'yup';

import { useAuth } from '@/hooks/useAuth';

import { yupResolver } from '@hookform/resolvers/yup';

import CustomBreadcrumbs from '@/components/custom-breadcrumbs';
import FormProvider, { RHFAutocomplete, RHFTextField, RHFUpload } from '@/components/hook-form';
import { CustomFile } from '@/components/upload';

import { convertBase64 } from '@/utils/convertBase64';
import { normalizePhone } from '@/utils/normalize';

import { getCategory, getOptional } from '@/services/filters';
import { getFranqueado, getFranqueados } from '@/services/franqueados';
import { createVeiculos, getMarcas, getModelos, getModelosVersao } from '@/services/products';

import DashboardLayout from '@/layouts/AdminLayout';
import { LoadingButton } from '@mui/lab';
import { Box, Card, Chip, colors, Container, FormControl, Grid, InputLabel, MenuItem, Select, Stack, TextField, Typography } from '@mui/material';

interface FormValuesProps {
  idMarca: string;
  idModelo: string;
  idModeloVersao: string;
  idCategoria: string;
  chassi: string;
  placa: string;
  fab: string;
  mod: string;
  cor: string;
  km: string;
  valor: string;
  obs: string;
  renavam: string;
  opcionais: number[];
  images: (Blob | string)[];
  imagesBase64: string[] | unknown[];
}

interface IOptions {
  value: string;
  label: string;
}

interface IOptionals {
  idOpcional: number;
  descricaoOpcional: string;
}

FranqueadosCreatePage.getLayout = (page: React.ReactElement) => <DashboardLayout>{page}</DashboardLayout>;

export default function FranqueadosCreatePage() {
  const { push, query: { id } } = useRouter();
  const { user } = useAuth()

  const { enqueueSnackbar } = useSnackbar();
  const [active, setActive] = useState<boolean>(false);
  const [dataFranqueador, setDataFranqueador] = useState<FormValuesProps | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [marcas, setMarcas] = useState<IOptions[]>([]);
  const [modelos, setModelos] = useState<IOptions[]>([]);
  const [modelosVersao, setModelosVersao] = useState<IOptions[]>([]);
  const [categories, setCategories] = useState<IOptions[]>([]);
  const [optionals, setOptionals] = useState<IOptionals[]>([]);
  const [franqueados, setFranqueados] = useState<IOptions[]>([])

  const NewUserSchema = Yup.object().shape({
    idMarca: Yup.string().required('Campo obrigatório'),
    idModelo: Yup.string().required('Campo obrigatório'),
    idModeloVersao: Yup.string().required('Campo obrigatório'),
    idCategoria: Yup.string().required('Campo obrigatório'),
    chassi: Yup.string().required('Campo obrigatório'),
    placa: Yup.string().required('Campo obrigatório'),
    fab: Yup.string().required('Campo obrigatório'),
    mod: Yup.string().required('Campo obrigatório'),
    cor: Yup.string().required('Campo obrigatório'),
    km: Yup.string().required('Campo obrigatório'),
    valor: Yup.string().required('Campo obrigatório'),
    renavam: Yup.string().required('Campo obrigatório'),
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

  const onSubmitAdd = async (data: FormValuesProps) => {
    // console.log("🚀 ~ file: create.tsx ~ line 106 ~ onSubmitAdd ~ data", data)
    const foto1 = data?.images[0] && await convertBase64(data?.images[0]);
    const foto2 = data?.images[1] && await convertBase64(data?.images[1]);
    const foto3 = data?.images[2] && await convertBase64(data?.images[2]);
    const foto4 = data?.images[3] && await convertBase64(data?.images[3]);
    const foto5 = data?.images[4] && await convertBase64(data?.images[4]);
    const foto6 = data?.images[5] && await convertBase64(data?.images[5]);
    const foto7 = data?.images[6] && await convertBase64(data?.images[6]);
    const foto8 = data?.images[7] && await convertBase64(data?.images[7]);

    try {
      await createVeiculos({
        idFranqueado: user?.idfranqueado,
        idMarca: Number(data.idMarca),
        idModelo: Number(data.idModelo),
        idModeloVersao: Number(data.idModeloVersao),
        idCategoria: Number(data.idCategoria),
        chassi: data.chassi,
        placa: data.placa,
        fab: Number(data.fab),
        mod: Number(data.mod),
        cor: data.cor,
        km: Number(data.km),
        valor: Number(data.valor),
        obs: data.obs,
        renavam: data.renavam,
        opcionais: data.opcionais?.toString()?.replaceAll(',', ';') || undefined,
        foto1: foto1 ? String(foto1) : undefined,
        foto2: foto2 ? String(foto2) : undefined,
        foto3: foto3 ? String(foto3) : undefined,
        foto4: foto4 ? String(foto4) : undefined,
        foto5: foto5 ? String(foto5) : undefined,
        foto6: foto6 ? String(foto6) : undefined,
        foto7: foto7 ? String(foto7) : undefined,
        foto8: foto8 ? String(foto8) : undefined,
      })
      enqueueSnackbar('Franqueado criado com sucesso', { variant: 'success' });
      // push('/admin/franqueados')
    } catch (error: any) {
      console.log('error', error)
      enqueueSnackbar(error.response.data.mensagem, { variant: 'error' });
    }

  };

  const onSubmitEdit = async (data: FormValuesProps) => {
    try {
      // await createFranqueado({

      // })
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
      // if (response) {
      //   setValue('descricaoFranqueado', response.descricaoFranqueado)
      //   setValue('cnpj', response.cnpj)
      //   setValue('cpf', response.cpf)
      //   setValue('whatsapp', response.whatsapp)
      //   setValue('endereco', response.endereco)
      //   setValue('bairro', response.bairro)
      //   setValue('cidade', response.cidade)
      //   setValue('uf', response.uf)
      //   setValue('cep', response.cep)
      //   setValue('nroEndereco', response.nroEndereco)
      //   setValue('complemento', response.complemento)
      //   setActive(response.idSituacao === 1 ? true : false)
      //   setDataFranqueador(response)
      // }
    }

  }, [id])

  const handleGetMarcas = async () => {
    const response = await getMarcas()
    const marcasReturn = response.map((item: { descricaoMarca: any; idMarca: any; }) => ({
      label: item.descricaoMarca.toUpperCase(),
      value: item.idMarca
    }))
    setMarcas(marcasReturn)
  }

  const handleGetModelos = async () => {
    const response = await getModelos(Number(values.idMarca))
    if (response) {
      const modelosReturn = response.map((item: { descricaoModelo: any; idModelo: any; }) => ({
        label: item.descricaoModelo,
        value: item.idModelo
      }))
      setModelos(modelosReturn)
    }
  }

  const handleGetModeloVersao = async () => {
    const response = await getModelosVersao(Number(values.idModelo))
    if (response) {
      const modeloVersaoReturn = response.collection.map((item: { descricaoModeloVersao: any; idModeloVersao: any; }) => ({
        label: item.descricaoModeloVersao,
        value: item.idModeloVersao
      }))
      setModelosVersao(modeloVersaoReturn)
    }
  }

  const handleGetCategory = async () => {
    const category = await getCategory()
    if (category) {
      const categorysReturn = category.collection.map((item: { descricaoCategoria: any; idCategoria: any; }) => ({
        label: item.descricaoCategoria,
        value: item.idCategoria
      }))
      setCategories(categorysReturn)
    }
  }

  const handleGetOptional = async () => {
    const optional = await getOptional()
    setOptionals(optional.collection)
  }

  const handleGetFranqueados = useCallback(async () => {
    const { collection } = await getFranqueados()
    const options = collection.map((item: IFranqueados) => ({
      value: item.idFranqueado,
      label: item.descricaoFranqueado
    }))
    setFranqueados(options)
  }, []);


  const handleDrop = useCallback(
    (acceptedFiles: File[]) => {
      const files = values.images || [];
      const filesBase64 = values.imagesBase64 || [];

      const newFiles = acceptedFiles.map((file) =>
        Object.assign(file, {
          preview: URL.createObjectURL(file),
        })
      );

      const newFilesBase64 = acceptedFiles.map(async (file) =>
        await convertBase64(file)
      );


      setValue('images', [...files, ...newFiles]);
      setValue('imagesBase64', [...filesBase64, ...newFilesBase64]);
    },
    [setValue, values.images]
  );

  const handleRemoveFile = (inputFile: File | string) => {
    const filtered = values.images && values.images?.filter((file) => file !== inputFile);
    setValue('images', filtered);
  };


  const handleRemoveAllFiles = () => {
    setValue('images', []);
  };

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
    handleGetMarcas()
    handleGetCategory()
    handleGetOptional()
    handleGetFranqueados()
  }, []);

  useEffect(() => {
    handleGetModelos()
  }, [values.idMarca]);

  useEffect(() => {
    handleGetModeloVersao()
  }, [values.idModelo]);
  return (
    <>
      <Head>
        <title>Criar novo Veiculo</title>
      </Head>
      <Container maxWidth={false}>
        <CustomBreadcrumbs
          heading="Criar novo Veiculo"
          links={[
            {
              name: 'Início',
              href: '/',
            },
            {
              name: 'Veículos',
              href: '/admin/veiculos',
            },
            { name: 'Novo Veiculo' },
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
                    sm: 'repeat(3, 1fr)',
                  }}
                >
                  <FormControl fullWidth>
                    <InputLabel>Marcas</InputLabel>
                    <Select
                      value={values.idMarca || ''}
                      label="Marcas"
                      {...register('idMarca')}
                    >
                      {
                        marcas.map(item => (
                          <MenuItem key={item.value} value={item.value}>{item.label}</MenuItem>
                        ))
                      }
                    </Select>
                  </FormControl>

                  <FormControl fullWidth>
                    <InputLabel>Modelos</InputLabel>
                    <Select
                      sx={{
                        '& .Mui-disabled': {
                          backgroundColor: colors.grey[300]
                        }
                      }}
                      disabled={!values.idMarca}
                      value={values.idModelo || ''}
                      label="Modelos"
                      {...register('idModelo')}
                    >
                      {
                        modelos.map(item => (
                          <MenuItem key={item.value} value={item.value}>{item.label}</MenuItem>
                        ))
                      }
                    </Select>
                  </FormControl>

                  <FormControl fullWidth>
                    <InputLabel>Modelo Versão</InputLabel>
                    <Select
                      sx={{
                        '& .Mui-disabled': {
                          backgroundColor: colors.grey[300]
                        }
                      }}
                      disabled={!values.idModelo}
                      value={values.idModeloVersao || ''}
                      label="Modelo Versão"
                      {...register('idModeloVersao')}
                    >
                      {
                        modelosVersao.map(item => (
                          <MenuItem key={item.value} value={item.value}>{item.label}</MenuItem>
                        ))
                      }
                    </Select>
                  </FormControl>
                  <FormControl fullWidth>
                    <InputLabel>Categorias</InputLabel>
                    <Select
                      value={values.idCategoria || ''}
                      label="Categoria"
                      {...register('idCategoria')}
                    >
                      {
                        categories.map(item => (
                          <MenuItem key={item.value} value={item.value}>{item.label}</MenuItem>
                        ))
                      }
                    </Select>
                  </FormControl>

                  <RHFTextField InputLabelProps={{ shrink: true }} name="chassi" label="Chassi" />

                  <RHFTextField InputLabelProps={{ shrink: true }} name="placa" label="Placa" />

                  <RHFTextField InputLabelProps={{ shrink: true }} name="fab" label="Ano Fabricação" />

                  <RHFTextField InputLabelProps={{ shrink: true }} name="mod" label="Ano Modelo" />

                  <RHFTextField InputLabelProps={{ shrink: true }} name="cor" label="Cor" />

                  <RHFTextField InputLabelProps={{ shrink: true }} name="km" label="Km" />

                  <RHFTextField InputLabelProps={{ shrink: true }} name="renavam" label="Renavam" />

                  <RHFTextField InputLabelProps={{ shrink: true }} name="valor" label="Valor" />

                  <RHFAutocomplete
                    name="Opcionais"
                    multiple
                    freeSolo
                    onChange={(event, newValue) => {
                      // @ts-ignore
                      setValue('opcionais', newValue.map((item) => item.idOpcional));
                    }}
                    options={optionals}
                    // @ts-ignore
                    getOptionLabel={(option) => option.descricaoOpcional}
                    renderTags={(value, getTagProps) => (
                      value.map((option, index) => (
                        <Chip {...getTagProps({ index })} key={option.idOpcional} size="small" label={option.descricaoOpcional} />
                      ))
                    )
                    }
                    renderInput={(params) => <TextField label="Opcionais" {...params} />}
                  />

                </Box>

                <Box
                  sx={{
                    p: 1
                  }}
                  rowGap={4}
                  columnGap={2}
                  display="grid"
                >
                  <RHFTextField InputLabelProps={{ shrink: true }} name="obs" label="Observação" rows={3} multiline />
                </Box>

                <Box
                  sx={{
                    p: 1
                  }}
                  rowGap={4}
                  columnGap={2}
                  display="grid"
                >
                  <Typography variant="subtitle2" sx={{ color: 'text.secondary' }}>
                    Fotos (escolhe 8 fotos, a primeira será a foto principal)
                  </Typography>

                  <RHFUpload
                    maxFiles={8}
                    multiple
                    thumbnail
                    name="images"
                    maxSize={3145728}
                    onDrop={handleDrop}
                    onRemove={handleRemoveFile}
                    onRemoveAll={handleRemoveAllFiles}
                  />
                </Box>

                <Stack alignItems="flex-end" sx={{ mt: 3 }}>
                  <LoadingButton type="submit" variant="contained" loading={isSubmitting}>
                    {!id ? 'Criar Veiculo' : 'Salvar Mudanças'}
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
