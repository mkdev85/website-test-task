import { styled } from '@mui/material';
import { Box, Typography, Button } from '@mui/material';

export const ZeroWebsiteScreenWrapper = styled('div')(() => ({
  // TODO: define the styles here
}));

export const StyledContainer = styled(Box)(() => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  height: '50vh',
  textAlign: 'center',
}));

export const StyledIcon = styled('span')(({ theme }) => ({
  fontSize: 64,
  color: theme.palette.text.secondary,
  marginBottom: theme.spacing(2),
}));

export const StyledTitle = styled(Typography)(({ theme }) => ({
  marginBottom: theme.spacing(1),
}));

export const StyledSubtitle = styled(Typography)(({ theme }) => ({
  color: theme.palette.text.secondary,
  marginBottom: theme.spacing(2),
}));

export const StyledButton = styled(Button)(({ theme }) => ({
  marginTop: theme.spacing(2),
}));
