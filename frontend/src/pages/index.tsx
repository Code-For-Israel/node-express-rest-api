import FormStep from '@/components/form/FormStep'
import { Box, Container } from '@mui/material'
import { Assistant } from 'next/font/google'
import Head from 'next/head'

const assistant = Assistant({ subsets: ['latin'] })

export default function Home() {
  return (
    <>
      <Head>
        <title>חברים לרפואה - מפת מוקדים</title>
        <meta name="description" content="חברים לרפואה - מפת מוקדים" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Container maxWidth="sm" sx={{ boxShadow: 2 }}>
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
