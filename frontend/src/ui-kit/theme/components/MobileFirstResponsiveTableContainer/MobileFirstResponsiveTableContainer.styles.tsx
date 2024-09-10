import { styled, TableContainer } from '@mui/material';

export const MobileFirstResponsiveTableContainerWrapper = styled(TableContainer)(({ theme }) => ({
  maxWidth: theme.spacing(80),
  margin: '2rem auto',
  boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
  borderRadius: '8px',
  overflow: 'hidden',
  [theme.breakpoints.down('md')]: {
    boxShadow: 'none',
  },
}));
