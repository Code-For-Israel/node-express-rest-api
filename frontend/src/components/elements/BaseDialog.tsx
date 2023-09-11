import { Dialog, DialogProps, DialogTitle, IconButton } from '@mui/material'
import Image from 'next/image'
import CloseIcon from 'public/icons/close.svg'
import { ReactNode } from 'react'

export type BaseDialogProps = { children: ReactNode; onClose?: () => void } & Omit<DialogProps, 'onClose'>

const BaseDialog = ({ children, onClose, ...rest }: BaseDialogProps) => {
  return (
    <Dialog {...rest} onClose={onClose}>
      <DialogTitle sx={{ m: 0, py: 2.5 }}>
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{
            position: 'absolute',
            right: 18,
            top: 18,
          }}
        >
          <Image src={CloseIcon} alt="close" />
        </IconButton>
      </DialogTitle>
      {children}
    </Dialog>
  )
}

export default BaseDialog
