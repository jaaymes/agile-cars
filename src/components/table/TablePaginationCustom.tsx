import {
  Box,
  SxProps,
  TablePagination,
  TablePaginationProps,
} from '@mui/material';
import { Theme } from '@mui/material/styles';

type Props = {
  sx?: SxProps<Theme>;
};

export default function TablePaginationCustom({
  rowsPerPageOptions = [5, 10, 20, 30, 50],
  sx,
  ...other
}: Props & TablePaginationProps) {
  return (
    <Box sx={{ position: 'relative', ...sx }}>
      <TablePagination
        labelRowsPerPage="Veiculos por página"
        labelDisplayedRows={({ from, to, count }) => `${from}-${to} de ${count !== -1 ? count : `mais de ${to}`}`}
        rowsPerPageOptions={rowsPerPageOptions} component="div" {...other} />
    </Box>
  );
}
