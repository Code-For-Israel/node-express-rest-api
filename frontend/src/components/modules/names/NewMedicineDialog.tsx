import BaseDialog from '@/components/elements/BaseDialog'
import useStaticTranslation from '@/hooks/useStaticTranslation'
import { Button, Stack, TextField, Typography } from '@mui/material'
import Image from 'next/image'
import EditIcon from 'public/icons/edit.svg'
import { useState } from 'react'

type Props = { initialValue: string; onAddNew: (name: string) => void; open: boolean; onClose: () => void }

const NewMedicineDialog = ({ onAddNew, initialValue, onClose, open }: Props) => {
  const { t } = useStaticTranslation()
  const [newMedName, setNewMedName] = useState(initialValue)

  const handleAddNew = () => {
    onAddNew(newMedName)
    setNewMedName('')
    onClose()
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewMedName(e.target.value)
  }

  return (
    <BaseDialog open={open} onClose={onClose}>
      <Stack gap={6} sx={{ py: 2, px: 4 }}>
        <Typography variant="h2" textAlign={'center'} color={'inherit'}>
          {t('want_to_donate_unknown')}
        </Typography>
        <TextField
          variant="standard"
          label={t('medicine_name')}
          value={newMedName}
          onChange={handleChange}
          InputProps={{ endAdornment: <Image src={EditIcon} alt="edit" /> }}
        />
        <Button variant="contained" color="primary" sx={{ mt: 1, mb: 2 }} onClick={handleAddNew}>
          {t('confirm')}
        </Button>
      </Stack>
    </BaseDialog>
  )
}

export default NewMedicineDialog
