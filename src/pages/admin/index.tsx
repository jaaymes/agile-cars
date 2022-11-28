import { useEffect } from 'react';

import Head from 'next/head';
import { useRouter } from 'next/router';

import AuthLoginForm from '@/components/auth/AuthLoginForm';

import LoginLayout from '@/layouts/login';
import { Stack, Typography } from '@mui/material';

export default function Login() {
  const router = useRouter();

  useEffect(() => {
    const rodandoLocal = (window.location.hostname.toLocaleLowerCase().indexOf("agileveiculos") <= - 1);
    const token = sessionStorage.getItem("token");
    if (token) {
      if (rodandoLocal)
        router.push('/admin/dashboard');
      else
        router.push('/admin/dashboard.html');
    }
  }, []);
  return (
    <>
      <Head>
        <title>Agile Veículos | Login</title>
      </Head>
      <LoginLayout>
        <Stack spacing={2} sx={{ mb: 5, position: 'relative', alignItems: 'center' }}>
          <Typography variant="h4">Entrar no Gestor</Typography>
        </Stack>
        <AuthLoginForm />
      </LoginLayout>
    </>
  );

}