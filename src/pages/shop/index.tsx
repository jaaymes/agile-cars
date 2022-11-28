import { useEffect } from 'react';

import Head from 'next/head';
import { useRouter } from 'next/router';

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
  const router = useRouter();

  useEffect(() => {
    const rodandoLocal = (window.location.hostname.toLocaleLowerCase().indexOf("agileveiculos") <= - 1);
    if (!rodandoLocal) {
      router.push("/shop.html");
    }

  }, []);
  return (
    <>
      <Head>
        <title> Agile Veículos | Carros novos e usados</title>
      </Head>

      <Box sx={{ p: 2, alignContent: 'center' }}>
        <Box sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'start',
        }}>
          <Typography variant="h4" sx={{ mt: 2, mb: 2 }}>Carros novos e usados</Typography>
          <Typography variant="body2" sx={{ mb: 2 }}>Encontre o carro que você procura</Typography>
          <Typography variant="body2" sx={{ mb: 2 }}>{product?.length ? `${product?.length} carros encontrados` : null}</Typography>
          <ShopProductSort />
        </Box>
        {
          isLoading ?
            <LoadingBox />
            :
            <>
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
            </>
        }
      </Box>

    </>
  );
}