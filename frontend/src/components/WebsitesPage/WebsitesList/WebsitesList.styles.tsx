import { Box, styled } from '@mui/material';

export const WebsitesListWrapper = styled(Box)(({ theme }) => ({
  '& .capitalize': {
    textTransform: 'capitalize',
  },

  '& .MuiTablePagination-root': {
    margin: theme.spacing(1),
    fontWeight: 'bold',
    fontSize: theme.spacing(1),
  },
  '& .MuiTablePagination-selectLabel, & .MuiTablePagination-input, & .MuiTablePagination-displayedRows':
    {
      fontWeight: 'bold',
      fontSize: theme.spacing(1),
    },
}));
