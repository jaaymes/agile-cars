import { useEffect, useState } from 'react';

import { useAuth } from '@/hooks/useAuth';

import { Box } from '@mui/material';

import Header from './header';
import Main from './Main';
import NavVertical from './nav/NavVertical';

type Props = {
  children?: React.ReactNode;
};

export default function DashboardLayout({ children }: Props) {
  const [open, setOpen] = useState(false);
  const { isAuthenticated, logout } = useAuth()

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    if (!isAuthenticated) {
      logout()
    }
  }, []);

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
