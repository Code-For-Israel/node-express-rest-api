import { TextField, TextFieldProps } from '@mui/material'
import { forwardRef } from 'react'
import { FieldError, FieldErrorsImpl, Merge } from 'react-hook-form'

type FormFieldProps = {
  label: string
  type?: TextFieldProps['type']
  error?: FieldError | Merge<FieldError, FieldErrorsImpl<any>>
} & Omit<TextFieldProps, 'error' | 'label' | 'type'>

const FormField = forwardRef(({ label, type, error, ...rest }: FormFieldProps, ref) => {
  return (
    <TextField
      fullWidth
      inputRef={ref}
      variant="standard"
      type={type || 'text'}
      error={!!error}
      helperText={error ? `${error.message}` : ''}
      label={label}
      {...rest}
    />
  )
})

export default FormField
