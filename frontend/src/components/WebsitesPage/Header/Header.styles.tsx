import { AppBar, styled } from '@mui/material';

export const HeaderWrapper = styled(AppBar)(({ theme }) => ({
  padding: theme.spacing(0, 2),
  '& .MuiToolbar-root': {
    maxWidth: theme.spacing(80),
    marginLeft: 'auto',
    marginRight: 'auto',
    width: '100%',
    display: 'flex',
    gap: theme.spacing(1),
    padding: 0,
  },

  '& .header-text': {
    display: 'block',
    [theme.breakpoints.down('sm')]: {
      display: 'none',
    },
  },
}));
