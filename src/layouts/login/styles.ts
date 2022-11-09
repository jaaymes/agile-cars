
import { bgGradient } from '@/utils/cssStyles';

import { styled } from '@mui/material/styles';

export const StyledRoot = styled('main')(() => ({
  height: '100%',
  display: 'flex',
  position: 'relative',
}));

export const StyledSection = styled('div')(({ theme }) => ({
  display: 'none',
  position: 'relative',
  [theme.breakpoints.up('md')]: {
    flexGrow: 1,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
  },
}));

export const StyledSectionBg = styled('div')(({ theme }) => ({
  ...bgGradient({
    color: theme.palette.mode === 'light' ? theme.palette.primary.main : theme.palette.background.default,
    // color: alpha(theme.palette.background.default, theme.palette.mode === 'light' ? 0.9 : 0.94),
    imgUrl: '/assets/background/overlay_2.jpg',
  }),
  top: 0,
  left: 0,
  zIndex: -1,
  width: '100%',
  height: '100%',
  position: 'absolute',
  transform: 'scaleX(-1)',
}));

export const StyledContent = styled('div')(({ theme }) => ({
  width: 580,
  margin: 'auto',
  display: 'flex',
  height: '100vh!important',
  justifyContent: 'center',
  alignItems: 'center',
  padding: (theme.spacing(0, 8, 0, 8)),
  // padding: theme.spacing(20, 2),
  // [theme.breakpoints.up('md')]: {
  //   flexShrink: 0,
  //   padding: theme.spacing(30, 8, 0, 8),
  // },
}));
