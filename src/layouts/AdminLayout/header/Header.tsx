import useOffSetTop from '@/hooks/useOffSetTop';
import useResponsive from '@/hooks/useResponsive';

import Iconify from '@/components/iconify';
import SettingsDrawer from '@/components/settings/drawer';

import { bgBlur } from '@/utils/cssStyles';
import { InstallPWA } from '@/utils/Installpwa';

import { HEADER, NAV } from '@/config';

import { Stack, AppBar, Toolbar, IconButton } from '@mui/material';
import { useTheme } from '@mui/material/styles';


type Props = {
  onOpenNav?: VoidFunction;
};

export default function Header({ onOpenNav }: Props) {
  const theme = useTheme();

  const isDesktop = useResponsive('up', 'lg');

  const isOffset = useOffSetTop(HEADER.H_DASHBOARD_DESKTOP)

  const renderContent = (
    <>
      {
        onOpenNav && (
          !isDesktop && (
            <IconButton onClick={onOpenNav} sx={{ mr: 1, color: 'text.primary' }}>
              <Iconify icon="eva:menu-2-fill" />
            </IconButton>
          )
        )
      }

      <Stack
        flexGrow={1}
        direction="row"
        alignItems="center"
        justifyContent="flex-end"
        spacing={{ xs: 0.5, sm: 1.5 }}
      >
        <InstallPWA />
        <SettingsDrawer />
      </Stack>
    </>
  );

  return (
    <AppBar
      sx={{
        boxShadow: 'none',
        height: HEADER.H_MOBILE,
        zIndex: theme.zIndex.appBar + 1,
        ...bgBlur({
          color: theme.palette.background.default,
        }),
        transition: theme.transitions.create(['height'], {
          duration: theme.transitions.duration.shorter,
        }),
        ...(isDesktop && {
          width: onOpenNav ? `calc(100% - ${NAV.W_DASHBOARD + 1}px)` : '100%',
          height: HEADER.H_DASHBOARD_DESKTOP,
          ...(isOffset && {
            height: HEADER.H_DASHBOARD_DESKTOP_OFFSET,
          }),
        }),
      }}
    >
      <Toolbar
        sx={{
          height: 1,
          px: { lg: 5 },
        }}
      >
        {renderContent}
      </Toolbar>
    </AppBar>
  );
}
