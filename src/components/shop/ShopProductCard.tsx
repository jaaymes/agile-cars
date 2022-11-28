import { useEffect, useState } from 'react';
import { RiWhatsappLine } from 'react-icons/ri';

import Link from 'next/link';
import { useRouter } from 'next/router';

import Image from '@/components/image';
import Label from '@/components/label';

import { fCurrency } from '@/utils/formatNumber';

import { IProduct } from '@/@types/product';
import { Box, Card, Stack, Button, IconButton, colors } from '@mui/material';

type Props = {
  product: IProduct;
};

export default function ShopProductCard({ product }: Props) {
  const router = useRouter();
  const [rodandoLocal, setRodandoLocal] = useState(false);
  const message = `${process.env.NEXT_PUBLIC_SITE}shop/veiculo?id=${product?.idVeiculo}&idFranqueado=${product?.idFranqueado}`

  const whatsappMessage = encodeURIComponent(message)

  const handleRedirectWhatsapp = () => {
    window.open(`https://api.whatsapp.com/send?phone=${product.whatsapp.replace('+', "")}&text=Olá, gostaria de mais informações sobre o veículo
    %0A%0A
    Link: ${whatsappMessage}
    `, '_blank');
  }


  useEffect(() => {
    if (window.location.hostname.toLocaleLowerCase().indexOf("agileveiculos") <= - 1)
      setRodandoLocal(true);
    else
      setRodandoLocal(false);
  }, [router, product]);

  // useEffect(() => {
  //   console.log('rodandoLocal', rodandoLocal)
  // }, [rodandoLocal]);

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
        <Image alt={product.chassi} src={product?.foto1 ? product?.foto1 : '/sem-imagem.png'} ratio="1/1" sx={{ borderRadius: 1.5 }} />
      </Box>
      <Stack spacing={1} sx={{ px: 2, display: 'flex', height: '100%' }} justifyContent="space-between" direction="column">
        <Stack direction="column" spacing={0.5}>
          <Box component="span" sx={{ fontSize: '12px', fontWeight: 700 }}>{product.descricaoMarca}</Box>
          <Box component="span" sx={{ fontSize: '12px' }}>{product.descricaoModelo}</Box>
          <Box component="span" sx={{ fontSize: '12px' }}>{product.descricaoModeloVersao}</Box>
          <Box component="span" sx={{ fontSize: '12px' }}>{`Cartegoria: ${product.descricaoCategoria}`}</Box>
          <Box component="span" sx={{ fontSize: '12px' }}>{`${product.fab}/${product.mod}`}</Box>
          <Box component="span" sx={{ fontSize: '12px' }}>{`KM: ${product.km}`}</Box>
          <Label
            variant="filled"
            sx={{
              top: 16,
              right: 16,
              zIndex: 9,
              position: 'absolute',
              textTransform: 'uppercase',
              backgroundColor: (theme) => theme.palette.primary.main,
              color: (theme) => theme.palette.primary.contrastText,
            }}
          >
            {`R$ ${fCurrency(product.valor)}`}
          </Label>
        </Stack>

        <Stack direction="row" alignItems="center" justifyContent="space-around" sx={{ pb: 1 }}>
          <IconButton
            onClick={handleRedirectWhatsapp}
            sx={{
              color: colors.lightGreen[700],
              width: 25,
              height: 25,
              p: 0,
              '&:hover': {
                color: colors.lightGreen[500],
              }
            }}>
            <RiWhatsappLine />
          </IconButton>


          <Link href={
            rodandoLocal ?
              `/shop/veiculo?id=${product?.idVeiculo}&idFranqueado=${product?.idFranqueado}`
              :
              `/shop/veiculo.html?id=${product?.idVeiculo}&idFranqueado=${product?.idFranqueado}`
          } passHref>
            {/* @ts-ignore */}
            <Button target="_blank" rel="noopener noreferrer" variant='contained' > + Detalhes</Button>
          </Link>


        </Stack>
      </Stack>
    </Card>
  );
}
