import { TableRow, TableCell } from '@mui/material';

import EmptyContent from '../empty-content';

type Props = {
  isNotFound: boolean;
  text?: string;
};

export default function TableNoData({ isNotFound, text }: Props) {
  return (
    <TableRow>
      {isNotFound ? (
        <TableCell colSpan={12}>
          <EmptyContent
            title={text ? text : "Sem Registros"}
            sx={{
              '& span.MuiBox-root': { height: 160 },
            }}
          />
        </TableCell>
      ) : (
        <TableCell colSpan={12} sx={{ p: 0 }} />
      )}
    </TableRow>
  );
}
