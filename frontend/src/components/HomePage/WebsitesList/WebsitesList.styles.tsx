import { styled } from '@mui/material';

export const WebsitesListWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(2),

  '& .capitalize': {
    textTransform: 'capitalize',
  },
}));
