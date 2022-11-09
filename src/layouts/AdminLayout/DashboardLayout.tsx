import { useState } from 'react';

import { Box } from '@mui/material';

import Header from './header';
import Main from './Main';
import NavVertical from './nav/NavVertical';

type Props = {
  children?: React.ReactNode;
};

export default function DashboardLayout({ children }: Props) {
  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <Header onOpenNav={handleOpen} />

      <Box
        sx={{
          display: { lg: 'flex' },
          minHeight: { lg: 1 },
        }}
      >
        <NavVertical openNav={open} onCloseNav={handleClose} />;

        <Main>{children}</Main>
      </Box>
    </>
  );
};
