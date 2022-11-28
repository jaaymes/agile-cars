import { useEffect, useState } from 'react';

import Head from 'next/head';
import NextLink from 'next/link';
import { useRouter } from 'next/router';

import { isBrowser } from 'framer-motion';

import CustomBreadcrumbs from '@/components/custom-breadcrumbs';
import Iconify from '@/components/iconify';
import LoadingScreen from '@/components/loading-screen';
import { ModelosCustomTable } from '@/components/ModelosCustomTable';
import Scrollbar from '@/components/scrollbar';
import {
  useTable,
  emptyRows,
  TableNoData,
  TableEmptyRows,
  TableHeadCustom,
  TablePaginationCustom,
} from '@/components/table';

import { deleteMarca, getMarcas, getModelos } from '@/services/products';

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

export interface IModelos {
  idModelo: number;
  descricaoModelo: string;
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
  const [modelos, setModelos] = useState<IModelos[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [selectIdMarca, setSelectIdMarca] = useState<number | null>(1);
  const [rodandoLocal, setRodandoLocal] = useState(false)

  const dataInPage = modelos?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);

  const handleDeleteRow = async (id: number) => {
    await deleteMarca(id)
    const newFranqueados = modelos.filter((colaborador) => colaborador.idModelo !== id)
    setModelos(newFranqueados)
  };


  const handleEditRow = (id: number) => {
    rodandoLocal ? push(`/admin/modelos/create?id=${id}`) : push(`/admin/modelos/create.html?id=${id}`)
  };

  const handleGetAllMarcas = async () => {
    setIsLoading(true)
    const marcas = await getMarcas({})
    setMarcas(marcas.map((marca: { descricaoMarca: any; idMarca: any; }) => ({ label: marca.descricaoMarca, id: marca.idMarca })))
    setIsLoading(false)
  }

  const handleGetModelos = async () => {
    setIsLoading(true)
    const modelos = await getModelos(Number(selectIdMarca))
    setModelos(modelos)
    setIsLoading(false)
    setPage(0)
  }

  useEffect(() => {
    handleGetAllMarcas()
  }, []);

  useEffect(() => {
    handleGetModelos()
  }, [selectIdMarca]);

  useEffect(() => {
    if (isBrowser) {
      setIsSSR(false);
    }
  }, [isSSR]);

  useEffect(() => {
    if (window.location.hostname.toLocaleLowerCase().indexOf("agileveiculos") <= - 1)
      setRodandoLocal(true);
    else
      setRodandoLocal(false);
  }, []);

  return (
    <>
      <Head>
        <title> Marcas: Lista</title>
      </Head>
      {
        isLoading ? (
          <LoadingScreen />
        ) :
          <Container maxWidth={false}>
            <CustomBreadcrumbs
              heading="Lista de Modelos por Marca"
              links={[
                { name: 'Inicio', href: rodandoLocal ? '/admin/dashboard' : '/admin/dashboard.html' },
                { name: 'Modelos', href: rodandoLocal ? '/admin/modelos' : '/admin/modelos.html' },
                { name: 'Lista' },
              ]}
              action={
                <NextLink href={rodandoLocal ? '/admin/modelos/create' : '/admin/modelos/create.html'} passHref>
                  <Button variant="contained" startIcon={<Iconify icon="eva:plus-fill" />}>
                    Nova Modelo
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
                  clearIcon={null}
                  disablePortal
                  value={marcas.find((marca) => marca.id === selectIdMarca)}
                  onChange={(event, value) => setSelectIdMarca(Number(value?.id))}
                  options={marcas}
                  renderInput={(params) => <TextField  {...params} label="Marcas" />}
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
                    rowCount={marcas?.length}
                    onSort={onSort}
                  />
                  {
                    !isSSR && (
                      <TableBody>
                        {dataInPage?.map((row) => (
                          <ModelosCustomTable
                            key={row.idModelo}
                            row={row}
                            onDeleteRow={() => handleDeleteRow(row.idModelo)}
                            onEditRow={() => handleEditRow(row.idModelo)}
                          />
                        ))}

                        <TableEmptyRows
                          emptyRows={emptyRows(page, rowsPerPage, marcas?.length)}
                        />

                        <TableNoData isNotFound={!dataInPage?.length} />
                      </TableBody>
                    )
                  }
                </Table>
              </Scrollbar>
            </TableContainer>

            <TablePaginationCustom
              count={modelos?.length}
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
