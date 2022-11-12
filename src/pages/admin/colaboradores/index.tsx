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
  getComparator,
  emptyRows,
  TableNoData,
  TableEmptyRows,
  TableHeadCustom,
  TableSelectedAction,
  TablePaginationCustom,
} from '@/components/table';
import { UserTableRow, UserTableToolbar } from '@/components/user/list';

import { getColaboradores } from '@/services/colaboradores';
import { getFranqueados } from '@/services/franqueados';

// import { _userList } from '@/_mock/arrays';
import { IUserAccountGeneral } from '@/@types/user';
import DashboardLayout from '@/layouts/AdminLayout';
import {
  Tab,
  Tabs,
  Card,
  Table,
  Button,
  Tooltip,
  Divider,
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

  const handleDeleteRow = (id: string) => {
    const deleteRow = colaboradores.filter((row) => String(row.idFuncionario) !== id);
    setSelected([]);
    setColaboradores(deleteRow);

    if (page > 0) {
      if (dataInPage.length < 2) {
        setPage(page - 1);
      }
    }
  };

  const handleDeleteRows = (selected: string[]) => {
    const deleteRows = colaboradores.filter((row) => !selected.includes(String(row.idFuncionario)));
    setSelected([]);
    setColaboradores(deleteRows);

    if (page > 0) {
      if (selected.length === dataInPage.length) {
        setPage(page - 1);
      } else if (selected.length === dataInPage.length) {
        setPage(0);
      } else if (selected.length > dataInPage.length) {
        const newPage = Math.ceil((colaboradores.length - selected.length) / rowsPerPage) - 1;
        setPage(newPage);
      }
    }
  };

  const handleEditRow = (id: string) => {
    push(`/admin/colaboradores/create?id=${id}`);
  };

  const handleGetAllColaboradores = async () => {
    const colaboradores = await getColaboradores({
      idFranqueado: user?.idfranqueado
    })
    setColaboradores(colaboradores.collection)
    console.log("🚀 ~ file: index.tsx ~ line 180 ~ handleGetAllColaboradores ~ colaboradores", colaboradores)
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
                onSelectAllRows={(checked) =>
                  onSelectAllRows(
                    checked,
                    colaboradores.map((row) => String(row.idFuncionario))
                  )
                }
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
                          selected={selected.includes(String(row.idFuncionario))}
                          onSelectRow={() => onSelectRow(String(row.idFuncionario))}
                          onDeleteRow={() => handleDeleteRow(String(row.idFuncionario))}
                          onEditRow={() => handleEditRow(row.descricaoFuncionario)}
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

      <ConfirmDialog
        open={openConfirm}
        onClose={handleCloseConfirm}
        title="Delete"
        content={
          <>
            Are you sure want to delete <strong> {selected.length} </strong> items?
          </>
        }
        action={
          <Button
            variant="contained"
            color="error"
            onClick={() => {
              handleDeleteRows(selected);
              handleCloseConfirm();
            }}
          >
            Delete
          </Button>
        }
      />
    </>
  );
}

// ----------------------------------------------------------------------

function applyFilter({
  inputData,
  comparator,
  filterName,
  filterStatus,
  filterRole,
}: {
  inputData: IUserAccountGeneral[];
  comparator: (a: any, b: any) => number;
  filterName: string;
  filterStatus: string;
  filterRole: string;
}) {
  const stabilizedThis = inputData.map((el, index) => [el, index] as const);

  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });

  inputData = stabilizedThis.map((el) => el[0]);

  if (filterName) {
    inputData = inputData.filter(
      (user) => user.name.toLowerCase().indexOf(filterName.toLowerCase()) !== -1
    );
  }

  if (filterStatus !== 'todos') {
    inputData = inputData.filter((user) => user.status === filterStatus);
  }

  if (filterRole !== 'todos') {
    inputData = inputData.filter((user) => user.role === filterRole);
  }

  return inputData;
}
