import FormField from '@/components/elements/FormField'
import useFormWizard from '@/hooks/useFormWizard'
import useStaticTranslation from '@/hooks/useStaticTranslation'
import { generatWALink } from '@/util/whatsapp'
import { Box, Button, Link, Stack, Typography } from '@mui/material'
import { FormValuesType } from 'FormTypes'
import { formatIncompletePhoneNumber, isValidPhoneNumber } from 'libphonenumber-js'
import mixpanel from 'mixpanel-browser'
import { Controller, useForm } from 'react-hook-form'

const Details = () => {
  const { stepTo, updateFormData, submitData } = useFormWizard()
  const link = generatWALink()
  const { t } = useStaticTranslation()
  const { register, handleSubmit, formState, watch, control } = useForm({ mode: 'onChange' })

  const { fullName, town, street, houseNumber } = watch()
  const { isValid, errors } = formState

  const onSubmit = (data: FormValuesType) => {
    updateFormData(data)
    submitData('whatsapp')
    mixpanel.track('whatsapp_details_sent')
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
        <FormField
          error={errors?.fullName}
          label={t('full_name')}
          {...register('fullName', { required: true, minLength: 3, pattern: { value: /^[a-z\u0590-\u05fe]+$/i, message: t('invalid_name') } })}
        />
        <Controller
          control={control}
          defaultValue={''}
          render={({ field }) => (
            <FormField
              label={t('phone_number')}
              error={errors?.phoneNumber}
              {...field}
              onChange={e => {
                const { value } = e.target
                const formatted = formatIncompletePhoneNumber(value, 'IL')
                field.onChange(`${formatted}`)
              }}
            />
          )}
          name="phoneNumber"
          rules={{
            required: t('required_field'),
            validate: value => {
              return isValidPhoneNumber(`${value}`, 'IL') ? true : t('invalid_phone_number')
            },
          }}
        />
        <FormField
          label={t('town')}
          error={errors?.town}
          {...register('town', { required: t('required_field'), minLength: { value: 3, message: t('required_field') } })}
        />
        <Box sx={{ display: 'grid', gap: 3, gridTemplateColumns: '1fr 1fr' }}>
          <FormField
            label={t('street')}
            error={errors?.street}
            {...register('street', { required: t('required_field'), minLength: { value: 2, message: t('required_field') } })}
          />
          <FormField
            label={t('house_number')}
            type="number"
            InputProps={{ endAdornment: <img src="/icons/edit.svg" /> }}
            {...register('houseNumber')}
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
