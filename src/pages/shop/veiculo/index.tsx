import { useEffect, useState } from 'react';

import Head from 'next/head';
import { useRouter } from 'next/router';

import CustomBreadcrumbs from '@/components/custom-breadcrumbs';
import ProductDetailsCarousel from '@/components/shop/ProductDetailsCarousel';
import ProductDetailsSummary from '@/components/shop/ProductDetailsSummary';
import { useSnackbar } from '@/components/snackbar';

import { getProducts } from '@/services/products';

import { IProduct } from '@/@types/product';
import CompactLayout from '@/layouts/compact';
import { Grid, Container } from '@mui/material';

ProductDetails.getLayout = (page: React.ReactElement) => (
  <CompactLayout>{page}</CompactLayout>
);

export default function ProductDetails() {

  const { query: { id, idFranqueado } } = useRouter();
  const { enqueueSnackbar } = useSnackbar();

  const [product, setProduct] = useState<IProduct | null>(null);

  const handleGetProduct = async (id: number, idFranqueado: number) => {

    try {
      const { collection } = await getProducts({
        id,
        idFranqueado
      });
      if (collection[0]) {
        collection[0].images = [collection[0]?.foto1, collection[0]?.foto2, collection[0]?.foto3, collection[0]?.foto4, collection[0]?.foto5, collection[0]?.foto6, collection[0]?.foto7, collection[0]?.foto8].filter(index =>
          index !== undefined)
        setProduct(collection[0]);
      }
    } catch (error: any) {
      enqueueSnackbar('Erro ao buscar produto', { variant: 'error' });
    }
  }

  useEffect(() => {
    if (id && idFranqueado) {
      handleGetProduct(Number(id), Number(idFranqueado));
    }
  }, [idFranqueado, id]);

  return (
    <>
      <Head>
        <title>{`Agile Motors: Detalhe`}</title>
      </Head>

      <Container maxWidth="lg">
        <CustomBreadcrumbs
          heading="Detalhes do Veículo"
          links={[
            { name: 'Início', href: '/' },
            { name: product?.descricaoModeloVersao },
          ]}
        />

        {product && (
          <>
            <Grid container spacing={3}>
              <Grid item xs={12} md={6} lg={7}>
                <ProductDetailsCarousel product={product} />
              </Grid>

              <Grid item xs={12} md={6} lg={5}>
                <ProductDetailsSummary product={product} />
              </Grid>
            </Grid>
          </>
        )}
      </Container>
    </>
  );
}
