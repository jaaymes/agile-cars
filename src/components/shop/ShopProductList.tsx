import { useProduct } from '@/hooks/useProduct';

import { SkeletonProductItem } from '@/components/skeleton';

import { IProduct } from '@/@types/product';
import { Box, BoxProps, Pagination } from '@mui/material';

import ShopProductCard from './ShopProductCard';

interface Props extends BoxProps {
  products: IProduct[];
  loading: boolean;
}

export default function ShopProductList({ products, loading, ...other }: Props) {
  const { setPage, page, countPage } = useProduct()
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
        {(loading ? [...Array(5)] : products)?.map((product: IProduct, index) =>
          product ? (
            <ShopProductCard key={product.idVeiculo} product={product} />
          ) : (
            <SkeletonProductItem key={index} />
          )
        )}

      </Box>
      <Box sx={{ mt: 6, display: 'flex', justifyContent: 'center' }}>
        <Pagination
          onChange={(event, value) => setPage(value)}
          page={page}
          count={countPage} sx={{
            '& .MuiPaginationItem-root': {
              background: (theme) => theme.palette.background.paper,
            }
          }} />
      </Box>
    </>
  );
}
