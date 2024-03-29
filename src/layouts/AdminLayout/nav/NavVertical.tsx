import { useEffect, useState } from 'react';

import { useRouter } from 'next/router';

import { useAuth } from '@/hooks/useAuth';
import useResponsive from '@/hooks/useResponsive';

import Logo from '@/components/logo';
import { NavSectionVertical } from '@/components/nav-section';
import Scrollbar from '@/components/scrollbar';

import { NAV } from '@/config';

import { Box, Stack, Drawer, Button } from '@mui/material';

import navConfig from './config';

type Props = {
  openNav: boolean;
  onCloseNav: VoidFunction;
};

export default function NavVertical({ openNav, onCloseNav }: Props) {
  const { pathname } = useRouter();
  const { logout } = useAuth()

  const isDesktop = useResponsive('up', 'lg');
  const [rodandoLocal, setRodandoLocal] = useState(false);
  const [config, setConfig] = useState(navConfig);

  useEffect(() => {
    if (openNav) {
      onCloseNav();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  useEffect(() => {
    if (window.location.hostname.toLocaleLowerCase().indexOf("agileveiculos") <= - 1) {
      setRodandoLocal(true);
    }
    else {
      setRodandoLocal(false);
      const newConfig = navConfig.map((item) => {
        const newItem = item.items.map(subitem => ({
          ...subitem,
          path: subitem.path + '.html'
        }))
        return {
          ...item,
          items: newItem
        }
      })
      setConfig(newConfig)
    }
  }, []);

  const renderContent = (
    <Scrollbar
      sx={{
        height: 1,
        '& .simplebar-content': {
          height: 1,
          display: 'flex',
          flexDirection: 'column',
        },
      }}
    >
      <Stack
        spacing={3}
        sx={{
          pt: 3,
          pb: 2,
          px: 2.5,
          flexShrink: 0,
        }}
      >
        <Logo href={rodandoLocal ? '/admin/dashboard' : '/admin/dashboard.html'} />

      </Stack>
      <NavSectionVertical sx={{ mt: 4 }} data={config} />

      <Box sx={{ flexGrow: 1 }} />

      <Button
        onClick={logout}
        variant='contained' sx={{
          width: '80%',
          m: 2
        }}>
        Sair
      </Button>

    </Scrollbar>
  );

  return (
    <Box
      component="nav"
      sx={{
        flexShrink: { lg: 0 },
        width: { lg: NAV.W_DASHBOARD },
      }}
    >
      {isDesktop ? (
        <Drawer
          open
          variant="permanent"
          PaperProps={{
            sx: {
              width: NAV.W_DASHBOARD,
              bgcolor: 'transparent',
              borderRightStyle: 'dashed',
            },
          }}
        >
          {renderContent}

        </Drawer>
      ) : (
        <Drawer
          open={openNav}
          onClose={onCloseNav}
          ModalProps={{
            keepMounted: true,
          }}
          PaperProps={{
            sx: {
              width: NAV.W_DASHBOARD,
            },
          }}
        >
          {renderContent}
        </Drawer>
      )}
    </Box>
  );
}
