import { useEffect, useState } from 'react';

import Head from 'next/head';
import NextLink from 'next/link';
import { useRouter } from 'next/router';

import { isBrowser } from 'framer-motion';

import { useAuth } from '@/hooks/useAuth';

import CustomBreadcrumbs from '@/components/custom-breadcrumbs';
import { FranqueadoCustomTable } from '@/components/FranqueadoCustomTable';
import Iconify from '@/components/iconify';
import Scrollbar from '@/components/scrollbar';
import {
  useTable,
  emptyRows,
  TableNoData,
  TableEmptyRows,
  TableHeadCustom,
  TablePaginationCustom,
} from '@/components/table';

import { deleteFranqueado, getFranqueados } from '@/services/franqueados';

import DashboardLayout from '@/layouts/AdminLayout';
import {
  Table,
  Button,
  TableBody,
  Container,
  TableContainer
} from '@mui/material';

const TABLE_HEAD = [
  { id: 'name', label: 'Nome', align: 'left' },
  { id: 'status', label: 'Status', align: 'left' },
  { id: 'actions', label: 'Ações', align: 'center' },
];

FranqueadosPage.getLayout = (page: React.ReactElement) => <DashboardLayout>{page}</DashboardLayout>;

export default function FranqueadosPage() {
  const {
    page,
    order,
    orderBy,
    rowsPerPage,
    selected,
    onSort,
    onChangePage,
    onChangeRowsPerPage,
  } = useTable();

  const { user } = useAuth()

  const { push } = useRouter();

  const [isSSR, setIsSSR] = useState(true);

  const [franqueados, setFranqueados] = useState<IFranqueados[]>([])

  const dataInPage = franqueados.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);

  const handleDeleteRow = async (id: number) => {
    await deleteFranqueado(id, user.idfranqueado)
    const newFranqueados = franqueados.filter((colaborador) => colaborador.idFranqueado !== id)
    setFranqueados(newFranqueados)
  };

  const handleEditRow = (id: number) => {
    push(`/admin/franqueados/create?id=${id}`);
  };

  const handleGetAllFranqueados = async () => {
    const franqueados = await getFranqueados()
    setFranqueados(franqueados.collection)
  }

  useEffect(() => {
    handleGetAllFranqueados()
  }, []);

  useEffect(() => {
    if (isBrowser) {
      setIsSSR(false);
    }
  }, [isSSR]);

  return (
    <>
      <Head>
        <title> Franqueados: Lista</title>
      </Head>

      <Container maxWidth={false}>
        <CustomBreadcrumbs
          heading="Lista de Franqueados"
          links={[
            { name: 'Inicio', href: '/admin/dashboard' },
            { name: 'Franqueados', href: '/admin/franqueados' },
            { name: 'Lista' },
          ]}
          action={
            <NextLink href={'/admin/franqueados/create'} passHref>
              <Button variant="contained" startIcon={<Iconify icon="eva:plus-fill" />}>
                Novo Franqueado
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
                rowCount={franqueados.length}
                numSelected={selected.length}
                onSort={onSort}
              />
              {
                !isSSR && (
                  <TableBody>
                    {dataInPage
                      .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                      .map((row) => (
                        <FranqueadoCustomTable
                          key={row.idFranqueado}
                          row={row}
                          onDeleteRow={() => handleDeleteRow(row.idFranqueado)}
                          onEditRow={() => handleEditRow(row.idFranqueado)}
                        />
                      ))}

                    <TableEmptyRows
                      emptyRows={emptyRows(page, rowsPerPage, franqueados.length)}
                    />

                    <TableNoData isNotFound={!dataInPage.length} />
                  </TableBody>
                )
              }

            </Table>
          </Scrollbar>
        </TableContainer>

        <TablePaginationCustom
          count={dataInPage.length}
          page={page}
          rowsPerPage={rowsPerPage}
          onPageChange={onChangePage}
          onRowsPerPageChange={onChangeRowsPerPage}
        />
      </Container>
    </>
  );
}
