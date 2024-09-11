import { Dialog, styled } from '@mui/material';
import type { DialogProps as MuiDialogProps } from '@mui/material';

export const CustomDialogWrapper = styled(Dialog)<MuiDialogProps>(({ theme }) => ({
  '& .MuiDialog-paper': {
    width: '100%',
    maxWidth: 600,
    margin: theme.spacing(2),
    [theme.breakpoints.down('sm')]: {
      margin: 0,
      width: '100%',
      height: '100%',
      maxHeight: 'none',
      maxWidth: 'none',
      borderRadius: 0,
    },
  },
  '& .MuiDialogTitle-root': {
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.primary.contrastText,
    padding: theme.spacing(1.5),
    [theme.breakpoints.down('sm')]: {
      textAlign: 'center',
    },
  },
  '& .MuiDialogContent-root': {
    padding: theme.spacing(3),
    marginTop: theme.spacing(2),
    paddingTop: theme.spacing(0),
    paddingBottom: theme.spacing(0),
    [theme.breakpoints.down('sm')]: {
      padding: theme.spacing(2),
    },
  },
  '& .MuiDialogActions-root': {
    padding: theme.spacing(2),
    justifyContent: 'flex-end',
    [theme.breakpoints.down('sm')]: {
      padding: theme.spacing(2),
      flexDirection: 'column-reverse',
      '& > :not(:first-of-type)': {
        marginLeft: 0,
        marginBottom: theme.spacing(1),
      },
    },
  },
  '& .MuiButton-root': {
    [theme.breakpoints.down('sm')]: {
      width: '100%',
    },
  },
}));
