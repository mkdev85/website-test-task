import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { AppCacheProvider } from "@mui/material-nextjs/v13-pagesRouter";
import { ThemeProvider } from "@mui/material";
import { defaultTheme } from "@/ui-kit/theme/theme";
import { CustomQueryClientProvider } from "@/hoc/CustomQueryClientProvider";

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
