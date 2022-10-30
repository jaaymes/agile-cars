import { RiWhatsappLine } from 'react-icons/ri';

import { fCurrencyBR, fNumber } from '@/utils/formatNumber';

import { IProduct } from '@/@types/product';
import { Stack, Button, Divider, Typography } from '@mui/material';

type Props = {
  product: IProduct;
};

export default function ProductDetailsSummary({
  product,
}: Props) {
  return (
    <Stack
      spacing={3}
      sx={{
        p: (theme) => ({
          md: theme.spacing(5, 5, 0, 2),
        }),
      }}
    >
      <Stack spacing={2}>

        <Typography variant="h5">{`${product?.descricaoMarca}, ${product?.descricaoModeloVersao}`}</Typography>

        <Typography variant="h5">
          {/* R$ {fCurrency(product?.valor)} */}
          Descrição
        </Typography>
      </Stack>

      <Divider sx={{ borderStyle: 'dashed' }} />

      <Stack direction="column" justifyContent="space-between">
        {
          product?.descricaoCategoria && (
            <Typography variant="subtitle2" sx={{ height: 40, lineHeight: '40px', flexGrow: 1 }}>
              Categoria: {product?.descricaoCategoria}
            </Typography>
          )
        }
        {
          product?.descricaoMarca && (
            <Typography variant="subtitle2" sx={{ height: 40, lineHeight: '40px', flexGrow: 1 }}>
              Marca: {product?.descricaoMarca}
            </Typography>
          )
        }
        {
          product?.descricaoModelo && (
            <Typography variant="subtitle2" sx={{ height: 40, lineHeight: '40px', flexGrow: 1 }}>
              Modelo: {product?.descricaoModelo}
            </Typography>
          )
        }
        {
          product?.descricaoModeloVersao && (
            <Typography variant="subtitle2" sx={{ height: 40, lineHeight: '40px', flexGrow: 1 }}>
              Modelo Versão: {product?.descricaoModeloVersao}
            </Typography>
          )
        }
        {
          product?.cor && (
            <Typography variant="subtitle2" sx={{ height: 40, lineHeight: '40px', flexGrow: 1 }}>
              Cor: {product?.cor}
            </Typography>
          )
        }
        {
          product?.km && (
            <Typography variant="subtitle2" sx={{ height: 40, lineHeight: '40px', flexGrow: 1 }}>
              Km: {fNumber(product?.km)}
            </Typography>
          )
        }
        {
          product?.fab && (
            <Typography variant="subtitle2" sx={{ height: 40, lineHeight: '40px', flexGrow: 1 }}>
              Ano: {product?.fab}
            </Typography>
          )
        }
        {
          product?.opcionais && (
            <Typography variant="subtitle2" sx={{ height: 40, lineHeight: '40px', flexGrow: 1 }}>
              Opcionais:
              <>
                {product?.opcionais}
              </>
            </Typography>
          )
        }

      </Stack>

      <Divider sx={{ borderStyle: 'dashed' }} />

      <Stack direction="column" alignItems="center" >
        <Typography variant="h3" sx={{ height: 50, lineHeight: '40px', flexGrow: 1 }}>
          R$ {fCurrencyBR(product?.valor)}
        </Typography>
      </Stack>

      <Stack direction="row" spacing={2} sx={{ alignSelf: 'center' }}>
        <Button
          onClick={() => window.open(`https://api.whatsapp.com/send?phone=${product?.whatsapp.replace('+', '')}&text=Olá, gostaria de mais informações sobre o veículo ${product?.descricaoMarca}, ${product?.descricaoModeloVersao}`, '_blank')}
          size="large"
          color="success"
          variant="contained"
          startIcon={<RiWhatsappLine />}
          sx={{ whiteSpace: 'nowrap' }}
        >
          Entrar em contato
        </Button>
      </Stack>
    </Stack>
  );
}
