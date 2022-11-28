import { useEffect, useState } from 'react';

import Head from 'next/head';
import NextLink from 'next/link';
import { useRouter } from 'next/router';

import { isBrowser } from 'framer-motion';

import CustomBreadcrumbs from '@/components/custom-breadcrumbs';
import Iconify from '@/components/iconify';
import LoadingScreen from '@/components/loading-screen';
import { OpcionaisCustomTable } from '@/components/OpcionaisCustomTable';
import Scrollbar from '@/components/scrollbar';
import {
  useTable,
  emptyRows,
  TableNoData,
  TableEmptyRows,
  TableHeadCustom,
  TablePaginationCustom,
} from '@/components/table';

import { deleteOptional, getOptionais } from '@/services/filters';

import DashboardLayout from '@/layouts/AdminLayout';
import {
  Table,
  Button,
  TableBody,
  Container,
  TableContainer
} from '@mui/material';

const TABLE_HEAD = [
  { id: 'descricaoOpcional', label: 'Nome', align: 'left' },
  { id: 'actions', label: 'Ações', align: 'center' },
];

MarcasPage.getLayout = (page: React.ReactElement) => <DashboardLayout>{page}</DashboardLayout>;

interface IOptionals {
  idOpcional: number;
  descricaoOpcional: string;
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

  const [optionals, setOptionals] = useState<IOptionals[]>([]);
  const [isLoading, setIsLoading] = useState(false)
  const [rodandoLocal, setRodandoLocal] = useState(false)

  const dataInPage = optionals?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);

  const handleDeleteRow = async (id: number) => {
    await deleteOptional(id)
    const newFranqueados = optionals.filter((colaborador) => colaborador.idOpcional !== id)
    setOptionals(newFranqueados)
  };

  const handleEditRow = (id: number) => {
    rodandoLocal ? push(`/admin/opcionais/create?id=${id}`) : push(`/admin/opcionais/create.html?id=${id}`)
  };

  const handleGetAllOpcionais = async () => {
    setIsLoading(true)
    const opcionais = await getOptionais({
      ordenar: orderBy,
      direcao: order,
    })
    setOptionals(opcionais.collection)
    setIsLoading(false)
  }

  useEffect(() => {
    handleGetAllOpcionais()
  }, [orderBy, order]);

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
        <title> Opcionais: Lista</title>
      </Head>
      {
        isLoading ? (
          <LoadingScreen />
        ) :
          <Container maxWidth={false}>
            <CustomBreadcrumbs
              heading="Lista de Marcas"
              links={[
                { name: 'Inicio', href: rodandoLocal ? '/admin/dashboard' : '/admin/dashboard.html' },
                { name: 'Opcionais', href: rodandoLocal ? '/admin/opcionais' : '/admin/opcionais.html' },
                { name: 'Lista' },
              ]}
              action={
                <NextLink href={rodandoLocal ? '/admin/opcionais/create.html' : '/admin/opcionais/create'} passHref>
                  <Button variant="contained" startIcon={<Iconify icon="eva:plus-fill" />}>
                    Novo Opcional
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
                    rowCount={optionals?.length}
                    onSort={onSort}
                  />
                  {
                    !isSSR && (
                      <TableBody>
                        {dataInPage.map((row) => (
                          <OpcionaisCustomTable
                            key={row.idOpcional}
                            row={row}
                            onDeleteRow={() => handleDeleteRow(row.idOpcional)}
                            onEditRow={() => handleEditRow(row.idOpcional)}
                          />
                        ))}

                        <TableEmptyRows
                          emptyRows={emptyRows(page, rowsPerPage, optionals?.length)}
                        />

                        <TableNoData isNotFound={!dataInPage?.length} />
                      </TableBody>
                    )
                  }
                </Table>
              </Scrollbar>
            </TableContainer>

            <TablePaginationCustom
              count={optionals?.length}
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
