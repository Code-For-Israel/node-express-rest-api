import useStaticTranslation from '@/hooks/useStaticTranslation'
import { Button, Chip, IconButton, Stack, Typography } from '@mui/material'
import type { Location } from 'LocationTypes'
import Image from 'next/image'
import LocationPinIcon from 'public/icons/location-pin.svg'
import WhatsAppIcon from 'public/icons/whatsapp.svg'

type Props = { location: Location; onClick: (location: Location) => void; focusMap: (location: Location) => void }

const LocationPreviewItem = ({ location, onClick, focusMap }: Props) => {
  const { t } = useStaticTranslation()
  const handleClick = () => {
    onClick(location)
  }

  return (
    <Stack
      direction="row"
      sx={{
        height: 100,
        py: 2,
        borderBottom: '1px solid #DFDFDF',
        width: '100%',
        justifyContent: 'flex-start',
        alignItems: 'center',
        textAlign: 'start',
        position: 'relative',
      }}
    >
      <Stack
        sx={{
          width: 70,
          height: '100%',
          borderRight: '1px solid #DFDFDF',
          justifyContent: 'center',
          alignItems: 'center',
          gap: 0.5,
          pr: 2,
        }}
        onClick={() => focusMap(location)}
      >
        <Image src={LocationPinIcon} alt="Location Icon" width={38} />
        {location.distance && (
          <>
            {location.distance >= 1000 ? (
              <Typography variant="body2" fontSize={16}>{`${(location.distance / 1000).toFixed(1)} ${t('km')}`}</Typography>
            ) : (
              <Typography variant="body2" fontSize={16}>{`${location.distance.toFixed(0)} ${t('meter')}`}</Typography>
            )}
          </>
        )}
      </Stack>
      <Stack direction={'column'} flex={1} gap={0.25} pl={2} sx={{ position: 'relative', width: 'calc(100% - 120px)' }}>
        <Stack gap={1.5} direction={'row'} alignItems={'center'}>
          <Typography variant="h2" overflow={'hidden'} textOverflow={'ellipsis'} whiteSpace={'nowrap'}>
            {location.Name_c}
          </Typography>
          {Boolean(location.RefrigeratedMedicines_c) && (
            <Chip
              size="small"
              sx={{
                fontSize: 12,
                bgcolor: '#E5EBFF',
                color: 'primary.main',
                fontWeight: 600,
                py: 0.25,
                px: 1,
                mb: -0.25,
                '& .MuiChip-label': {
                  p: 0,
                  m: 0,
                },
              }}
              color="primary"
              label={t('store_cold')}
            />
          )}
        </Stack>
        <Button
          variant="text"
          sx={{
            p: 0,
            textAlign: 'start',
            justifyContent: 'start',
            position: 'relative',
          }}
          onClick={handleClick}
          fullWidth={false}
        >
          <Typography sx={{ width: '100%', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{`${t('street')} ${
            location.FormattedAddress
          }`}</Typography>
        </Button>
      </Stack>
      {location.WhatsappNumber_c && (
        <IconButton disableRipple href={`https://api.whatsapp.com/send?phone=${location.WhatsappNumber_c}`} target="_blank">
          <Image src={WhatsAppIcon} alt="whatsapp" />
        </IconButton>
      )}
    </Stack>
  )
}

export default LocationPreviewItem
