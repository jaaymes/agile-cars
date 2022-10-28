import { useState } from 'react';

// @mui
import { bgBlur } from '@/utils/cssStyles';

import { NAV } from '@/config';

import { Box, Divider, Drawer, Stack, Typography, Tooltip, IconButton } from '@mui/material';
import { alpha, useTheme } from '@mui/material/styles';

import Iconify from '../../iconify';
import Scrollbar from '../../scrollbar';
import { defaultSettings } from '../config';
import { useSettingsContext } from '../SettingsContext';
import BadgeDot from './BadgeDot';
import Block from './Block';
import ColorPresetsOptions from './ColorPresetsOptions';
import DirectionOptions from './DirectionOptions';
import LayoutOptions from './LayoutOptions';
import ModeOptions from './ModeOptions';
import ToggleButton from './ToggleButton';

// ----------------------------------------------------------------------

const SPACING = 2.5;

export default function SettingsDrawer() {
  const {
    themeMode,
    themeLayout,
    themeStretch,
    themeContrast,
    themeDirection,
    themeColorPresets,
    onResetSetting,
  } = useSettingsContext();

  const theme = useTheme();

  const [open, setOpen] = useState(false);

  const handleToggle = () => {
    setOpen(!open);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const notDefault =
    themeMode !== defaultSettings.themeMode ||
    themeLayout !== defaultSettings.themeLayout ||
    themeStretch !== defaultSettings.themeStretch ||
    themeContrast !== defaultSettings.themeContrast ||
    themeDirection !== defaultSettings.themeDirection ||
    themeColorPresets !== defaultSettings.themeColorPresets;

  return (
    <>
      {!open && <ToggleButton open={open} notDefault={notDefault} onToggle={handleToggle} />}

      <Drawer
        anchor="right"
        open={open}
        onClose={handleClose}
        BackdropProps={{ invisible: true }}
        PaperProps={{
          sx: {
            ...bgBlur({ color: theme.palette.background.default, opacity: 0.9 }),
            width: NAV.W_BASE,
            boxShadow: (theme) =>
              `-24px 12px 40px 0 ${alpha(
                theme.palette.mode === 'light'
                  ? theme.palette.grey[500]
                  : theme.palette.common.black,
                0.16
              )}`,
          },
        }}
      >
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
          sx={{ py: 2, pr: 1, pl: SPACING }}
        >
          <Typography variant="subtitle1" sx={{ flexGrow: 1 }}>
            Configuração
          </Typography>

          <Tooltip title="Reset">
            <Box sx={{ position: 'relative' }}>
              {notDefault && <BadgeDot />}
              <IconButton onClick={onResetSetting}>
                <Iconify icon="ic:round-refresh" />
              </IconButton>
            </Box>
          </Tooltip>

          <IconButton onClick={handleClose}>
            <Iconify icon="eva:close-fill" />
          </IconButton>
        </Stack>

        <Divider sx={{ borderStyle: 'dashed' }} />

        <Scrollbar sx={{ p: SPACING, pb: 0 }}>
          <Block title="Mode">
            <ModeOptions />
          </Block>

          <Block title="Direction">
            <DirectionOptions />
          </Block>

          <Block title="Layout">
            <LayoutOptions />
          </Block>

          <Block title="Presets">
            <ColorPresetsOptions />
          </Block>
        </Scrollbar>
      </Drawer>
    </>
  );
}
