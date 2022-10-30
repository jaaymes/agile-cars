import 'simplebar/src/simplebar.css';

import 'react-image-lightbox/style.css';

import 'mapbox-gl/dist/mapbox-gl.css';

import 'react-quill/dist/quill.snow.css';

import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

import 'react-lazy-load-image-component/src/effects/blur.css';


import { NextPage } from 'next';
import { AppProps } from 'next/app';
import Head from 'next/head';


import { ProductProvider } from '@/contexts/ProductContex';

import { MotionLazyContainer } from '@/components/animate';
import ProgressBar from '@/components/progress-bar';
import { ThemeSettings, SettingsProvider } from '@/components/settings';
import SnackbarProvider from '@/components/snackbar';

import ThemeProvider from '@/styles/theme';

import createEmotionCache from '@/utils/createEmotionCache';

import { CacheProvider, EmotionCache } from '@emotion/react';

const clientSideEmotionCache = createEmotionCache();

type NextPageWithLayout = NextPage & {
  getLayout?: (page: React.ReactElement) => React.ReactNode;
};

interface MyAppProps extends AppProps {
  emotionCache?: EmotionCache;
  Component: NextPageWithLayout;
}

export default function MyApp(props: MyAppProps) {
  const { Component, pageProps, emotionCache = clientSideEmotionCache } = props;

  const getLayout = Component.getLayout ?? ((page) => page);

  return (
    <CacheProvider value={emotionCache}>
      <Head>
        <meta name="viewport" content="initial-scale=1, width=device-width" />
      </Head>

      <SettingsProvider>
        <MotionLazyContainer>
          <ThemeProvider>
            <ThemeSettings>
              <SnackbarProvider>
                <ProductProvider>
                  <ProgressBar />
                  {getLayout(<Component {...pageProps} />)}
                </ProductProvider>
              </SnackbarProvider>
            </ThemeSettings>
          </ThemeProvider>
        </MotionLazyContainer>
      </SettingsProvider>
    </CacheProvider>
  );
}
