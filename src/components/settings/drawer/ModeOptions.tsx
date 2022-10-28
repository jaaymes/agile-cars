import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import { IconButton } from '@mui/material';

import { useSettingsContext } from '../SettingsContext';

export default function ModeOptions() {
  const { themeMode, onChangeMode, onToggleMode } = useSettingsContext();

  return (
    <IconButton sx={{ ml: 1 }} onClick={onToggleMode} color="inherit">
      {themeMode === 'dark' ? <Brightness7Icon /> : <Brightness4Icon />}
    </IconButton>
  );
}
