import { styled } from '@mui/material';

export const HeaderWrapper = styled('header')(({ theme }) => ({
  '& .header-text': {
    display: 'block',
    [theme.breakpoints.down('sm')]: {
      display: 'none',
    },
  },
  // TODO: define the styles here
}));
