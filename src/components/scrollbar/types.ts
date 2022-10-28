import { Props } from 'simplebar-react';

import { SxProps } from '@mui/material';
import { Theme } from '@mui/material/styles';

export interface ScrollbarProps extends Props {
  children?: React.ReactNode;
  sx?: SxProps<Theme>;
}
