import FormField from '@/components/elements/FormField'
import useFormWizard from '@/hooks/useFormWizard'
import useStaticTranslation from '@/hooks/useStaticTranslation'
import { generateWALink } from '@/util/whatsapp'
import { Box, Button, Link, Stack, Typography } from '@mui/material'
import { FormValuesType } from 'FormTypes'
import { formatIncompletePhoneNumber, isValidPhoneNumber } from 'libphonenumber-js'
import mixpanel from 'mixpanel-browser'
import { memo, useMemo } from 'react'
import { Controller, useForm } from 'react-hook-form'

const Details = () => {
  const { stepTo, updateFormData, submitData, formData } = useFormWizard()
  const { t } = useStaticTranslation()
  const { register, handleSubmit, formState, control } = useForm({ mode: 'onChange' })
  const { medicines, hasCold, hasExpensive, hasMoreProducts, medicineQuantity } = formData
  const { isValid, errors } = formState

  const buildMessage = (data?: FormValuesType) => {
    const messageArr = [t('wa_app_intro'), `${t('hello')},`, t('wa_app_intro_2')]
    if (data) {
      const { fullName, town, street, houseNumber } = data
      messageArr.splice(1, 1, t('wa_personal_info', { fullName, fullAddress: `${street} ${houseNumber}, ${town}` }))
    }
    const medicineListString = medicines?.map(m => `${m.Name}${m.expiryState === 'inAMonth' && ` - ${t('close_to_expire')}`}`).join('\n')
    if (medicineListString) {
      messageArr.push(medicineListString)
    } else {
      hasExpensive && messageArr.push(t('expensive_medicine'))
      hasCold && messageArr.push(t('cold_medicine'))
    }
    hasMoreProducts && messageArr.push(t('soaking_product'))
    medicineQuantity === '40+' && messageArr.push(`${t('i_have')} ${t('40_plus_items')}`)
    return messageArr.join('\n')
  }

  const link = useMemo(() => generateWALink(buildMessage()), [])

  const onSubmit = (data: FormValuesType) => {
    updateFormData(data)
    submitData('whatsapp')
    mixpanel.track('whatsapp_details_sent')
    const waMessage = buildMessage(data)
    const waLink = generateWALink(waMessage)
    window.open(waLink, '_blank')
    stepTo('thank-you')
  }

  return (
    <Stack gap={2} pb={1} alignItems={'center'} width={'100%'} justifyContent={'space-between'} component={'form'} onSubmit={handleSubmit(onSubmit)}>
      <Stack gap={1} alignItems={'center'} textAlign={'center'}>
        <Typography variant="h1">{t('details_page_title')}</Typography>
        <Typography variant="body1">{t('details_page_subtitle')}</Typography>
      </Stack>
      <Stack gap={3} width={'100%'} maxHeight={'calc(100% - 250px)'} flexGrow={1} px={0.5} sx={{ overflow: 'auto' }}>
        <FormField
          error={errors?.fullName}
          defaultValue={formData.fullName || ''}
          label={t('full_name')}
          {...register('fullName', { required: true, minLength: 3, pattern: { value: /^[a-z\u0590-\u05fe -]+$/i, message: t('invalid_name') } })}
        />
        <Controller
          control={control}
          defaultValue={formData.phoneNumber || ''}
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
          defaultValue={formData.town || ''}
          error={errors?.town}
          {...register('town', { required: t('required_field'), minLength: { value: 3, message: t('required_field') } })}
        />
        <Box sx={{ display: 'grid', gap: 3, gridTemplateColumns: '1fr 1fr' }}>
          <FormField
            label={t('street')}
            error={errors?.street}
            defaultValue={formData.street || ''}
            {...register('street', {
              required: t('required_field'),
              pattern: /^(?!\d+$)[^:]+$/,
              minLength: { value: 2, message: t('required_field') },
            })}
          />
          <FormField label={t('house_number')} defaultValue={formData.houseNumber || ''} type="number" {...register('houseNumber')} />
        </Box>
      </Stack>
      <Stack gap={2} width={'100%'} textAlign={'center'}>
        <Button type="submit" disabled={!isValid}>
          {t('connect_to_rep')}
        </Button>
        <Link color={'inherit'} href={link} target="_blank">
          {t('send_on_whatsapp')}
        </Link>
      </Stack>
    </Stack>
  )
}

export default memo(Details)
