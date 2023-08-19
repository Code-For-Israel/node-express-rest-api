import { FormControlLabel, FormControlLabelProps, Radio } from '@mui/material'

type Props = { value: string } & Omit<FormControlLabelProps, 'control'>

const FormRadio = ({ value, ...rest }: Props) => {
  return <FormControlLabel {...rest} value={value} control={<Radio size="small" />} />
}

export default FormRadio
