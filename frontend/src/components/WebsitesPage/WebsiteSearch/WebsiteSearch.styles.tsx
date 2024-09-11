import { Box, styled } from '@mui/material';

export const WebsiteSearchWrapper = styled(Box)(({ theme }) => ({
  marginBottom: theme.spacing(2),
  maxWidth: theme.spacing(80),
  marginLeft: 'auto',
  marginRight: 'auto',
  display: 'flex',
  flexDirection: 'column',
  gap: theme.spacing(2),
  [theme.breakpoints.up('md')]: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  '& .MuiTextField-root': {
    flexGrow: 1,
  },
}));

export const ButtonContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  gap: theme.spacing(1),
  height: '100%',
  '& .MuiButton-root': {
    height: '100%',
    [theme.breakpoints.down('md')]: {
      height: '40px',
    },
  },
}));
