import FormWizardProvider from '@/context/FormWizardProvider'
import '@/styles/globals.css'
import { theme } from '@/styles/theme'
import createCache from '@emotion/cache'
import { CacheProvider } from '@emotion/react'
import { ThemeProvider } from '@mui/material'
import CssBaseline from '@mui/material/CssBaseline'
import { appWithTranslation } from 'next-i18next'
import type { AppProps } from 'next/app'
import { prefixer } from 'stylis'
import rtlPlugin from 'stylis-plugin-rtl'

const App = ({ Component, pageProps }: AppProps) => {
  const cacheRtl = createCache({
    key: 'muirtl',
    stylisPlugins: [prefixer, rtlPlugin],
  })

  return (
    <ThemeProvider theme={theme}>
      <CacheProvider value={cacheRtl}>
        <CssBaseline />
        <FormWizardProvider>
          <Component {...pageProps} />
        </FormWizardProvider>
      </CacheProvider>
    </ThemeProvider>
  )
}

export default appWithTranslation(App)
