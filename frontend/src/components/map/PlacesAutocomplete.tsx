import useStaticTranslation from '@/hooks/useStaticTranslation'
import { Box, ClickAwayListener, List, ListItem, ListItemButton, ListItemText } from '@mui/material'
import usePlacesAutocomplete, { getGeocode, getLatLng } from 'use-places-autocomplete'
import Autocomplete from '../elements/Autocomplete'

type Props = { onSelect: (suggestion: any) => void }

const PlacesAutocomplete = ({ onSelect }: Props) => {
  const { t } = useStaticTranslation()
  const {
    ready,
    value,
    suggestions: { status, data },
    setValue,
    clearSuggestions,
  } = usePlacesAutocomplete({
    callbackName: 'initPlaces',
    requestOptions: {
      types: ['address'],
      language: 'he',
      componentRestrictions: { country: 'il' },
    },
    debounce: 500,
  })

  const handleInput = (text: string) => {
    setValue(text)
  }

  const handleSelect =
    ({ description }: any) =>
    () => {
      setValue(description, false)
      clearSuggestions()
      getGeocode({ address: description }).then(results => {
        const { lat, lng } = getLatLng(results[0])
        onSelect({ lat, lng })
      })
    }

  const renderSuggestions = () =>
    data.map(suggestion => {
      const {
        place_id,
        structured_formatting: { main_text, secondary_text },
      } = suggestion
      return (
        <ListItem key={place_id} disablePadding sx={{ borderBottom: '1px solid #DFDFDF', ':last-of-type': { borderBottom: 'none' } }}>
          <ListItemButton onClick={handleSelect(suggestion)}>
            <ListItemText>
              <strong>{main_text}</strong>
              {',  '}
              <small>{secondary_text}</small>
            </ListItemText>
          </ListItemButton>
        </ListItem>
      )
    })
  return (
    <>
      <Autocomplete onValueChange={handleInput} value={value} disabled={!ready} placeholder={t('map_search_placeholder')} />
      {status === 'OK' && (
        <ClickAwayListener onClickAway={clearSuggestions}>
          <Box
            sx={{
              mt: 0.5,
              background: 'white',
              borderRadius: 4,
              boxShadow: '0px 2px 4px 0px rgba(0, 0, 0, 0.05)',
              width: '100%',
              border: '2px solid #E3E3E3',
            }}
          >
            <List>{renderSuggestions()}</List>
          </Box>
        </ClickAwayListener>
      )}
    </>
  )
}

export default PlacesAutocomplete
