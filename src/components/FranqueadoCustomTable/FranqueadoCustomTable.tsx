import { useState } from 'react';

import ConfirmDialog from '@/components/confirm-dialog';
import Iconify from '@/components/iconify';
import Label from '@/components/label';

import {
  Stack,
  Button,
  TableRow,
  TableCell,
  IconButton,
  Typography,
} from '@mui/material';

type Props = {
  row: IFranqueados;
  onEditRow: VoidFunction;
  onDeleteRow: VoidFunction;
};

export default function FranqueadoCustomTable({
  row,
  onEditRow,
  onDeleteRow,
}: Props) {
  const [openConfirm, setOpenConfirm] = useState(false);

  const handleOpenConfirm = () => {
    setOpenConfirm(true);
  };

  const handleCloseConfirm = () => {
    setOpenConfirm(false);
  };

  return (
    <>
      <TableRow hover>
        <TableCell>
          <Stack direction="row" alignItems="center" spacing={2}>
            <Typography variant="subtitle2" noWrap>
              {row.descricaoFranqueado}
            </Typography>
          </Stack>
        </TableCell>

        <TableCell align="left">
          <Label
            variant="soft"
            color={(row.idSituacao === 2 && 'error') || 'success'}
            sx={{ textTransform: 'capitalize' }}
          >
            {row.idSituacao === 1 ? 'Ativo' : 'Inativo'}
          </Label>
        </TableCell>

        <TableCell align="center">
          <IconButton onClick={() => {
            onEditRow();
          }}>
            <Iconify icon="eva:edit-fill" />
          </IconButton>
          <IconButton
            sx={{ color: 'error.main' }}
            onClick={() => {
              handleOpenConfirm();
            }}>
            <Iconify icon="eva:trash-2-outline" />
          </IconButton>
        </TableCell>
      </TableRow>


      <ConfirmDialog
        open={openConfirm}
        onClose={handleCloseConfirm}
        title="Deletar"
        content="Tem certeza que quer deletar?"
        action={
          <Button variant="contained" color="error" onClick={() => {
            onDeleteRow()
            handleCloseConfirm()
          }
          }>
            Deletar
          </Button>
        }
      />
    </>
  );
}
