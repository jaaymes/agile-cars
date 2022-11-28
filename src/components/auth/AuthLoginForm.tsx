import { useState } from 'react';
import { useForm } from 'react-hook-form';

import * as Yup from 'yup';

import { useAuth } from '@/hooks/useAuth';

import { yupResolver } from '@hookform/resolvers/yup';

import { LoadingButton } from '@mui/lab';
import { Stack, IconButton, InputAdornment } from '@mui/material';

import FormProvider, { RHFTextField } from "../hook-form";
import Iconify from "../iconify";

type FormValuesProps = {
  colaborador: string;
  senha: string;
};

export default function AuthLoginForm() {
  const { login } = useAuth();

  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const LoginSchema = Yup.object().shape({
    colaborador: Yup.string().required('Colaborador é obrigatório'),
    senha: Yup.string().required('Senha é obrigatória')
  });

  const methods = useForm<FormValuesProps>({
    resolver: yupResolver(LoginSchema),
  });

  const {
    reset,
    handleSubmit,
    watch,
  } = methods;

  const allValues = watch();

  const onSubmit = async (data: FormValuesProps) => {
    try {
      setLoading(true);
      await login({
        descricaoFuncionario: data.colaborador,
        senha: data.senha
      });
      setLoading(false);
    } catch (error) {
      console.error(error);
      setLoading(false);
      reset();
    }
  };

  return (
    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
      <Stack spacing={3}>

        <RHFTextField name="colaborador" label="Colaborador" value={allValues.colaborador || ''} />

        <RHFTextField
          name="senha"
          label="Senha"
          value={allValues.senha || ''}
          type={showPassword ? 'text' : 'password'}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton onClick={() => setShowPassword(!showPassword)} edge="end">
                  <Iconify icon={showPassword ? 'eva:eye-fill' : 'eva:eye-off-fill'} />
                </IconButton>
              </InputAdornment>
            ),
          }}
        />

        <LoadingButton
          fullWidth
          color="inherit"
          size="large"
          type="submit"
          variant="contained"
          loading={loading}
          sx={{
            bgcolor: 'text.primary',
            color: (theme) => (theme.palette.mode === 'light' ? 'common.white' : 'grey.800'),
            '&:hover': {
              bgcolor: 'text.primary',
              color: (theme) => (theme.palette.mode === 'light' ? 'common.white' : 'grey.800'),
            },
          }}
        >
          Entrar
        </LoadingButton>
      </Stack>


    </FormProvider>
  );
}
