import { useForm } from 'react-hook-form';

import Head from 'next/head';

import { useProduct } from '@/hooks/useProduct';

import FormProvider from '@/components/hook-form';
import { ShopProductList, ShopProductSearch } from '@/components/shop';

import { IProductFilter } from '@/@types/product';
import LayoutShop from '@/layouts/LayoutShop';
import { Typography, Stack, Box } from '@mui/material';

EcommerceShopPage.getLayout = (page: React.ReactElement) => (
  <LayoutShop>{page}</LayoutShop>
);

export default function EcommerceShopPage() {
  const { product } = useProduct()

  const defaultValues = {
    gender: [],
    category: 'All',
    colors: [],
    priceRange: [0, 200],
    rating: '',
    sortBy: 'featured',
  };

  const methods = useForm<IProductFilter>({
    defaultValues,
  });

  const {
    formState: { dirtyFields },
  } = methods;

  const isDefault =
    (!dirtyFields.optional &&
      !dirtyFields.category &&
      !dirtyFields.priceRange) || false;

  return (
    <>
      <Head>
        <title> Agile Motors | Store</title>
      </Head>

      <FormProvider methods={methods}>
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
          <ShopProductList products={product} loading={!product?.length && isDefault} />
        </Box>
      </FormProvider>
    </>
  );
}