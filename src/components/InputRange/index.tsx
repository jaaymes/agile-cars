import { alpha, Input, Stack, Typography } from "@mui/material";

const InputRange = ({ type, value, setValue, id }: {
  type: 'min' | 'max', value: string, id: string
  setValue: (event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => void
}) => (
  <Stack direction="row" spacing={0.5} alignItems="center" sx={{ width: '100%' }}>
    <Typography
      variant="caption"
      sx={{
        flexShrink: 0,
        color: 'text.disabled',
        textTransform: 'capitalize',
        fontWeight: 'fontWeightBold',
      }}
    >
      {`${type} (R$)`}
    </Typography>
    <Input
      id={id}
      value={value}
      disableUnderline
      onChange={(event) => setValue(event)}
      size="small"
      type={type}
      inputProps={{
        step: 500,
        min: 0,
        max: 400000,
        type: 'number',
      }}
      sx={{
        pr: 1,
        py: 0.5,
        borderRadius: 0.75,
        typography: 'body2',
        bgcolor: (theme) => alpha(theme.palette.grey[500], 0.12),
        '& .MuiInput-input': { p: 0, textAlign: 'right' },
      }}
    />
  </Stack>
)

export default InputRange;