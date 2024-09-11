import { AppBar, styled } from '@mui/material';

export const HeaderWrapper = styled(AppBar)(({ theme }) => ({
  '& .MuiToolbar-root': {
    maxWidth: theme.spacing(80),
    marginLeft: 'auto',
    marginRight: 'auto',
    width: '100%',
    display: 'flex',
    gap: theme.spacing(1),
  },

  '& .header-text': {
    display: 'block',
    [theme.breakpoints.down('sm')]: {
      display: 'none',
    },
  },
}));
