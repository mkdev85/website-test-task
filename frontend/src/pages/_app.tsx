import { ThemeProvider } from '@mui/material';
import { AppCacheProvider } from '@mui/material-nextjs/v13-pagesRouter';
import { SnackbarProvider } from 'notistack';

import type { AppProps } from 'next/app';

import { Layout } from '@/components/Layout/Layout';
import { CustomQueryClientProvider } from '@/hoc/CustomQueryClientProvider';
import '@/styles/globals.css';
import { defaultTheme } from '@/ui-kit/theme/theme';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <AppCacheProvider {...pageProps}>
      <ThemeProvider theme={defaultTheme}>
        <SnackbarProvider>
          <CustomQueryClientProvider>
            <Layout>
              <Component {...pageProps} />
            </Layout>
          </CustomQueryClientProvider>
        </SnackbarProvider>
      </ThemeProvider>
    </AppCacheProvider>
  );
}
