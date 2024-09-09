import { styled, Table } from '@mui/material';

export const MobileFirstResponsiveTableWrapper = styled(Table)(({ theme }) => ({
  width: '100%',
  borderCollapse: 'separate',
  borderSpacing: 0,
  '& th': {
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.primary.contrastText,
    fontWeight: 'bold',
    padding: '16px',
    textAlign: 'left',
    '&:last-child': {
      textAlign: 'right',
    },
  },
  '& td': {
    padding: '16px',
    borderBottom: `1px solid ${theme.palette.divider}`,
    '&:last-child': {
      textAlign: 'right',
    },
  },
  '& tr:last-child td': {
    borderBottom: 'none',
  },
  '& tr:nth-of-type(even)': {
    backgroundColor: theme.palette.action.hover,
  },
  [theme.breakpoints.down('sm')]: {
    '&.mobile-optimised': {
      '& thead': {
        display: 'none',
      },
      '& tbody tr': {
        display: 'block',
        marginBottom: '1rem',
        boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
        borderRadius: '4px',
        overflow: 'hidden',
      },
      '& td': {
        display: 'block',
        textAlign: 'right',
        paddingLeft: '50%',
        position: 'relative',
        '&:before': {
          content: 'attr(data-th)',
          position: 'absolute',
          left: '6px',
          width: '45%',
          paddingRight: '10px',
          whiteSpace: 'nowrap',
          textAlign: 'left',
          fontWeight: 'bold',
        },
        '&:last-child': {
          textAlign: 'right',
          paddingLeft: '16px',
        },
      },
    },
  },
}));
