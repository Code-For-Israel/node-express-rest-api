import { Button, FormControlLabel, Radio, RadioGroup, Stack, Typography } from '@mui/material'
import { MedicineItemType } from 'MedicineTypes'
import { Controller, useForm } from 'react-hook-form'

type Props = { medicine: MedicineItemType; onSave: (medicine: MedicineItemType, state: string) => void }

const AddMedicine = ({ medicine, onSave }: Props) => {
  const {
    handleSubmit,
    control,
    formState: { isValid },
  } = useForm()

  const onSubmit = (data: any) => {
    onSave(medicine, data.expiredState)
  }

  return (
    <Stack
      direction={'column'}
      component={'form'}
      gap={3}
      py={3}
      px={4}
      justifyContent={'space-between'}
      sx={{ height: '100%', width: '100%' }}
      onSubmit={handleSubmit(onSubmit)}
    >
      <Stack width="100%" sx={{ textAlign: 'center' }}>
        <Typography variant="h1">{medicine.name}</Typography>
        <Typography variant="h1">{medicine.englishName}</Typography>
      </Stack>
      <Typography variant="body1">האם התוקף יפוג בחודש הקרוב?</Typography>
      <Controller
        name="expiredState"
        control={control}
        defaultValue={''}
        rules={{ required: true }}
        render={({ field: { onChange, value } }) => (
          <RadioGroup sx={{ rowGap: 1 }} aria-label="expired-state" value={value} onChange={onChange}>
            <FormControlLabel value="inAMonth" control={<Radio />} label="כן" />
            <FormControlLabel value="noOrUnknown" control={<Radio />} label="לא / לא ידוע" />
            <FormControlLabel value="expired" control={<Radio />} label="פג תוקף" />
          </RadioGroup>
        )}
      />
      <Button variant="contained" disabled={!isValid} type="submit">
        הוספת תרופה
      </Button>
    </Stack>
  )
}

export default AddMedicine
