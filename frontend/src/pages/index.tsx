import FormStep from '@/components/form/FormStep'
import { Box } from '@mui/material'
import { Assistant } from 'next/font/google'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { useEffect } from 'react'

const assistant = Assistant({ subsets: ['latin'] })

export default function Home() {
  const router = useRouter()

  useEffect(() => {
    router.beforePopState(({ url, as, options }) => {
      console.log(url, as, options)

      if (as !== '/' && as !== '/other') {
        // window.location.href = as
        console.log('TAKE ME HOME')
        return false
      }

      return false
    })
  }, [router])
  return (
    <>
      <Head>
        <title>חברים לרפואה</title>
        <meta name="description" content="חברים לרפואה- תרומת תרופות" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
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
    </>
  )
}
