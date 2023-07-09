import useFormWizard from '@/hooks/useFormWizard'
import useStaticTranslation from '@/hooks/useStaticTranslation'
import { Box, Button, Icon, Link, Stack, Typography } from '@mui/material'
import Image from 'next/image'
import BoxHeart from 'public/icons/box-heart.svg'
import CheckIcon from 'public/icons/check.svg'
const Home = () => {
  const { stepTo } = useFormWizard()
  const startForm = () => stepTo('quantity')
  const { t } = useStaticTranslation()

  return (
    <Stack gap={2} pb={3} alignItems={'center'} width={'100%'} justifyContent={'space-between'}>
      <Stack gap={1} alignItems={'center'}>
        <Box sx={{ mb: 2, display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100%' }}>
          <Image src={BoxHeart} alt="box" />
        </Box>
        <Typography variant="h1">{t('welcome_title')}</Typography>
        <Typography variant="body1">{t('welcome_subtitle')}</Typography>
      </Stack>
      <Stack gap={2} flex="1" pt={10} width={'100%'}>
        {['1', '2', '3'].map((num, index) => (
          <Stack key={index} direction="row" gap={2} width={'100%'} justifyContent={'center'} alignItems={'center'} position={'relative'}>
            <Icon
              sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              <Image src={CheckIcon} alt="check" />
            </Icon>
            <Typography sx={{ flex: 1, display: 'flex' }} variant="body1">
              {t(`welcome_benefits_${num}`)}
            </Typography>
          </Stack>
        ))}
      </Stack>
      <Typography variant="body2">
        *{t('welcome_disclaimer_1')} <Link>{t('welcome_disclaimer_2')}</Link>
      </Typography>
      <Button sx={{ mt: 1 }} onClick={startForm}>
        {t('welcome_start_cta')}
      </Button>
    </Stack>
  )
}

export default Home
