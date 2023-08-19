import FormWizardProvider from '@/context/FormWizardProvider'
import LocaleProvider from '@/context/LocaleProvider'
import '@/styles/globals.css'
import { theme } from '@/styles/theme'
import createCache from '@emotion/cache'
import { CacheProvider } from '@emotion/react'
import { ThemeProvider } from '@mui/material'
import CssBaseline from '@mui/material/CssBaseline'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import LogRocket from 'logrocket'
import setupLogRocketReact from 'logrocket-react'
import mixpanel from 'mixpanel-browser'
import type { AppProps } from 'next/app'
import { prefixer } from 'stylis'
import rtlPlugin from 'stylis-plugin-rtl'

const queryClient = new QueryClient()
const App = ({ Component, pageProps }: AppProps) => {
  const cacheRtl = createCache({
    key: 'muirtl',
    stylisPlugins: [prefixer, rtlPlugin],
  })

  if (typeof window !== 'undefined') {
    mixpanel.init('bbf32a8fc5fb35ea2d00c5b8975749b2', { track_pageview: true, persistence: 'localStorage' })
    LogRocket.init('ja6ip5/haverim-lerefua')
    setupLogRocketReact(LogRocket)
  }

  return (
    <ThemeProvider theme={theme}>
      <LocaleProvider>
        <CacheProvider value={cacheRtl}>
          <CssBaseline />
          <QueryClientProvider client={queryClient}>
            <FormWizardProvider>
              <Component {...pageProps} />
            </FormWizardProvider>
          </QueryClientProvider>
        </CacheProvider>
      </LocaleProvider>
    </ThemeProvider>
  )
}

export default App
