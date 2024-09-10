import { Box, styled, Typography } from '@mui/material';

export const LoadingOverlay = styled(Box)(({ theme }) => ({
  position: 'absolute',
  top: 0,
  left: 0,
  width: '100%',
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  backgroundColor: 'rgba(255, 255, 255, 0.7)',
  zIndex: theme.zIndex.drawer + 1,
}));

export const LoadingText = styled(Typography)(({ theme }) => ({
  marginTop: theme.spacing(2),
  color: theme.palette.primary.main,
}));
