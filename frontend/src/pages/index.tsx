import FormStep from '@/components/form/FormStep'
import { Box, Container, useMediaQuery, useTheme } from '@mui/material'
import { Assistant } from 'next/font/google'
import Head from 'next/head'

const assistant = Assistant({ subsets: ['latin'] })

export default function Home() {
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down('md'))

  return (
    <>
      <Head>
        <title>חברים לרפואה</title>
        <meta name="description" content="חברים לרפואה - תרומת תרופות" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Container maxWidth="sm" sx={{ boxShadow: isMobile ? 0 : 2, p: 0 }}>
        <Box
          component={'main'}
          className={assistant.className}
          sx={{
            height: '100svh',
            width: '100%',
            position: 'relative',
          }}
        >
          <FormStep />
        </Box>
      </Container>
    </>
  )
}
