import { useEffect, useState } from 'react';

import { useRouter } from 'next/router';

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
  const { logout } = useAuth()
  const router = useRouter()

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    const IsAuthenticated = sessionStorage.getItem("IsAuthenticated");
    if (!Boolean(IsAuthenticated)) {
      logout()
    }
  }, [router]);

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
