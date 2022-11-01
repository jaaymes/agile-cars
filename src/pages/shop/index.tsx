import Head from 'next/head';

import { useProduct } from '@/hooks/useProduct';

import { ShopProductList, ShopProductSearch } from '@/components/shop';

import LayoutShop from '@/layouts/LayoutShop';
import { Typography, Stack, Box } from '@mui/material';

EcommerceShopPage.getLayout = (page: React.ReactElement) => (
  <LayoutShop>{page}</LayoutShop>
);

export default function EcommerceShopPage() {
  const { product } = useProduct()
  return (
    <>
      <Head>
        <title> Agile Motors | Store</title>
      </Head>
      <Box sx={{ p: 2 }}>
        <Stack
          spacing={2}
          direction={{ xs: 'column', sm: 'row' }}
          alignItems={{ sm: 'center' }}
          justifyContent="space-between"
          sx={{ mb: 2 }}
        >
          <ShopProductSearch />
        </Stack>

        <Stack sx={{ mb: 3 }}>
          {!product?.length && (
            <>
              <Typography variant="body1" gutterBottom alignSelf={"center"}>
                &nbsp;Nenhum Produto
              </Typography>
            </>
          )}
        </Stack>
        <ShopProductList products={product} loading={!product?.length} />
      </Box>
    </>
  );
}