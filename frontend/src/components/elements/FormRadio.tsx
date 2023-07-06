import { primaryColor } from '@/styles/theme'
import { FormControlLabel, FormControlLabelProps, Radio } from '@mui/material'

type Props = { selected: string; value: string } & Omit<FormControlLabelProps, 'control'>

const FormRadio = ({ selected, value, ...rest }: Props) => {
  return (
    <FormControlLabel
      {...rest}
      value={value}
      control={<Radio size="small" />}
      sx={{
        transition: 'border 0.2s ease-out',
        borderRadius: 2,
        pr: 4,
        pl: 0.5,
        py: 1,
        borderWidth: 2,
        borderStyle: 'solid',
        borderColor: selected === value ? primaryColor : 'transparent',
      }}
    />
  )
}

export default FormRadio
