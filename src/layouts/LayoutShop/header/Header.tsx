// @mui
import { useState } from 'react';

import useOffSetTop from '@/hooks/useOffSetTop';
import useResponsive from '@/hooks/useResponsive';

import Iconify from '@/components/iconify';
import SettingsDrawer from '@/components/settings/drawer';
import Block from '@/components/settings/drawer/Block';
import ColorPresetsOptions from '@/components/settings/drawer/ColorPresetsOptions';
import ModeOptions from '@/components/settings/drawer/ModeOptions';

import { bgBlur } from '@/utils/cssStyles';

import { HEADER, NAV } from '@/config';

import InvertColorsIcon from '@mui/icons-material/InvertColors';
import { Stack, AppBar, Toolbar, IconButton, Tooltip, MenuItem, Menu } from '@mui/material';
import { useTheme } from '@mui/material/styles';

type Props = {
  onOpenNav?: VoidFunction;
};

export default function Header({ onOpenNav }: Props) {
  const theme = useTheme();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

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
        <SettingsDrawer />
        {/* <ModeOptions /> */}

        {/* 
        <>
          <Tooltip title="Trocar Cor">
            <IconButton
              onClick={handleClick}
              size="small"
              sx={{ ml: 2 }}
              aria-controls={open ? 'account-menu' : undefined}
              aria-haspopup="true"
              aria-expanded={open ? 'true' : undefined}
            >
              <InvertColorsIcon />
            </IconButton>
          </Tooltip>
          <Menu
            anchorEl={anchorEl}
            id="account-menu"
            open={open}
            onClose={handleClose}
            onClick={handleClose}
            sx={{
              '& .MuiMenu-paper': {
                width: 200,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }
            }}
            PaperProps={{
              elevation: 0,
              sx: {
                overflow: 'visible',
                filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                mt: 1.5,
                '& .MuiAvatar-root': {
                  width: 80,
                  height: 80,
                  ml: -0.5,
                  mr: 1,
                },
                '&:before': {
                  content: '""',
                  display: 'block',
                  position: 'absolute',
                  top: 0,
                  right: 14,
                  width: 10,
                  height: 10,
                  bgcolor: 'background.paper',
                  transform: 'translateY(-50%) rotate(45deg)',
                  zIndex: 0,
                },
              },
            }}
            transformOrigin={{ horizontal: 'right', vertical: 'top' }}
            anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
          >
            <Block title="Presets">
              <ColorPresetsOptions />
            </Block>
          </Menu>

        </> */}
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
