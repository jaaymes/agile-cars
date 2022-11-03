import { useState, useEffect } from 'react';
import { BsFillGearFill } from 'react-icons/bs';

import { bgBlur } from '@/utils/cssStyles';

import { Tooltip, Box } from '@mui/material';
import { alpha, useTheme } from '@mui/material/styles';

import { IconButtonAnimate } from '../../animate';
import BadgeDot from './BadgeDot';

type Props = {
  open: boolean;
  notDefault: boolean;
  onToggle: VoidFunction;
};

export default function ToggleButton({ notDefault, open, onToggle }: Props) {
  const theme = useTheme();

  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  if (!mounted) {
    return null;
  }

  return (
    <Box
      sx={{
        p: 0.5,
        right: 24,
        bottom: { xs: 2, md: 20 },
        zIndex: 999,
        position: 'fixed',
        borderRadius: '50%',
        ...bgBlur({ color: theme.palette.background.default }),
      }}
    >
      {notDefault && !open && (
        <BadgeDot
          sx={{
            top: 8,
            right: 10,
          }}
        />
      )}

      <Tooltip title="Settings">
        <IconButtonAnimate color="primary" onClick={onToggle} sx={{ p: 1.25 }}>
          <BsFillGearFill />
        </IconButtonAnimate>
      </Tooltip>
    </Box>
  );
}
