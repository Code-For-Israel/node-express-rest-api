import useStaticTranslation from '@/hooks/useStaticTranslation'
import { ButtonBase, Stack, SxProps, Theme } from '@mui/material'
import { useRouter } from 'next/router'

const BASE_BUTTON_STYLE: SxProps<Theme> = {
  fontSize: 14,
  borderRadius: 50,
  color: 'primary.main',
  fontWeight: 600,
  px: 2,
  py: 1,
  whiteSpace: 'nowrap',
  transition: 'all 0.2s ease-out',
}

const MapFilters = () => {
  const { t } = useStaticTranslation()
  const router = useRouter()
  const {
    query: { filter },
  } = router

  const handleFilterChange = (mapFilter: string) => () => {
    if (filter !== mapFilter) {
      if (mapFilter === 'all') {
        router.replace({ query: {} }, undefined, { shallow: true })
      } else router.replace({ query: { filter: mapFilter } }, undefined, { shallow: true })
    }
  }

  return (
    <Stack
      gap={2}
      direction="row"
      sx={{
        bgcolor: 'white',
        borderRadius: 50,
        height: 50,
        minWidth: 140,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        boxShadow: '0px 2px 3px 0px rgba(0, 0, 0, 0.12)',
        position: 'absolute',
        top: 80,
        right: '50%',
        transform: 'translateX(50%)',
        zIndex: 900,
        p: 0.2,
        px: 1,
      }}
    >
      <ButtonBase
        disableRipple
        onClick={handleFilterChange('all')}
        sx={{
          ...BASE_BUTTON_STYLE,
          bgcolor: !filter || filter === 'all' ? '#E5EBFF' : 'white',
        }}
      >
        {t('all_locations')}
      </ButtonBase>
      <ButtonBase
        disableRipple
        onClick={handleFilterChange('store_cold')}
        sx={{
          ...BASE_BUTTON_STYLE,
          bgcolor: filter === 'store_cold' ? '#E5EBFF' : 'white',
        }}
      >
        {t('store_cold')}
      </ButtonBase>
    </Stack>
  )
}

export default MapFilters
