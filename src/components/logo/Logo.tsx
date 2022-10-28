import { forwardRef } from 'react';

import NextLink from 'next/link';

import { Box, Link, BoxProps } from '@mui/material';
import { useTheme as useThemeMui } from '@mui/material/styles';

import ImageWithFallback from '../ImageWithFallback';

export interface LogoProps extends BoxProps {
  disabledLink?: boolean;
}

const Logo = forwardRef<HTMLDivElement, LogoProps>(
  ({ disabledLink = false, sx }, ref) => {
    const theme = useThemeMui();
    const logo = (
      <Box
        sx={{
          backgroundColor: theme.palette.mode === 'dark' ? '#fff' : 'transparent',
          borderRadius: '10%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <ImageWithFallback
          src={'/assets/images/logo.png'}
          width={150}
          height={150}
          objectFit="contain"
        />
      </Box>
    );

    if (disabledLink) {
      return <>{logo}</>;
    }

    return (
      <NextLink href="/" passHref>
        <Link sx={{ display: 'contents' }}>{logo}</Link>
      </NextLink>
    );
  }
);

export default Logo;
