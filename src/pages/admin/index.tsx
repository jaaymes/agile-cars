import { useEffect } from 'react';

import { useRouter } from 'next/router';

import { parseCookies } from 'nookies';

import AuthLoginForm from '@/components/auth/AuthLoginForm';

import LoginLayout from '@/layouts/login';
import { Stack, Typography } from '@mui/material';

export default function Login() {
  const { ['token']: token } = parseCookies();
  const router = useRouter();
  useEffect(() => {
    if (token) {
      router.push('/admin/dashboard');
    }
  }, []);
  return (
    <LoginLayout>
      <Stack spacing={2} sx={{ mb: 5, position: 'relative', alignItems: 'center' }}>
        <Typography variant="h4">Entrar no Gestor</Typography>
      </Stack>
      <AuthLoginForm />
    </LoginLayout>
  );
}