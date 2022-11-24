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
import LoadingScreen from '@/components/loading-screen';

import { convertBase64, convertBase64ToFile } from '@/utils/convertBase64';
import { normalizePlaca, normalizeRenavam, normalizeYear } from '@/utils/normalize';

import { getCategory, getOptionais } from '@/services/filters';
import { createVeiculos, getMarcas, getModelos, getModelosVersao, getOpcionais, getProduct, updateVeiculos } from '@/services/products';

import DashboardLayout from '@/layouts/AdminLayout';
import { LoadingButton } from '@mui/lab';
import { Box, Button, Card, Chip, colors, Container, FormControl, Grid, InputLabel, MenuItem, Select, Stack, TextField, Typography } from '@mui/material';

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
  opcionais: IOptionals[];
  images: (Blob | string | undefined)[];
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
  const [isLoading, setIsLoading] = useState(false)
  const [marcas, setMarcas] = useState<IOptions[]>([]);
  const [modelos, setModelos] = useState<IOptions[]>([]);
  const [modelosVersao, setModelosVersao] = useState<IOptions[]>([]);
  const [categories, setCategories] = useState<IOptions[]>([]);
  const [optionals, setOptionals] = useState<IOptionals[]>([]);

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
    formState: { isSubmitting },
  } = methods;

  const values = watch();

  const onSubmitAdd = async (data: FormValuesProps) => {
    const foto1 = data?.images && data?.images[0] ? await convertBase64(data?.images[0]) : undefined;
    const foto2 = data?.images && data?.images[1] ? await convertBase64(data?.images[1]) : undefined;
    const foto3 = data?.images && data?.images[2] ? await convertBase64(data?.images[2]) : undefined;
    const foto4 = data?.images && data?.images[3] ? await convertBase64(data?.images[3]) : undefined;
    const foto5 = data?.images && data?.images[4] ? await convertBase64(data?.images[4]) : undefined;
    const foto6 = data?.images && data?.images[5] ? await convertBase64(data?.images[5]) : undefined;
    const foto7 = data?.images && data?.images[6] ? await convertBase64(data?.images[6]) : undefined;
    const foto8 = data?.images && data?.images[7] ? await convertBase64(data?.images[7]) : undefined;

    const opcionaisId = data?.opcionais ? data?.opcionais.map((item) => item.idOpcional) : undefined;

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
        opcionais: opcionaisId ? opcionaisId.toString()?.replaceAll(',', ';') : undefined,
        foto1: foto1 ? String(foto1) : undefined,
        foto2: foto2 ? String(foto2) : undefined,
        foto3: foto3 ? String(foto3) : undefined,
        foto4: foto4 ? String(foto4) : undefined,
        foto5: foto5 ? String(foto5) : undefined,
        foto6: foto6 ? String(foto6) : undefined,
        foto7: foto7 ? String(foto7) : undefined,
        foto8: foto8 ? String(foto8) : undefined,
      })
      enqueueSnackbar('Veiculo criado com sucesso', { variant: 'success' });
      push('/admin/veiculos')
    } catch (error: any) {
      console.log('error', error)
      enqueueSnackbar(error.response.data.mensagem, { variant: 'error' });
    }

  };

  const onSubmitEdit = async (data: FormValuesProps) => {
    const foto1 = data?.images[0] ? await convertBase64(data?.images[0]) : undefined;
    const foto2 = data?.images[1] ? await convertBase64(data?.images[1]) : undefined;
    const foto3 = data?.images[2] ? await convertBase64(data?.images[2]) : undefined;
    const foto4 = data?.images[3] ? await convertBase64(data?.images[3]) : undefined;
    const foto5 = data?.images[4] ? await convertBase64(data?.images[4]) : undefined;
    const foto6 = data?.images[5] ? await convertBase64(data?.images[5]) : undefined;
    const foto7 = data?.images[6] ? await convertBase64(data?.images[6]) : undefined;
    const foto8 = data?.images[7] ? await convertBase64(data?.images[7]) : undefined;

    const opcionaisId = data?.opcionais ? data?.opcionais.map((item) => item.idOpcional) : undefined;
    try {
      await updateVeiculos({
        idVeiculo: Number(id),
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
        opcionais: opcionaisId ? opcionaisId.toString()?.replaceAll(',', ';') : undefined,
        foto1: foto1 ? String(foto1) : undefined,
        foto2: foto2 ? String(foto2) : undefined,
        foto3: foto3 ? String(foto3) : undefined,
        foto4: foto4 ? String(foto4) : undefined,
        foto5: foto5 ? String(foto5) : undefined,
        foto6: foto6 ? String(foto6) : undefined,
        foto7: foto7 ? String(foto7) : undefined,
        foto8: foto8 ? String(foto8) : undefined,
      })
      reset();
      enqueueSnackbar('Atualizado com Sucesso');
      push('/admin/veiculos');
    } catch (error: any) {
      enqueueSnackbar(error.response.data.mensagem, { variant: 'error' });
    }
  }

  const loadData = useCallback(async () => {
    setIsLoading(true);
    if (id) {
      const response = await getProduct({
        id: Number(id),
        idFranqueado: user?.idfranqueado,
      });
      const { collection: opcionais } = await getOpcionais({
        idFranqueado: user?.idfranqueado,
        id: Number(id),
      })
      const opcionaisArray = opcionais.map((item: any) => ({
        idOpcional: item.idOpcional,
        descricaoOpcional: item.descricaoOpcional,
      }))
      if (response) {
        setValue('idMarca', response.idMarca)
        setValue('idModelo', response.idModelo)
        setValue('idModeloVersao', response.idModeloVersao)
        setValue('idCategoria', response.idCategoria)
        setValue('chassi', response.chassi)
        setValue('placa', response.placa)
        setValue('fab', response.fab)
        setValue('mod', response.mod)
        setValue('cor', response.cor)
        setValue('km', response.km)
        setValue('valor', response.valor)
        setValue('obs', response.obs)
        setValue('renavam', response.renavam)
        if (opcionaisArray) {
          setValue('opcionais', opcionaisArray)
        }

        const foto1: File = response?.foto1 && convertBase64ToFile(response?.foto1, 'foto1.jpg');
        const foto2: File = response?.foto2 && convertBase64ToFile(response?.foto2, 'foto2.jpg');
        const foto3: File = response?.foto3 && convertBase64ToFile(response?.foto3, 'foto3.jpg');
        const foto4: File = response?.foto4 && convertBase64ToFile(response?.foto4, 'foto4.jpg');
        const foto5: File = response?.foto5 && convertBase64ToFile(response?.foto5, 'foto5.jpg');
        const foto6: File = response?.foto6 && convertBase64ToFile(response?.foto6, 'foto6.jpg');
        const foto7: File = response?.foto7 && convertBase64ToFile(response?.foto7, 'foto7.jpg');
        const foto8: File = response?.foto8 && convertBase64ToFile(response?.foto8, 'foto8.jpg');
        const images = [foto1, foto2, foto3, foto4, foto5, foto6, foto7, foto8].filter(Boolean);
        const newImages = images.map((image: File) =>
          Object.assign(image, {
            path: 'foto1.jpg',
            preview: URL.createObjectURL(image),
          })
        )
        setValue('images', [...newImages]);
      }
    }
    setIsLoading(false);
  }, [id])

  const handleGetMarcas = async () => {
    const response = await getMarcas({})
    if (response) {
      const marcasReturn = response.map((item: { descricaoMarca: any; idMarca: any; }) => ({
        label: item.descricaoMarca.toUpperCase(),
        value: item.idMarca
      }))
      if (marcasReturn) {
        setMarcas(marcasReturn)
      }
    }

  }

  const handleGetModelos = async () => {
    const response = await getModelos(Number(values.idMarca))
    if (response) {
      const modelosReturn = response.map((item: { descricaoModelo: any; idModelo: any; }) => ({
        label: item.descricaoModelo,
        value: item.idModelo
      }))
      if (modelosReturn) {
        setModelos(modelosReturn)
      }
    }
  }

  const handleGetModeloVersao = async () => {
    const response = await getModelosVersao(Number(values.idModelo))
    if (response) {
      const modeloVersaoReturn = response.collection.map((item: { descricaoModeloVersao: any; idModeloVersao: any; }) => ({
        label: item.descricaoModeloVersao,
        value: item.idModeloVersao
      }))
      if (modeloVersaoReturn) {
        setModelosVersao(modeloVersaoReturn)
      }
    }
  }

  const handleGetCategory = async () => {
    const category = await getCategory()
    if (category) {
      const categorysReturn = category.collection.map((item: { descricaoCategoria: any; idCategoria: any; }) => ({
        label: item.descricaoCategoria,
        value: item.idCategoria
      }))
      if (categorysReturn) {
        setCategories(categorysReturn)
      }
    }
  }

  const handleGetOptional = async () => {
    const optional = await getOptionais({})
    if (optional) {
      setOptionals(optional.collection)
    }
  }

  const handleDrop = useCallback(
    (acceptedFiles: File[]) => {
      const files = values.images || [];
      const filesBase64 = values.imagesBase64 || [];

      const newFiles = acceptedFiles.map((file) => Object.assign(file, {
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
  }, []);

  useEffect(() => {
    if (values.idMarca) {
      handleGetModelos()
    }
  }, [values.idMarca]);

  useEffect(() => {
    if (values.idModelo) {
      handleGetModeloVersao()
    }
  }, [values.idModelo]);
  return (
    <>
      <Head>
        <title>Criar novo Veiculo</title>
      </Head>
      {
        isLoading ? (
          <LoadingScreen />
        )
          :
          <Container maxWidth={false}>
            <CustomBreadcrumbs
              heading="Criar novo Veiculo"
              links={[
                {
                  name: 'Início',
                  href: '/admin',
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

                      <RHFTextField InputLabelProps={{ shrink: true }} name="placa" label="Placa"
                        value={normalizePlaca(values.placa)}
                        inputProps={{
                          maxLength: 8,
                          style: {
                            textTransform: 'uppercase'
                          }
                        }}
                      />

                      <RHFTextField InputLabelProps={{ shrink: true }} name="fab" value={normalizeYear(values.fab)} label="Ano Fabricação"
                        inputProps={{
                          maxLength: 4,
                        }}
                      />

                      <RHFTextField InputLabelProps={{ shrink: true }} name="mod" value={normalizeYear(values.mod)} label="Ano Modelo"
                        inputProps={{
                          maxLength: 4,
                        }}
                      />

                      <RHFTextField InputLabelProps={{ shrink: true }} name="cor" label="Cor" />

                      <RHFTextField InputLabelProps={{ shrink: true }} name="km" label="Km" inputProps={{
                        maxLength: 4,
                        type: 'number'
                      }}
                      />

                      <RHFTextField InputLabelProps={{ shrink: true }} name="renavam" label="Renavam"
                        value={normalizeRenavam(values.renavam)}
                        inputProps={{
                          maxLength: 11,
                        }}
                      />

                      <RHFTextField InputLabelProps={{ shrink: true }} name="valor" label="Valor" type="number" />

                      <RHFAutocomplete
                        name="Opcionais"
                        multiple
                        freeSolo
                        onChange={(event, newValue) => {
                          // @ts-ignore
                          setValue('opcionais', newValue.map((item) => item));
                        }}
                        options={optionals}
                        value={values.opcionais || []}
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
                        // maxSize 1MB
                        maxSize={1000000}
                        onDrop={handleDrop}
                        onRemove={handleRemoveFile}
                        onRemoveAll={handleRemoveAllFiles}
                      />
                    </Box>

                    <Stack sx={{
                      flexDirection: 'row',
                      display: 'flex',
                      mt: 3,
                      gap: 2,
                      justifyContent: 'flex-end'
                    }}>
                      <LoadingButton type="submit" variant="contained" loading={isSubmitting}>
                        {!id ? 'Criar Veiculo' : 'Salvar Mudanças'}
                      </LoadingButton>
                      <Button variant="outlined" color="inherit" onClick={() => push('/admin/modelos')}>
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
