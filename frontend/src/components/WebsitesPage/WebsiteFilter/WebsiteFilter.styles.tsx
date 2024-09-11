import { Box, styled } from '@mui/material';

export const WebsiteFilterWrapper = styled(Box)(({ theme }) => ({
  width: '100%',
  [theme.breakpoints.up('md')]: {
    maxWidth: '200px',
  },
}));
