import type { DialogProps as MuiDialogProps } from '@mui/material';

export interface CustomDialogProps extends MuiDialogProps {
  // TODO: define component props here
  className?: string;
  children: React.ReactNode;
  onClose: (event: React.SyntheticEvent, reason: string) => void;
}
