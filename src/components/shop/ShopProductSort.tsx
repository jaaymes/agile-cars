import { useState } from 'react';
import { Controller, useFormContext } from 'react-hook-form';

import Iconify from '@/components/iconify';
import MenuPopover from '@/components/menu-popover';

import { Button, MenuItem, Box, FormGroup } from '@mui/material';

const OPTIONS = [
  { value: 'featured', label: 'Featured' },
  { value: 'newest', label: 'Newest' },
  { value: 'priceDesc', label: 'Price: High - Low' },
  { value: 'priceAsc', label: 'Price: Low - High' },
];

function renderLabel(label: string) {
  return {
    featured: 'Featured',
    newest: 'Newest',
    priceDesc: 'Price: High - Low',
    priceAsc: 'Price: Low - High',
  }[label];
}

// ----------------------------------------------------------------------

export default function ShopProductSort() {
  const { control } = useFormContext();

  const [openPopover, setOpenPopover] = useState<HTMLElement | null>(null);

  const handleOpenPopover = (event: React.MouseEvent<HTMLElement>) => {
    setOpenPopover(event.currentTarget);
  };

  const handleClosePopover = () => {
    setOpenPopover(null);
  };

  return (
    <Controller
      name="sortBy"
      control={control}
      render={({ field }) => (
        <FormGroup>
          <Button
            disableRipple
            color="inherit"
            onClick={handleOpenPopover}
            endIcon={
              <Iconify icon={openPopover ? 'eva:chevron-up-fill' : 'eva:chevron-down-fill'} />
            }
            sx={{ fontWeight: 'fontWeightMedium', display: 'flex', justifyContent: 'flex-start' }}
          >
            Ordenar por:
            <Box component="span" sx={{ color: 'text.secondary', ml: 0.5 }}>
              {renderLabel(field.value)}
            </Box>
          </Button>

          <MenuPopover open={openPopover} onClose={handleClosePopover}>
            {OPTIONS.map((option) => (
              <MenuItem
                key={option.value}
                selected={option.value === field.value}
                onClick={() => {
                  handleClosePopover();
                  field.onChange(option.value);
                }}
              >
                {option.label}
              </MenuItem>
            ))}
          </MenuPopover>
        </FormGroup>
      )}
    />
  );
}
