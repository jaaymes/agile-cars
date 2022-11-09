import { alpha, Input, Stack, Typography } from "@mui/material";

const InputRange = ({ type = '', value, setValue, id, letter, typeInput }: {
  type?: string, value: string, id: string, letter: string, typeInput?: string
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
      {`${type} ${letter} (R$)`}
    </Typography>
    <Input
      id={id}
      value={value}
      disableUnderline
      onChange={(event) => setValue(event)}
      size="small"
      type={type}
      inputProps={{
        type: typeInput || 'string',
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