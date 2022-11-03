import { useEffect, useState } from 'react';

import Head from 'next/head';

import { useProduct } from '@/hooks/useProduct';

import { ShopProductList, ShopProductSearch } from '@/components/shop';

import { IProduct } from '@/@types/product';
import LayoutShop from '@/layouts/LayoutShop';
import { Typography, Stack, Box } from '@mui/material';

EcommerceShopPage.getLayout = (page: React.ReactElement) => (
  <LayoutShop>{page}</LayoutShop>
);

export default function EcommerceShopPage() {
  const { product } = useProduct()
  const [searchProducts, setSearchProducts] = useState('');
  const [searchResults, setSearchResults] = useState<IProduct[]>([]);

  const onChangeSearch = (event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
    setSearchProducts(event.target.value);
  }

  useEffect(() => {
    setSearchResults([])
    const results = product?.filter((product) => product.descricaoMarca.toLocaleLowerCase().includes(
      searchProducts
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '')
        .toLocaleLowerCase()
    ) ||
      product.descricaoModelo.toLocaleLowerCase().includes(
        searchProducts
          .normalize('NFD')
          .replace(/[\u0300-\u036f]/g, '')
          .toLocaleLowerCase()
      ))
    setSearchResults(results)
  }, [searchProducts]);

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
          <ShopProductSearch
            value={searchProducts}
            onChangeSearch={onChangeSearch}
          />
        </Stack>

        <Stack sx={{ mb: 3 }}>
          {!product?.length && (
            <>
              <Typography variant="h2" gutterBottom alignSelf={"center"}>
                &nbsp;Nenhum Produto
              </Typography>
            </>
          )}

          {
            searchProducts && (
              !searchResults?.length && (
                <>
                  <Typography variant="h2" gutterBottom alignSelf={"center"}>
                    &nbsp;Nenhum Produto
                  </Typography>
                </>
              )
            )
          }
        </Stack>
        <ShopProductList products={searchProducts.length ? searchResults : product} loading={searchProducts ? !searchResults.length : !product?.length} />
      </Box>
    </>
  );
}