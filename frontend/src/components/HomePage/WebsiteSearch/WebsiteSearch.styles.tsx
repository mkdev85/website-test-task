import { Box, styled } from '@mui/material';

export const SearchWrapper = styled('div')(({ theme }) => ({
  marginBottom: theme.spacing(2.5),
}));

export const SearchContainer = styled(Box)(({ theme }) => ({
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
