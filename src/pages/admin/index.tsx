import { GetServerSideProps } from 'next';

import { parseCookies } from 'nookies';

import AuthLoginForm from '@/components/auth/AuthLoginForm';

import LoginLayout from '@/layouts/login';
import { Stack, Typography } from '@mui/material';

export default function Login() {
  return (
    <LoginLayout>
      <Stack spacing={2} sx={{ mb: 5, position: 'relative', alignItems: 'center' }}>
        <Typography variant="h4">Entrar no Gestor</Typography>
      </Stack>
      <AuthLoginForm />
    </LoginLayout>
  );
}


export const getServerSideProps: GetServerSideProps = async (context) => {
  const { ['token']: token } = parseCookies(context);

  if (token) {
    return {
      redirect: {
        destination: '/admin/dashboard',
        permanent: false,
      },
    };
  }

  return {
    props: {},
  };
}
