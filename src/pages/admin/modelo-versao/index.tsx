import { useEffect, useState } from 'react';

import Head from 'next/head';
import NextLink from 'next/link';
import { useRouter } from 'next/router';

import { isBrowser } from 'framer-motion';

import CustomBreadcrumbs from '@/components/custom-breadcrumbs';
import Iconify from '@/components/iconify';
import LoadingScreen from '@/components/loading-screen';
import { ModelosVersaoCustomTable } from '@/components/ModelosVersaoCustomTable';
import Scrollbar from '@/components/scrollbar';
import {
  useTable,
  emptyRows,
  TableNoData,
  TableEmptyRows,
  TableHeadCustom,
  TablePaginationCustom,
} from '@/components/table';

import { deleteModeloVersao, getMarcas, getModelos, getModelosVersao } from '@/services/products';

import DashboardLayout from '@/layouts/AdminLayout';
import {
  Table,
  Button,
  TableBody,
  Container,
  TableContainer,
  Stack,
  FormControl,
  Autocomplete,
  TextField
} from '@mui/material';

const TABLE_HEAD = [
  { id: 'name', label: 'Nome', align: 'left' },
  { id: 'actions', label: 'Ações', align: 'center' },
];

MarcasPage.getLayout = (page: React.ReactElement) => <DashboardLayout>{page}</DashboardLayout>;

export interface IMarcas {
  idMarca: number;
  descricaoMarca: string;
}

export interface IModelosVersao {
  idModeloVersao: number;
  descricaoModeloVersao: string;
}

interface IOptions {
  label: string;
  id: number;
}

export default function MarcasPage() {
  const {
    page,
    order,
    orderBy,
    rowsPerPage,
    onSort,
    onChangePage,
    onChangeRowsPerPage,
    setPage
  } = useTable();

  const { push } = useRouter();

  const [isSSR, setIsSSR] = useState(true);

  const [marcas, setMarcas] = useState<IOptions[]>([])
  const [modelos, setModelos] = useState<IOptions[]>([])
  const [modelosVersao, setModelosVersao] = useState<IModelosVersao[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [selectIdMarca, setSelectIdMarca] = useState<number | null>(null);
  const [selectIdModelo, setSelectIdModelo] = useState<number | null>(null);
  const [dataInPage, setDataInPage] = useState<IModelosVersao[]>([]);

  const handleDeleteRow = async (id: number) => {
    await deleteModeloVersao(id)
    const newFranqueados = modelosVersao.filter((colaborador) => colaborador.idModeloVersao !== id)
    setModelosVersao(newFranqueados)
  };

  const handleEditRow = (id: number) => {
    push(`/admin/modelo-versao/create?id=${id}`);
  };

  const handleGetAllMarcas = async () => {
    setIsLoading(true)
    const marcas = await getMarcas({})
    setMarcas(marcas?.map((marca: { descricaoMarca: any; idMarca: any; }) => ({ label: marca.descricaoMarca, id: marca.idMarca })))
    setIsLoading(false)
  }

  const handleGetAllModelos = async () => {
    setIsLoading(true)
    const modelos = await getModelos(Number(selectIdMarca))
    setModelos(modelos?.map((modelo: { descricaoModelo: any; idModelo: any; }) => ({ label: modelo.descricaoModelo, id: modelo.idModelo })))
    setIsLoading(false)
  }

  const handleGetModelosVersao = async () => {
    setIsLoading(true)
    const modelos = await getModelosVersao(Number(selectIdModelo))
    if (modelos) {
      setDataInPage(modelos?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage))
      setModelosVersao(modelos.collection)
      setIsLoading(false)
      setPage(0)
    }
  }

  useEffect(() => {
    handleGetAllMarcas()
  }, []);

  useEffect(() => {
    handleGetAllModelos()
  }, [selectIdMarca]);

  useEffect(() => {
    handleGetModelosVersao()
  }, [selectIdModelo]);

  useEffect(() => {
    if (isBrowser) {
      setIsSSR(false);
    }
  }, [isSSR]);

  return (
    <>
      <Head>
        <title> Modelo Versão: Lista</title>
      </Head>
      {
        isLoading ? (
          <LoadingScreen />
        ) :
          <Container maxWidth={false}>
            <CustomBreadcrumbs
              heading="Lista de Modelo Versão"
              links={[
                { name: 'Inicio', href: '/admin/dashboard' },
                { name: 'Modelo Versão', href: '/admin/modelo-versao' },
                { name: 'Lista' },
              ]}
              action={
                <NextLink href={'/admin/modelo-versao/create'} passHref>
                  <Button variant="contained" startIcon={<Iconify icon="eva:plus-fill" />}>
                    Nova Modelo Versão
                  </Button>
                </NextLink>
              }
            />
            <Stack
              spacing={2}
              alignItems="center"
              direction={{
                xs: 'column',
                md: 'row',
              }}
              sx={{ py: 3 }}
            >
              <FormControl fullWidth>
                <Autocomplete
                  noOptionsText="Nenhuma marca encontrada"
                  disablePortal
                  clearIcon={null}
                  value={marcas?.find((marca) => marca.id === selectIdMarca)}
                  onChange={(event, value) => {
                    setSelectIdModelo(null)
                    setSelectIdMarca(Number(value?.id))
                  }}
                  options={marcas}
                  renderInput={(params) => <TextField  {...params} label="Marcas" />}
                />
              </FormControl>
              <FormControl fullWidth>
                <Autocomplete
                  noOptionsText="Nenhum modelo encontrado"
                  clearIcon={null}
                  disablePortal
                  value={modelos?.find((modelos) => modelos.id === selectIdModelo)}
                  onChange={(event, value) => setSelectIdModelo(Number(value?.id))}
                  options={modelos}
                  renderInput={(params) => <TextField  {...params} label="Modelos" />}
                />
              </FormControl>
            </Stack>

            <TableContainer sx={{ position: 'relative', overflow: 'unset' }}>
              <Scrollbar>
                <Table size={'medium'} sx={{ minWidth: 800 }}>
                  <TableHeadCustom
                    order={order}
                    orderBy={orderBy}
                    headLabel={TABLE_HEAD}
                    rowCount={modelosVersao?.length}
                    onSort={onSort}
                  />
                  {
                    !isSSR && (
                      <TableBody>
                        {
                          dataInPage.map((row) => (
                            <ModelosVersaoCustomTable
                              key={row.idModeloVersao}
                              row={row}
                              onDeleteRow={() => handleDeleteRow(row.idModeloVersao)}
                              onEditRow={() => handleEditRow(row.idModeloVersao)}
                            />
                          )
                          )}

                        <TableEmptyRows
                          emptyRows={emptyRows(page, rowsPerPage, modelosVersao?.length)}
                        />

                        <TableNoData isNotFound={!dataInPage?.length} text="Escolha Marca e Modelo" />

                      </TableBody>
                    )
                  }
                </Table>
              </Scrollbar>
            </TableContainer>

            <TablePaginationCustom
              count={modelosVersao?.length}
              page={page}
              rowsPerPage={rowsPerPage}
              onPageChange={onChangePage}
              onRowsPerPageChange={onChangeRowsPerPage}
            />
          </Container>
      }
    </>
  );
}
