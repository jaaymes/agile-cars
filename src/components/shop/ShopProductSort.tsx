import { useEffect, useState } from 'react';

import { useProduct } from '@/hooks/useProduct';

import Iconify from '@/components/iconify';
import MenuPopover from '@/components/menu-popover';

import { Button, MenuItem, Box } from '@mui/material';

const OPTIONS = [
  // sem ordenacao
  { value: 'notOrder', label: 'Sem ordenação' },
  { value: 'valorAsc', label: 'Menor Preço' },
  { value: 'valorDesc', label: 'Maior Preço' },
  { value: 'anoAsc', label: 'Ano Mais Antigo' },
  { value: 'anoDesc', label: 'Ano Mais Novo' },
  { value: 'kmAsc', label: 'Menor KM' },
];

function renderLabel(label: string) {
  return {
    valorAsc: 'Menor Preço',
    valorDesc: 'Maior Preço',
    anoAsc: 'Ano Mais Antigo',
    anoDesc: 'Ano Mais Novo',
    kmAsc: 'Menor KM',
    notOrder: 'Sem ordenação',
  }[label];
}

export default function ShopProductSort() {
  const [openPopover, setOpenPopover] = useState<HTMLElement | null>(null);
  const [value, setValue] = useState('notOrder');
  const { setDirection, setOrder } = useProduct()

  const handleOpenPopover = (event: React.MouseEvent<HTMLElement>) => {
    setOpenPopover(event.currentTarget);
  };

  const handleClosePopover = () => {
    setOpenPopover(null);
  };

  useEffect(() => {
    if (value === 'notOrder') {
      setDirection(null)
      setOrder(null)
    }
    if (value === 'valorAsc') {
      setDirection('asc')
      setOrder('valor')
    }
    if (value === 'valorDesc') {
      setDirection('desc')
      setOrder('valor')
    }
    if (value === 'anoAsc') {
      setDirection('asc')
      setOrder('fab')
    }
    if (value === 'anoDesc') {
      setDirection('desc')
      setOrder('fab')
    }
    if (value === 'kmAsc') {
      setDirection('asc')
      setOrder('km')
    }
  }, [value]);

  return (
    <>
      <Button
        disableRipple
        color="inherit"
        onClick={handleOpenPopover}
        endIcon={
          <Iconify icon={openPopover ? 'eva:chevron-up-fill' : 'eva:chevron-down-fill'} />
        }
        sx={{ fontWeight: 'fontWeightMedium' }}
      >
        Ordenar por:
        <Box component="span" sx={{ color: 'text.secondary', ml: 0.5 }}>
          {renderLabel(value)}
        </Box>
      </Button>

      <MenuPopover open={openPopover} onClose={handleClosePopover}>
        {OPTIONS.map((option) => (
          <MenuItem
            key={option.value}
            selected={option.value === value}
            onClick={() => {
              handleClosePopover();
              setValue(option.value);
            }}
          >
            {option.label}
          </MenuItem>
        ))}
      </MenuPopover>
    </>
  );
}
