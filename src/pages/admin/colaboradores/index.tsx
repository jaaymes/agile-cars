import { useEffect, useState } from 'react';

import Head from 'next/head';
import NextLink from 'next/link';
import { useRouter } from 'next/router';

import { isBrowser } from 'framer-motion';

import { useAuth } from '@/hooks/useAuth';

import ConfirmDialog from '@/components/confirm-dialog';
import CustomBreadcrumbs from '@/components/custom-breadcrumbs';
import Iconify from '@/components/iconify';
import Scrollbar from '@/components/scrollbar';
import {
  useTable,
  emptyRows,
  TableNoData,
  TableEmptyRows,
  TableHeadCustom,
  TableSelectedAction,
  TablePaginationCustom,
} from '@/components/table';
import { UserTableRow } from '@/components/user/list';

import { deleteColaborador, getColaboradores } from '@/services/colaboradores';

import DashboardLayout from '@/layouts/AdminLayout';
import {
  Table,
  Button,
  Tooltip,
  TableBody,
  Container,
  IconButton,
  TableContainer
} from '@mui/material';

const TABLE_HEAD = [
  { id: 'name', label: 'Nome', align: 'left' },
  { id: 'company', label: 'Franqueadora', align: 'left' },
  { id: 'status', label: 'Status', align: 'left' },
  { id: 'actions', label: 'Ações', align: 'center' },
];

UserListPage.getLayout = (page: React.ReactElement) => <DashboardLayout>{page}</DashboardLayout>;

export default function UserListPage() {
  const {
    page,
    order,
    orderBy,
    rowsPerPage,
    setPage,
    //
    selected,
    setSelected,
    onSelectRow,
    onSelectAllRows,
    //
    onSort,
    onChangePage,
    onChangeRowsPerPage,
  } = useTable();

  const { user } = useAuth()

  const { push } = useRouter();


  const [openConfirm, setOpenConfirm] = useState(false);

  const [isSSR, setIsSSR] = useState(true);

  const [colaboradores, setColaboradores] = useState<IColaboradores[]>([])

  const dataInPage = colaboradores.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);

  const handleOpenConfirm = () => {
    setOpenConfirm(true);
  };

  const handleCloseConfirm = () => {
    setOpenConfirm(false);
  };

  const handleDeleteRow = async (id: number) => {
    await deleteColaborador(id, user.idfranqueado)
    const newColaboradores = colaboradores.filter((colaborador) => colaborador.idFuncionario !== id)
    setColaboradores(newColaboradores)
  };

  const handleEditRow = (id: number) => {
    push(`/admin/colaboradores/create?id=${id}`);
  };

  const handleGetAllColaboradores = async () => {
    const colaboradores = await getColaboradores({
      idFranqueado: user?.idfranqueado
    })
    setColaboradores(colaboradores.collection)
  }

  useEffect(() => {
    handleGetAllColaboradores()
  }, []);

  useEffect(() => {
    if (isBrowser) {
      setIsSSR(false);
    }
  }, [isSSR]);


  return (
    <>
      <Head>
        <title> Colaboradores: Lista</title>
      </Head>

      <Container maxWidth={false}>
        <CustomBreadcrumbs
          heading="Lista de Colaboradores"
          links={[
            { name: 'Inicio', href: '/admin/dashboard' },
            { name: 'Colaboradores', href: '/admin/colaboradores' },
            { name: 'Lista' },
          ]}
          action={
            <NextLink href={'/admin/colaboradores/create'} passHref>
              <Button variant="contained" startIcon={<Iconify icon="eva:plus-fill" />}>
                Novo Colaborador
              </Button>
            </NextLink>
          }
        />


        <TableContainer sx={{ position: 'relative', overflow: 'unset' }}>
          <TableSelectedAction
            numSelected={selected.length}
            rowCount={colaboradores.length}
            onSelectAllRows={(checked) =>
              onSelectAllRows(
                checked,
                colaboradores.map((row) => String(row.idFuncionario))
              )
            }
            action={
              <Tooltip title="Delete">
                <IconButton color="primary" onClick={handleOpenConfirm}>
                  <Iconify icon="eva:trash-2-outline" />
                </IconButton>
              </Tooltip>
            }
          />

          <Scrollbar>

            <Table size={'medium'} sx={{ minWidth: 800 }}>
              <TableHeadCustom
                order={order}
                orderBy={orderBy}
                headLabel={TABLE_HEAD}
                rowCount={colaboradores.length}
                numSelected={selected.length}
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
    </>
  );
}
