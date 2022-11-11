import { useFormContext, Controller } from 'react-hook-form';

import { TextField, TextFieldProps } from '@mui/material';

type Props = TextFieldProps & {
  name: string;
};

export default function RHFTextField({ name, ...other }: Props) {
  const { control } = useFormContext();

  return (
    <Controller
      name={name}
      control={control}

      render={({ field, fieldState: { error } }) => (
        <TextField
          autoComplete='off'
          {...field}
          fullWidth
          value={typeof field.value === 'number' && field.value === 0 ? '' : field.value}
          error={!!error}
          helperText={error?.message}
          {...other}
        />
      )
      }
    />
  );
}
