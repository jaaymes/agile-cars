import { Box } from '@mui/material';

import Header from '../LayoutShop/header';
import Main from '../LayoutShop/Main';

type Props = {
  children?: React.ReactNode;
};

export default function CompactLayout({ children }: Props) {
  return (
    <>
      <Header />

      <Box
        sx={{
          display: { lg: 'flex' },
          minHeight: { lg: 1 },
        }}
      >

        <Main>{children}</Main>
      </Box>
    </>
  );
}
