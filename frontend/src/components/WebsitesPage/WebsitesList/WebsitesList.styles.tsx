import { Box, styled } from '@mui/material';

export const WebsitesListWrapper = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',

  '& .capitalize': {
    textTransform: 'capitalize',
  },

  '& .last-updated': {
    display: 'flex',
    marginBottom: theme.spacing(1),
    alignSelf: 'end',
    fontWeight: 'bold',
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
