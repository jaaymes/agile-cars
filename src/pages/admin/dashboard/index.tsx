import React from 'react';

import Head from 'next/head';

import Image from '@/components/image';

import DashboardLayout from '@/layouts/AdminLayout';
import { StyledSection, StyledSectionBg } from '@/layouts/login/styles';
import { Container, Typography } from '@mui/material';

DashboardPage.getLayout = (page: React.ReactElement) => (
  <DashboardLayout>{page}</DashboardLayout>
);

export default function DashboardPage() {
  console.log('dashboard')
  return (
    <>
      <Head>
        <title>Pagina Inicial</title>
      </Head>
      <Container maxWidth={false}
        sx={{
          height: '100%',
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Typography variant="h3" sx={{ mb: 4, maxWidth: 580, textAlign: 'center' }}>
          {`Bem-vindo ao Gestor de Carros`}
        </Typography>
        <Image
          disabledEffect
          visibleByDefault
          alt="auth"
          src={'/assets/illustrations/illustration_dashboard.png'}
          sx={{ maxWidth: 320 }}
        />
      </Container>
    </>


  )
}
