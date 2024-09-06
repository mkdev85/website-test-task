import { CustomQueryClientProvider } from '@/hoc/CustomQueryClientProvider';
import '@/styles/globals.css';
import { defaultTheme } from '@/ui-kit/theme/theme';
import { ThemeProvider } from '@mui/material';
import { AppCacheProvider } from '@mui/material-nextjs/v13-pagesRouter';

import type { AppProps } from 'next/app';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <AppCacheProvider {...pageProps}>
      <ThemeProvider theme={defaultTheme}>
        <CustomQueryClientProvider>
          <Component {...pageProps} />
        </CustomQueryClientProvider>
      </ThemeProvider>
    </AppCacheProvider>
  );
}
