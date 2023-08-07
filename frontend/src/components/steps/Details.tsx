import useFormWizard from '@/hooks/useFormWizard'
import useStaticTranslation from '@/hooks/useStaticTranslation'
import { generatWALink } from '@/util/whatsapp'
import { Box, Button, Link, Stack, TextField, TextFieldProps, Typography } from '@mui/material'
import { FormValuesType } from 'FormTypes'
import { FieldValues, UseFormRegister, useForm } from 'react-hook-form'

const Details = () => {
  const { stepTo, updateFormData, submitData } = useFormWizard()
  const link = generatWALink()
  const { t } = useStaticTranslation()
  const {
    register,
    handleSubmit,
    formState: { isValid },
    watch,
  } = useForm()

  const { fullName, town, street, houseNumber } = watch()

  const onSubmit = (data: FormValuesType) => {
    updateFormData(data)
    submitData('whatsapp')
    const waLink = generatWALink(123456789, t('whatsapp_message_with_cold', { fullName, street, houseNumber, town }))
    window.open(waLink, '_blank')
    stepTo('thank-you')
  }

  return (
    <Stack gap={2} pb={1} alignItems={'center'} width={'100%'} justifyContent={'space-between'} component={'form'} onSubmit={handleSubmit(onSubmit)}>
      <Stack gap={1} alignItems={'center'} textAlign={'center'}>
        <Typography variant="h1">{t('details_page_title')}</Typography>
        <Typography variant="body1">{t('details_page_subtitle')}</Typography>
      </Stack>
      <Stack gap={4} width={'100%'} flex={1} px={0.5}>
        <FormField name="fullName" label={t('full_name')} register={register} />
        <FormField name="phoneNumber" label={t('phone_number')} register={register} />
        <FormField name="town" label={t('town')} register={register} />
        <Box sx={{ display: 'grid', gap: 3, gridTemplateColumns: '1fr 1fr' }}>
          <FormField name="street" label={t('street')} register={register} />
          <FormField
            name="houseNumber"
            label={t('house_number')}
            register={register}
            type="number"
            InputProps={{ endAdornment: <img src="/icons/edit.svg" /> }}
          />
        </Box>
      </Stack>
      <Stack gap={2} width={'100%'} textAlign={'center'}>
        <Button type="submit" disabled={!isValid}>
          {t('confirm')}
        </Button>
        <Link color={'inherit'} href={link} target="_blank">
          {t('send_on_whatsapp')}
        </Link>
      </Stack>
    </Stack>
  )
}

export default Details

type FormFieldProps = {
  name: string
  label: string
  register: UseFormRegister<FieldValues>
  type?: TextFieldProps['type']
} & TextFieldProps

const FormField = ({ name, label, register, type, ...rest }: FormFieldProps) => {
  return (
    <TextField
      fullWidth
      variant="standard"
      type={type || 'text'}
      label={label}
      {...rest}
      {...register(name, {
        required: true,
      })}
    />
  )
}
