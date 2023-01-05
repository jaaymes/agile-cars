import { useCallback, useEffect, useState } from "react";
import { useForm } from "react-hook-form";

import Head from "next/head";
import { useRouter } from "next/router";

import { useSnackbar } from "notistack";
import * as Yup from "yup";

import { yupResolver } from "@hookform/resolvers/yup";

import CustomBreadcrumbs from "@/components/custom-breadcrumbs";
import FormProvider, { RHFTextField } from "@/components/hook-form";

import {
  createModeloVersao,
  getMarcas,
  getModelos,
  getModeloVersao,
} from "@/services/products";

import DashboardLayout from "@/layouts/AdminLayout";
import { LoadingButton } from "@mui/lab";
import {
  Autocomplete,
  Box,
  Button,
  Card,
  colors,
  Container,
  Grid,
  Stack,
  TextField,
} from "@mui/material";

import { IMarcas } from "../marcas";

interface FormValuesProps {
  descricaoModeloVersao: string;
}

interface IOptions {
  label: string;
  id: number;
}

MarcasCreatePage.getLayout = (page: React.ReactElement) => (
  <DashboardLayout>{page}</DashboardLayout>
);

export default function MarcasCreatePage() {
  const {
    push,
    query: { id },
  } = useRouter();

  const { enqueueSnackbar } = useSnackbar();
  const [selectIdMarca, setSelectIdMarca] = useState<number | undefined | null>(
    undefined
  );
  const [selectIdModelo, setSelectIdModelo] = useState<
    number | undefined | null
  >(undefined);

  const [marcas, setMarcas] = useState<IOptions[]>([]);
  const [selectOptionsMarca, setSelectOptionsMarca] =
    useState<IOptions | null>();
  const [selectOptionsModelo, setSelectOptionsModelo] =
    useState<IOptions | null>();
  const [modelos, setModelos] = useState<IOptions[]>([]);

  const NewModeloSchema = Yup.object().shape({
    descricaoModeloVersao: Yup.string().required("Nome é obrigatório"),
  });

  const methods = useForm<FormValuesProps>({
    resolver: yupResolver(NewModeloSchema),
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
      await createModeloVersao({
        idMarca: Number(selectIdMarca),
        idModelo: Number(selectIdModelo),
        descricaoModeloVersao: data.descricaoModeloVersao,
      });
      enqueueSnackbar("Modelo Versão criado com sucesso", {
        variant: "success",
      });
      push("/admin/modelo-versao");
    } catch (error: any) {
      console.log("error", error);
      enqueueSnackbar(error.response.data.mensagem, { variant: "error" });
    }
  };

  const onSubmitEdit = async (data: FormValuesProps) => {
    if (!selectIdModelo) {
      enqueueSnackbar("Selecione um modelo", { variant: "error" });
      return;
    }
    try {
      await createModeloVersao({
        idMarca: Number(selectIdMarca),
        idModelo: Number(selectIdModelo),
        descricaoModeloVersao: data.descricaoModeloVersao,
        idModeloVersao: Number(id),
      });
      reset();
      enqueueSnackbar("Atualizado com Sucesso");
      push("/admin/modelo-versao");
    } catch (error: any) {
      enqueueSnackbar(error.response.data.mensagem, { variant: "error" });
    }
  };

  const handleGetAllMarcas = async () => {
    const marcas = await getMarcas({});
    const options = marcas.map((marca: IMarcas) => ({
      label: marca.descricaoMarca,
      id: marca.idMarca,
    }));
    setMarcas(options);
  };

  const handleGetAllModelos = async () => {
    if (selectIdMarca) {
      const modelo = await getModelos(Number(selectIdMarca));
      if (modelo) {
        const optionsModelo = modelo.map((model: any) => ({
          label: model.descricaoModelo,
          id: model.idModelo,
        }));
        setModelos(optionsModelo);
      }
    }
  };

  const loadData = useCallback(async () => {
    if (id) {
      const response = await getModeloVersao(Number(id));
      if (response) {
        setValue("descricaoModeloVersao", response[0].descricaoModeloVersao);
        setSelectIdMarca(response[0].idMarca);
        setSelectIdModelo(response[0].idModelo);

        setSelectOptionsMarca({
          label: response[0].descricaoMarca,
          id: response[0].idMarca,
        });
        setSelectOptionsModelo({
          label: response[0].descricaoModelo,
          id: response[0].idModelo,
        });
      }
    }
  }, [id]);

  const onSubmit = async (data: FormValuesProps) => {
    if (!id) {
      await onSubmitAdd(data);
    } else {
      await onSubmitEdit(data);
    }
  };

  useEffect(() => {
    loadData();
  }, [id]);

  useEffect(() => {
    handleGetAllMarcas();
  }, []);

  useEffect(() => {
    handleGetAllModelos();
  }, [selectIdMarca]);

  return (
    <>
      <Head>
        <title>
          {id ? "Editar Modelo Versão" : "Criar novo Modelo Versão"}
        </title>
      </Head>
      <Container maxWidth={false}>
        <CustomBreadcrumbs
          heading={id ? "Editar Modelo Versão" : "Criar novo Modelo Versão"}
          links={[
            {
              name: "Início",
              href: "/admin/dashboard",
            },
            {
              name: "Modelo Versão",
              href: "/admin/modelo-versao",
            },
            { name: "Novo Modelo Versão" },
          ]}
        />

        <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <Card sx={{ py: 6.5, px: 4 }}>
                <Box
                  sx={{
                    p: 1,
                  }}
                  rowGap={4}
                  columnGap={2}
                  display="grid"
                  gridTemplateColumns={{
                    xs: "repeat(1, 1fr)",
                    sm: "repeat(2, 1fr)",
                  }}
                >
                  <Autocomplete
                    clearIcon={null}
                    value={selectOptionsMarca || null}
                    onChange={(event, value) => {
                      setSelectOptionsMarca(value);
                      setSelectOptionsModelo(null);
                      setSelectIdModelo(null);
                      setSelectIdMarca(Number(value?.id));
                    }}
                    options={marcas}
                    renderInput={(params) => (
                      <TextField
                        sx={{ zIndex: 9999 }}
                        {...params}
                        label="Marcas"
                      />
                    )}
                  />

                  <Autocomplete
                    clearIcon={null}
                    sx={{
                      "& .Mui-disabled": {
                        backgroundColor: colors.grey[300],
                      },
                    }}
                    disabled={!selectIdMarca}
                    value={selectOptionsModelo ? selectOptionsModelo : null}
                    onChange={(event, value) =>
                      setSelectIdModelo(Number(value?.id))
                    }
                    options={modelos}
                    renderInput={(params) => (
                      <TextField
                        sx={{ zIndex: 9999 }}
                        {...params}
                        label="Modelos"
                      />
                    )}
                  />
                  <RHFTextField
                    InputLabelProps={{ shrink: true }}
                    name="descricaoModeloVersao"
                    label="Nome do Modelo Versão"
                    value={watchAllFields?.descricaoModeloVersao || ""}
                  />
                </Box>
                <Stack
                  sx={{
                    flexDirection: "row",
                    display: "flex",
                    mt: 3,
                    gap: 2,
                    justifyContent: "flex-end",
                  }}
                >
                  <LoadingButton
                    type="submit"
                    variant="contained"
                    loading={isSubmitting}
                  >
                    {!id ? "Criar Modelo" : "Salvar Mudanças"}
                  </LoadingButton>
                  <Button
                    variant="outlined"
                    color="inherit"
                    onClick={() => push("/admin/modelo-versao")}
                  >
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
