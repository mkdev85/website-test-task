import { Button, Dialog, DialogActions, DialogContent, DialogTitle, styled } from '@mui/material';

export const StyledDialog = styled(Dialog)(({ theme }) => ({
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
}));

export const StyledDialogTitle = styled(DialogTitle)(({ theme }) => ({
  backgroundColor: theme.palette.primary.main,
  color: theme.palette.primary.contrastText,
  padding: theme.spacing(2),
  [theme.breakpoints.down('sm')]: {
    textAlign: 'center',
  },
}));

export const StyledDialogContent = styled(DialogContent)(({ theme }) => ({
  padding: theme.spacing(3),
  [theme.breakpoints.down('sm')]: {
    padding: theme.spacing(2),
  },
}));

export const StyledDialogActions = styled(DialogActions)(({ theme }) => ({
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
}));

export const FormContainer = styled('div')(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  gap: theme.spacing(2),
}));

export const FullWidthButton = styled(Button)(({ theme }) => ({
  [theme.breakpoints.down('sm')]: {
    width: '100%',
  },
}));
