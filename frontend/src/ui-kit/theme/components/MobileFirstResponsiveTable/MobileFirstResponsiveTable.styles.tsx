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
        marginBottom: '1.5rem',
        boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
        borderRadius: '8px',
        overflow: 'hidden',
        transition: 'all 0.3s ease',
        '&:hover': {
          transform: 'translateY(-2px)',
          boxShadow: '0 6px 12px rgba(0, 0, 0, 0.15)',
        },
      },
      '& td': {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        textAlign: 'right',
        padding: '12px 16px',
        borderBottom: `1px solid ${theme.palette.divider}`,
        '&:before': {
          content: 'attr(data-th)',
          fontWeight: 'bold',
          marginRight: '1rem',
          minWidth: '30%',
          textAlign: 'left',
        },
        '&:last-child': {
          borderBottom: 'none',
          justifyContent: 'flex-end',
        },
      },
      '& .status-chip': {
        marginLeft: 'auto',
      },
      '& .action-buttons': {
        display: 'flex',
        justifyContent: 'flex-end',
        gap: '8px',
      },
    },
  },
}));
