import Head from 'next/head';

import { useProduct } from '@/hooks/useProduct';

import LoadingBox from '@/components/loading-box';
import { ShopProductList } from '@/components/shop';
import ShopProductSort from '@/components/shop/ShopProductSort';

import LayoutShop from '@/layouts/LayoutShop';
import { Typography, Stack, Box } from '@mui/material';

EcommerceShopPage.getLayout = (page: React.ReactElement) => (
  <LayoutShop>{page}</LayoutShop>
);

export default function EcommerceShopPage() {
  const { product, isLoading } = useProduct()
  return (
    <>
      <Head>
        <title> Agile Motors | Store</title>
      </Head>
      {
        isLoading ? (
          <LoadingBox />
        ) :
          <Box sx={{ p: 2 }}>
            <ShopProductSort />
            <Stack sx={{ mb: 3 }}>
              {!product?.length && (
                <>
                  <Typography variant="h2" gutterBottom alignSelf={"center"}>
                    &nbsp;Nenhum Produto
                  </Typography>
                </>
              )}
            </Stack>
            <ShopProductList products={product} loading={!product?.length} />
          </Box>
      }

    </>
  );
}