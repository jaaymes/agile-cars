import { useEffect, useState } from 'react';

import Head from 'next/head';
import NextLink from 'next/link';
import { useRouter } from 'next/router';

import { isBrowser } from 'framer-motion';

import { useAuth } from '@/hooks/useAuth';

import CustomBreadcrumbs from '@/components/custom-breadcrumbs';
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
import { VeiculosCustomTable } from '@/components/VeiculosCustomTable';

import { deleteFranqueado } from '@/services/franqueados';
import { deleteVeiculo, getProducts } from '@/services/products';

import { IProduct } from '@/@types/product';
import DashboardLayout from '@/layouts/AdminLayout';
import {
  Table,
  Button,
  TableBody,
  Container,
  TableContainer
} from '@mui/material';

const TABLE_HEAD = [
  { id: 'marca', label: 'Marca', align: 'left' },
  { id: 'modelo', label: 'Modelo', align: 'left' },
  { id: 'modeloVersao', label: 'Modelo Versão', align: 'left' },
  { id: 'franqueado', label: 'Franqueado', align: 'left' },
  { id: 'actions', label: 'Ações', align: 'center' },
];

VeiculosPage.getLayout = (page: React.ReactElement) => <DashboardLayout>{page}</DashboardLayout>;

export default function VeiculosPage() {
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

  const { push } = useRouter();

  const [isSSR, setIsSSR] = useState(true);

  const { user } = useAuth()

  const [veiculos, setVeiculos] = useState<IProduct[]>([])

  const dataInPage = veiculos.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);

  const handleDeleteRow = async (id: number) => {
    await deleteVeiculo(id, user?.idfranqueado)
    const newVeiculos = veiculos.filter((veiculo) => veiculo.idVeiculo !== id)
    setVeiculos(newVeiculos)
  };

  const handleEditRow = (id: number) => {
    push(`/admin/veiculos/create?id=${id}`);
  };

  const handleGetAllVeiculos = async () => {
    const veiculosResponse = await getProducts({})
    setVeiculos(veiculosResponse.collection)
  }

  useEffect(() => {
    handleGetAllVeiculos()
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
          heading="Lista de Veiculos"
          links={[
            { name: 'Inicio', href: '/admin/dashboard' },
            { name: 'Veiculos', href: '/admin/veiculos' },
            { name: 'Lista' },
          ]}
          action={
            <NextLink href={'/admin/veiculos/create'} passHref>
              <Button variant="contained" startIcon={<Iconify icon="eva:plus-fill" />}>
                Novo Veiculo
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
                rowCount={veiculos.length}
                numSelected={selected.length}
                onSort={onSort}
              />
              {
                !isSSR && (
                  <TableBody>
                    {dataInPage
                      .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                      .map((row) => (
                        <VeiculosCustomTable
                          key={row.idVeiculo}
                          row={row}
                          onDeleteRow={() => handleDeleteRow(row.idVeiculo)}
                          onEditRow={() => handleEditRow(row.idVeiculo)}
                        />
                      ))}

                    <TableEmptyRows
                      emptyRows={emptyRows(page, rowsPerPage, veiculos.length)}
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
