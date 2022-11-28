import { useEffect, useState } from 'react';

import Head from 'next/head';
import NextLink from 'next/link';
import { useRouter } from 'next/router';

import { isBrowser } from 'framer-motion';

import { useAuth } from '@/hooks/useAuth';

import CustomBreadcrumbs from '@/components/custom-breadcrumbs';
import Iconify from '@/components/iconify';
import LoadingScreen from '@/components/loading-screen';
import Scrollbar from '@/components/scrollbar';
import {
  useTable,
  emptyRows,
  TableNoData,
  TableEmptyRows,
  TableHeadCustom,
  TablePaginationCustom,
} from '@/components/table';
import { UserTableRow } from '@/components/userTable';

import { deleteColaborador, getColaboradores } from '@/services/colaboradores';

import DashboardLayout from '@/layouts/AdminLayout';
import {
  Table,
  Button,
  TableBody,
  Container,
  TableContainer
} from '@mui/material';

const TABLE_HEAD = [
  { id: 'descricaoFuncionario', label: 'Nome', align: 'left' },
  { id: 'descricaoFranqueado', label: 'Franqueadora', align: 'left' },
  { id: 'idSituacao', label: 'Status', align: 'left' },
  { id: 'actions', label: 'Ações', align: 'center' },
];

ColaboladoresPage.getLayout = (page: React.ReactElement) => <DashboardLayout>{page}</DashboardLayout>;

export default function ColaboladoresPage() {
  const {
    page,
    order,
    orderBy,
    rowsPerPage,
    onSort,
    onChangePage,
    onChangeRowsPerPage,
  } = useTable();

  const { user } = useAuth()

  const { push } = useRouter();

  const [isSSR, setIsSSR] = useState(true);

  const [colaboradores, setColaboradores] = useState<IColaboradores[]>([])
  const [isLoading, setIsLoading] = useState(false)
  // setRodandoLocal
  const [rodandoLocal, setRodandoLocal] = useState(false)

  const dataInPage = colaboradores.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);

  const handleDeleteRow = async (id: number) => {
    await deleteColaborador(id, user.idfranqueado)
    const newColaboradores = colaboradores.filter((colaborador) => colaborador.idFuncionario !== id)
    setColaboradores(newColaboradores)
  };

  const handleEditRow = (id: number) => {
    rodandoLocal ? push(`/admin/colaboradores/create?id=${id}`) : push(`/admin/colaboradores/create.html?id=${id}`)
  };

  const handleGetAllColaboradores = async () => {
    setIsLoading(true)
    const colaboradores = await getColaboradores({
      idFranqueado: user?.idfranqueado
    })
    if (colaboradores) {
      setColaboradores(colaboradores.collection)
      setIsLoading(false)
    }
  }

  useEffect(() => {
    handleGetAllColaboradores()
  }, []);

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
        <title> Colaboradores: Lista</title>
      </Head>
      {
        isLoading ? (
          <LoadingScreen />
        ) :
          <Container maxWidth={false}>
            <CustomBreadcrumbs
              heading="Lista de Colaboradores"
              links={[
                { name: 'Inicio', href: rodandoLocal ? '/admin/dashboard' : '/admin/dashboard.html' },
                { name: 'Colaboradores', href: rodandoLocal ? '/admin/colaboradores' : '/admin/colaboradores.html' },
                { name: 'Lista' },
              ]}
              action={
                <NextLink href={rodandoLocal ? '/admin/colaboradores/create' : '/admin/colaboradores/create.html'} passHref>
                  <Button variant="contained" startIcon={<Iconify icon="eva:plus-fill" />}>
                    Novo Colaborador
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
                    rowCount={colaboradores.length}
                    onSort={onSort}
                  />
                  {
                    !isSSR && (
                      <TableBody>
                        {dataInPage
                          .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                          .map((row) => (
                            <UserTableRow
                              key={row.idFuncionario}
                              row={row}
                              onDeleteRow={() => handleDeleteRow(row.idFuncionario)}
                              onEditRow={() => handleEditRow(row.idFuncionario)}
                            />
                          ))}

                        <TableEmptyRows
                          emptyRows={emptyRows(page, rowsPerPage, colaboradores.length)}
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
      }
    </>
  );
}
