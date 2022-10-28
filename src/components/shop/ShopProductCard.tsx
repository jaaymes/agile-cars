import { RiWhatsappLine } from 'react-icons/ri';

import Image from '@/components/image';
import Label from '@/components/label';

import { fCurrency } from '@/utils/formatNumber';

import { IProduct } from '@/@types/product';
import { Box, Card, Stack, Button, IconButton, colors } from '@mui/material';

type Props = {
  product: IProduct;
};

export default function ShopProductCard({ product }: Props) {
  return (
    <Card
      sx={{
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
        '&:hover': {
          opacity: 1,
          transform: 'scale(1.05)',
        },
      }}
    >

      <Box sx={{ position: 'relative', p: 1 }}>
        <Image alt={product.chassi} src={`data:image/png;base64,${product?.foto1 || product?.foto2}`} ratio="1/1" sx={{ borderRadius: 1.5 }} />
      </Box>
      <Stack spacing={1} sx={{ px: 2, display: 'flex', height: '100%' }} justifyContent="space-between" direction="column">
        <Stack direction="column" spacing={0.5}>
          <Box component="span" sx={{ fontSize: '12px', fontWeight: 700 }}>{product.descricaoMarca}</Box>
          <Box component="span" sx={{ fontSize: '12px' }}>{product.descricaoModelo}</Box>
          <Box component="span" sx={{ fontSize: '12px' }}>{product.descricaoModeloVersao}</Box>
          <Box component="span" sx={{ fontSize: '12px' }}>{`Cartegoria: ${product.descricaoCategoria}`}</Box>
          <Label
            variant="filled"
            color={Math.random() > 0.5 && 'info' || 'error' || 'warning' || 'success'}
            sx={{
              top: 16,
              right: 16,
              zIndex: 9,
              position: 'absolute',
              textTransform: 'uppercase',
            }}
          >
            {`R$ ${fCurrency(product.valor)}`}
          </Label>
        </Stack>

        <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ p: 1 }}>
          <IconButton sx={{
            color: colors.lightGreen[700],
            width: 30,
            height: 30,
            p: 0,
            '&:hover': {
              color: colors.lightGreen[500],
            }
          }}>
            <RiWhatsappLine />
          </IconButton>
          <Button> + Detalhes</Button>
        </Stack>
      </Stack>
    </Card>
  );
}
