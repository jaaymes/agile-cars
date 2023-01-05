import { useCallback, useEffect, useState } from "react";
import { useForm } from "react-hook-form";

import Head from "next/head";
import { useRouter } from "next/router";

import { useSnackbar } from "notistack";
import * as Yup from "yup";

import { yupResolver } from "@hookform/resolvers/yup";

import CustomBreadcrumbs from "@/components/custom-breadcrumbs";
import FormProvider, { RHFTextField } from "@/components/hook-form";
import LoadingScreen from "@/components/loading-screen";

import { createModelo, getMarcas, getModelo } from "@/services/products";

import DashboardLayout from "@/layouts/AdminLayout";
import { LoadingButton } from "@mui/lab";
import {
  Autocomplete,
  Box,
  Button,
  Card,
  Container,
  Grid,
  Stack,
  TextField,
} from "@mui/material";

import { IMarcas } from "../marcas";

interface FormValuesProps {
  descricaoModelo: string;
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
  const [isLoading, setIsLoading] = useState(false);
  const [selectIdMarca, setSelectIdMarca] = useState<number | null>(null);
  const [marcas, setMarcas] = useState<IOptions[]>([]);
  const [selectOptions, setSelectOptions] = useState<IOptions>();

  const NewModeloSchema = Yup.object().shape({
    descricaoModelo: Yup.string().required("Nome é obrigatório"),
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
      await createModelo({
        descricaoModelo: data.descricaoModelo,
        idMarca: Number(selectIdMarca),
      });
      enqueueSnackbar("Modelo criado com sucesso", { variant: "success" });
      push("/admin/modelos");
    } catch (error: any) {
      console.log("error", error);
      enqueueSnackbar(error.response.data.mensagem, { variant: "error" });
    }
  };

  const onSubmitEdit = async (data: FormValuesProps) => {
    try {
      await createModelo({
        descricaoModelo: data.descricaoModelo,
        idMarca: Number(selectIdMarca),
        idModelo: Number(id),
      });
      reset();
      enqueueSnackbar("Atualizado com Sucesso");
      push("/admin/modelos");
    } catch (error: any) {
      enqueueSnackbar(error.response.data.mensagem, { variant: "error" });
    }
  };

  const handleGetAllMarcas = async () => {
    setIsLoading(true);
    const marcas = await getMarcas({});
    const options = marcas.map((marca: IMarcas) => ({
      label: marca.descricaoMarca,
      id: marca.idMarca,
    }));
    setMarcas(options);
    setIsLoading(false);
  };

  const loadData = useCallback(async () => {
    if (id) {
      setIsLoading(true);
      const response = await getModelo(Number(id));
      if (response) {
        setValue("descricaoModelo", response[0].descricaoModelo);
        setSelectIdMarca(response[0].idMarca);
        setSelectOptions({
          label: response[0].descricaoMarca,
          id: response[0].idMarca,
        });
      }
      setIsLoading(false);
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

  return (
    <>
      <Head>
        <title>{id ? "Editar Modelo" : "Criar novo Modelo"}</title>
      </Head>
      {isLoading ? (
        <LoadingScreen />
      ) : (
        <Container maxWidth={false}>
          <CustomBreadcrumbs
            heading={id ? "Editar Modelo" : "Criar novo Modelo"}
            links={[
              {
                name: "Início",
                href: "/admin/dashboard",
              },
              {
                name: "Modelos",
                href: "/admin/modelos",
              },
              { name: "Novo Modelo" },
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
                      value={selectOptions || null}
                      onChange={(event, value) =>
                        setSelectIdMarca(Number(value?.id))
                      }
                      options={marcas}
                      renderInput={(params) => (
                        <TextField
                          sx={{ zIndex: 9999 }}
                          {...params}
                          label="Marcas"
                        />
                      )}
                    />

                    <RHFTextField
                      InputLabelProps={{ shrink: true }}
                      name="descricaoModelo"
                      label="Nome do Modelo"
                      value={watchAllFields.descricaoModelo || ""}
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
                      onClick={() => push("/admin/modelos")}
                    >
                      Cancelar
                    </Button>
                  </Stack>
                </Card>
              </Grid>
            </Grid>
          </FormProvider>
        </Container>
      )}
    </>
  );
}
