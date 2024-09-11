import { styled } from '@mui/material';

export const WebsitesListWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(2),

  '& .capitalize': {
    textTransform: 'capitalize',
  },

  '& .MuiTablePagination-root': {
    padding: theme.spacing(1),
    fontWeight: 'bold',
    fontSize: theme.spacing(1),
  },
  '& .MuiTablePagination-selectLabel, & .MuiTablePagination-input, & .MuiTablePagination-displayedRows':
    {
      fontWeight: 'bold',
      fontSize: theme.spacing(1),
    },
}));
