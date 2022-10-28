import { alpha, Input, Stack, Typography } from "@mui/material";

const InputRange = ({ type }: { type: 'min' | 'max' }) => (
  <Stack direction="row" spacing={0.5} alignItems="center" sx={{ width: 1 }}>
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
      disableUnderline
      size="small"
      type={type}
      inputProps={{
        step: 10,
        min: 0,
        max: 200,
        type: 'number',
        'aria-labelledby': 'input-slider',
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