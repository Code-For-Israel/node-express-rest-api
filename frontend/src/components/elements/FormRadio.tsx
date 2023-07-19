import { FormControlLabel, FormControlLabelProps, Radio } from '@mui/material'

type Props = { selected: string; value: string } & Omit<FormControlLabelProps, 'control'>

const FormRadio = ({ selected, value, ...rest }: Props) => {
  return (
    <FormControlLabel
      {...rest}
      value={value}
      control={<Radio size="small" />}
      sx={{
        borderRadius: 2,
        pr: 4,
        pl: 0.5,
        py: 1,
        // transition: 'border 0.2s ease-out',
        // borderWidth: 2,
        // borderStyle: 'solid',
        // borderColor: selected === value ? primaryColor : 'transparent',
      }}
    />
  )
}

export default FormRadio
