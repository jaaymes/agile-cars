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
import { VeiculosCustomTable } from '@/components/VeiculosCustomTable';

import { deleteVeiculo, getProductsList } from '@/services/products';

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
  { id: 'descricaoMarca', label: 'Marca', align: 'left' },
  { id: 'descricaoModelo', label: 'Modelo', align: 'left' },
  { id: 'descricaoModeloVersao', label: 'Modelo Versão', align: 'left' },
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
    onSort,
    onChangePage,
    onChangeRowsPerPage,
  } = useTable();

  const { push } = useRouter();

  const [isSSR, setIsSSR] = useState(true);
  const [rodandoLocal, setRodandoLocal] = useState(false)

  const { user } = useAuth()

  const [veiculos, setVeiculos] = useState<IProduct[]>([])
  const [isLoading, setIsLoading] = useState(false)

  const handleDeleteRow = async (id: number) => {
    await deleteVeiculo(id, user?.idfranqueado)
    const newVeiculos = veiculos.filter((veiculo) => veiculo.idVeiculo !== id)
    setVeiculos(newVeiculos)
  };

  const handleEditRow = (id: number) => {
    rodandoLocal ? push(`/admin/veiculos/create?id=${id}`) : push(`/admin/veiculos/create.html?id=${id}`)
  };

  const handleGetAllVeiculos = async () => {
    setIsLoading(true)
    await getProductsList({
      page: page + 1,
      pageSize: rowsPerPage,
      direction: order,
      order: orderBy
    }).then(response => {
      if (response) {
        console.log("🚀 ~ file: index.tsx ~ line 89 ~ handleGetAllVeiculos ~ response", response)
        setVeiculos(response.collection)
        setIsLoading(false)
      }
    }).catch(error => console.log(error))
  }

  useEffect(() => {
    handleGetAllVeiculos()
  }, [page, rowsPerPage, order]);

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
        <title> Franqueados: Lista</title>
      </Head>
      {
        isLoading ? (
          <LoadingScreen />
        ) :
          <Container maxWidth={false}>
            <CustomBreadcrumbs
              heading="Lista de Veiculos"
              links={[
                { name: 'Inicio', href: rodandoLocal ? '/admin/dashboard' : '/admin/dashboard.html' },
                { name: 'Veiculos', href: rodandoLocal ? '/admin/veiculos' : '/admin/veiculos.html' },
                { name: 'Lista' },
              ]}
              action={
                <NextLink href={rodandoLocal ? '/admin/veiculos/create' : '/admin/veiculos/create.html'} passHref>
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
                    onSort={onSort}
                  />
                  {
                    !isSSR && (
                      <TableBody>
                        {veiculos
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

                        <TableNoData isNotFound={!veiculos.length} />
                      </TableBody>
                    )
                  }

                </Table>
              </Scrollbar>
            </TableContainer>

            <TablePaginationCustom
              count={veiculos.length}
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
