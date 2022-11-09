// next
import AuthLoginForm from '@/components/auth/AuthLoginForm';

import LoginLayout from '@/layouts/login';
import { Alert, Stack, Typography } from '@mui/material';

export default function Login() {
  return (
    <LoginLayout>
      <Stack spacing={2} sx={{ mb: 5, position: 'relative', alignItems: 'center' }}>
        <Typography variant="h4">Entrar no Gestor</Typography>
      </Stack>

      <Alert severity="info" sx={{ mb: 3 }}>
        Use email : <strong>demo@minimals.cc</strong> / password :<strong> demo1234</strong>
      </Alert>

      <AuthLoginForm />
    </LoginLayout>
  );
}
