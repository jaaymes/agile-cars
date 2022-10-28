import { useState } from 'react';

import { Box } from '@mui/material';

import Header from './header';
import Main from './Main';
import NavVerticalFilters from './nav/NavVerticallFilters';

type Props = {
  children?: React.ReactNode;
};

export default function LayoutShop({ children }: Props) {
  const [open, setOpen] = useState(false);

  const handleClose = () => {
    setOpen(false);
  };

  const handleOpen = () => {
    setOpen(true);
  };

  const renderNavVertical = <NavVerticalFilters openNav={open} onCloseNav={handleClose} />;

  return (
    <>
      <Header onOpenNav={handleOpen} />

      <Box
        sx={{
          display: { lg: 'flex' },
          minHeight: { lg: 1 },
        }}
      >
        {renderNavVertical}

        <Main>{children}</Main>
      </Box>
    </>
  )
}
