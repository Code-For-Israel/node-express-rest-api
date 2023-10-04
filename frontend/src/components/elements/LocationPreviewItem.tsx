import AppChip from '@/components/elements/AppChip'
import useStaticTranslation from '@/hooks/useStaticTranslation'
import { renderLocationIcon } from '@/util/mapFunctions'
import { generateWALink } from '@/util/whatsapp'
import { Button, IconButton, Popover, Stack, Typography } from '@mui/material'
import type { Location } from 'LocationTypes'
import Image from 'next/image'
import WhatsAppIcon from 'public/icons/whatsapp.svg'
import { MouseEvent, memo, useState } from 'react'

type Props = { location: Location; onClick: (location: Location) => void; focusMap: (location: google.maps.LatLngLiteral) => void }

const LocationPreviewItem = ({ location, onClick, focusMap }: Props) => {
  const { t } = useStaticTranslation()
  const handleClick = () => {
    onClick(location)
  }
  const [showHoursEl, setShowHoursEl] = useState<HTMLButtonElement | null>(null)
  const openShowHours = (event: MouseEvent<HTMLButtonElement>) => {
    setShowHoursEl(event.currentTarget)
  }

  const closeShowHours = () => {
    setShowHoursEl(null)
  }

  const showHours = Boolean(showHoursEl)

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
      id={`listLocation-${location._id}`}
    >
      <Stack
        sx={{
          width: 70,
          height: '100%',
          borderRight: '1px solid #DFDFDF',
          justifyContent: 'center',
          alignItems: 'center',
          textAlign: 'center',
          gap: 0.5,
          pr: 2,
        }}
        onClick={() => {
          location.Coordinates_c && focusMap(location.Coordinates_c)
        }}
      >
        <Image src={renderLocationIcon(location)} alt="Location Icon" width={38} />
        {location.distance && (
          <>
            {location.distance >= 1000 ? (
              <Typography variant="body2" fontSize={16}>{`${(location.distance / 1000).toFixed(0)} ${t('km')}`}</Typography>
            ) : (
              <Typography variant="body2" fontSize={16}>{`${location.distance.toFixed(0)} ${t('meter')}`}</Typography>
            )}
          </>
        )}
      </Stack>
      <Stack direction={'column'} flex={1} gap={0.25} pl={2} sx={{ position: 'relative', width: 'calc(100% - 120px)' }}>
        <Stack gap={1.5} direction={'row'} alignItems={'center'}>
          <Typography variant="h2" overflow={'hidden'} textOverflow={'ellipsis'} whiteSpace={'nowrap'}>
            {location.OrganizationName_c ? `${t(location.OrganizationName_c)} ${location.Name_c}` : location.Name_c}
          </Typography>
          {`${location.RefrigeratedMedicines_c}`.toLowerCase() === 'true' && <AppChip label={t('store_cold')} />}
        </Stack>
        <Button
          variant="text"
          color="info"
          sx={{
            p: 0,
            textAlign: 'start',
            justifyContent: 'start',
            position: 'relative',
          }}
          onClick={handleClick}
          fullWidth={false}
        >
          <Typography sx={{ width: '100%', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{`${t('street_short')} ${
            location.FormattedAddress
          }`}</Typography>
        </Button>
        {location.OpeningHours_c && (
          <>
            <Button
              variant="text"
              color="primary"
              sx={{
                p: 0,
                width: 'fit-content',
                textDecoration: 'none',
                color: 'primary.main',
                fontSize: 16,
                fontWeight: 600,
                display: 'flex',
                alignItems: 'center',
              }}
              onClick={openShowHours}
              fullWidth={false}
              endIcon={<Image src="/icons/arrow-left.svg" alt="arrow left" width={8} height={10} style={{ marginTop: 1.5, marginRight: -2 }} />}
            >
              {t('opening_hours')}
            </Button>
            <Popover
              open={showHours}
              anchorEl={showHoursEl}
              onClose={closeShowHours}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'center',
              }}
              transformOrigin={{
                vertical: 'bottom',
                horizontal: 'center',
              }}
            >
              <Stack p={2}>
                <Typography textAlign={'center'} color="primary" sx={{ p: 0, m: 0, fontWeight: 600 }}>
                  {t('opening_hours')}
                </Typography>
                <Typography whiteSpace={'pre'} variant="body1">
                  {location.OpeningHours_c}
                </Typography>
              </Stack>
            </Popover>
          </>
        )}
      </Stack>
      {location.WhatsappNumber_c && (
        <IconButton disableRipple href={generateWALink(t('wa_default_text'), location.WhatsappNumber_c)} target="_blank">
          <Image src={WhatsAppIcon} alt="whatsapp" width={30} height={30} />
        </IconButton>
      )}
    </Stack>
  )
}

export default memo(LocationPreviewItem)
