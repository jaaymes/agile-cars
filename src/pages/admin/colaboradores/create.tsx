import Head from 'next/head';

import CustomBreadcrumbs from '@/components/custom-breadcrumbs';
import UserNewEditForm from '@/components/user/UserNewEditForm';

import DashboardLayout from '@/layouts/AdminLayout';
import { Container } from '@mui/material';

UserCreatePage.getLayout = (page: React.ReactElement) => <DashboardLayout>{page}</DashboardLayout>;

export default function UserCreatePage() {
  return (
    <>
      <Head>
        <title>Criar novo Colaborador</title>
      </Head>
      <Container maxWidth={false}>
        <CustomBreadcrumbs
          heading="Criar novo colaborador"
          links={[
            {
              name: 'Início',
              href: '/',
            },
            {
              name: 'Colaboradores',
              href: '/admin/colaboradores',
            },
            { name: 'Novo Colaborador' },
          ]}
        />
        <UserNewEditForm />
      </Container>
    </>
  );
}
