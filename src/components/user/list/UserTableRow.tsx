import { useState } from 'react';

import ConfirmDialog from '@/components/confirm-dialog';
import Iconify from '@/components/iconify';
import Label from '@/components/label';
import MenuPopover from '@/components/menu-popover';

import { IUserAccountGeneral } from '@/@types/user';
import {
  Stack,
  Avatar,
  Button,
  Checkbox,
  TableRow,
  MenuItem,
  TableCell,
  IconButton,
  Typography,
} from '@mui/material';

type Props = {
  row: IColaboradores;
  selected: boolean;
  onEditRow: VoidFunction;
  onSelectRow: VoidFunction;
  onDeleteRow: VoidFunction;
};

export default function UserTableRow({
  row,
  selected,
  onEditRow,
  onSelectRow,
  onDeleteRow,
}: Props) {
  const [openConfirm, setOpenConfirm] = useState(false);

  const [openPopover, setOpenPopover] = useState<HTMLElement | null>(null);

  const handleOpenConfirm = () => {
    setOpenConfirm(true);
  };

  const handleCloseConfirm = () => {
    setOpenConfirm(false);
  };

  const handleOpenPopover = (event: React.MouseEvent<HTMLElement>) => {
    setOpenPopover(event.currentTarget);
  };

  const handleClosePopover = () => {
    setOpenPopover(null);
  };

  return (
    <>
      <TableRow hover selected={selected}>
        <TableCell padding="checkbox">
          <Checkbox checked={selected} onClick={onSelectRow} />
        </TableCell>

        <TableCell>
          <Stack direction="row" alignItems="center" spacing={2}>
            <Avatar alt={row.descricaoFuncionario} src={row.imagem} />

            <Typography variant="subtitle2" noWrap>
              {row.descricaoFuncionario}
            </Typography>
          </Stack>
        </TableCell>

        <TableCell align="left">{row.descricaoFranqueado}</TableCell>

        <TableCell align="left">
          <Label
            variant="soft"
            color={(row.idSituacao === 0 && 'error') || 'success'}
            sx={{ textTransform: 'capitalize' }}
          >
            {row.idSituacao === 1 ? 'Ativo' : 'Inativo'}
          </Label>
        </TableCell>

        <TableCell align="center">
          <IconButton onClick={() => {
            onEditRow();
            handleClosePopover();
          }}>
            <Iconify icon="eva:edit-fill" />
          </IconButton>
          <IconButton
            sx={{ color: 'error.main' }}
            onClick={() => {
              handleOpenConfirm();
              handleClosePopover();
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
          <Button variant="contained" color="error" onClick={onDeleteRow}>
            Deletar
          </Button>
        }
      />
    </>
  );
}
