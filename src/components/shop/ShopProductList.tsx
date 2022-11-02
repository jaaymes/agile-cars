import { useEffect, useState } from 'react';

import { SkeletonProductItem } from '@/components/skeleton';

import { IProduct } from '@/@types/product';
import { Box, BoxProps, Button, Typography } from '@mui/material';

import ShopProductCard from './ShopProductCard';

interface Props extends BoxProps {
  products: IProduct[];
  loading: boolean;
}

export default function ShopProductList({ products, loading, ...other }: Props) {
  const [numberOfitemsShown, setNumberOfItemsToShown] = useState(10);

  const showMore = () => {
    if (numberOfitemsShown + 3 <= products.length) {
      setNumberOfItemsToShown(numberOfitemsShown + 5);
    } else {
      setNumberOfItemsToShown(products.length);
    }
  };

  return (
    <>
      <Box
        gap={3}
        display="grid"
        gridTemplateColumns={{
          xs: 'repeat(1, 1fr)',
          sm: 'repeat(2, 1fr)',
          md: 'repeat(4, 1fr)',
          lg: 'repeat(5, 1fr)',
        }}
        {...other}
      >
        {(loading ? [...Array(5)] : products).slice(0, numberOfitemsShown).map((product: IProduct, index) =>
          product ? (
            <ShopProductCard key={product.idVeiculo} product={product} />
          ) : (
            <SkeletonProductItem key={index} />
          )
        )}

      </Box>
      <Box sx={{ mt: 3, display: 'flex', justifyContent: 'center' }}>
        {
          products?.length >= numberOfitemsShown && (
            <Button sx={{ p: 2, mt: 2 }}>
              <Typography onClick={showMore}>
                + Mostrar mais
              </Typography>
            </Button>
          )
        }
      </Box>
    </>
  );
}
