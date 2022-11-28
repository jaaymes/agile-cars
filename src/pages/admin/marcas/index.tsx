import { useEffect, useState } from 'react';

import Head from 'next/head';
import NextLink from 'next/link';
import { useRouter } from 'next/router';

import { isBrowser } from 'framer-motion';

import CustomBreadcrumbs from '@/components/custom-breadcrumbs';
import Iconify from '@/components/iconify';
import LoadingScreen from '@/components/loading-screen';
import { MarcasCustomTable } from '@/components/MarcasCustomTable';
import Scrollbar from '@/components/scrollbar';
import {
  useTable,
  emptyRows,
  TableNoData,
  TableEmptyRows,
  TableHeadCustom,
  TablePaginationCustom,
} from '@/components/table';

import { deleteMarca, getMarcas } from '@/services/products';

import DashboardLayout from '@/layouts/AdminLayout';
import {
  Table,
  Button,
  TableBody,
  Container,
  TableContainer
} from '@mui/material';

const TABLE_HEAD = [
  { id: 'descricaoMarca', label: 'Nome', align: 'left' },
  { id: 'actions', label: 'Ações', align: 'center' },
];

MarcasPage.getLayout = (page: React.ReactElement) => <DashboardLayout>{page}</DashboardLayout>;

export interface IMarcas {
  idMarca: number;
  descricaoMarca: string;
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
  } = useTable();

  const { push } = useRouter();

  const [isSSR, setIsSSR] = useState(true);

  const [marcas, setMarcas] = useState<IMarcas[]>([])
  const [isLoading, setIsLoading] = useState(false)

  const dataInPage = marcas?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);

  const handleDeleteRow = async (id: number) => {
    await deleteMarca(id)
    const newFranqueados = marcas.filter((colaborador) => colaborador.idMarca !== id)
    setMarcas(newFranqueados)
  };

  const [rodandoLocal, setrodandoLocal] = useState(true);

  useEffect(() => {
    if (window.location.hostname.toLocaleLowerCase().indexOf("agileveiculos") <= - 1)
      setrodandoLocal(true);
    else
      setrodandoLocal(false);
  }, [])


  const handleEditRow = (id: number) => {

    if (rodandoLocal)
      push(`/admin/marcas/create?id=${id}`);
    else
      push(`/admin/marcas/create.html?id=${id}`);
  };

  const handleGetAllMarcas = async () => {
    setIsLoading(true)
    const marcas = await getMarcas({
      ordenar: orderBy,
      direcao: order,
    })
    setMarcas(marcas)
    setIsLoading(false)
  }

  useEffect(() => {
    handleGetAllMarcas()
  }, [order, orderBy]);

  useEffect(() => {
    if (isBrowser) {
      setIsSSR(false);
    }
  }, [isSSR]);


  return (
    < >
      <Head>
        <title> Marcas: Lista</title>
      </Head>
      {
        isLoading ? (
          <LoadingScreen />
        ) :
          !isSSR && (

            <Container maxWidth={false}>
              <CustomBreadcrumbs
                heading="Lista de Marcas"
                links={[
                  { name: 'Inicio', href: rodandoLocal ? '/admin/dashboard' : '/admin/dashboard.html' },
                  { name: 'Marcas', href: rodandoLocal ? '/admin/marcas' : '/admin/marcas.html' },
                  { name: 'Lista' },
                ]}
                action={
                  <NextLink href={rodandoLocal ? '/admin/marcas/create' : '/admin/marcas/create.html'} passHref>
                    <Button variant="contained" startIcon={<Iconify icon="eva:plus-fill" />}>
                      Nova Marca
                    </Button>
                  </NextLink>
                }
              />

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
                    <TableBody>
                      {dataInPage.map((row) => (
                        <MarcasCustomTable
                          key={row.idMarca}
                          row={row}
                          onDeleteRow={() => handleDeleteRow(row.idMarca)}
                          onEditRow={() => handleEditRow(row.idMarca)}
                        />
                      ))}

                      <TableEmptyRows
                        emptyRows={emptyRows(page, rowsPerPage, marcas?.length)}
                      />

                      <TableNoData isNotFound={!dataInPage?.length} />
                    </TableBody>
                  </Table>
                </Scrollbar>
              </TableContainer>

              <TablePaginationCustom
                count={marcas?.length}
                page={page}
                rowsPerPage={rowsPerPage}
                onPageChange={onChangePage}
                onRowsPerPageChange={onChangeRowsPerPage}
              />
            </Container>
          )
      }
    </>
  );

}
