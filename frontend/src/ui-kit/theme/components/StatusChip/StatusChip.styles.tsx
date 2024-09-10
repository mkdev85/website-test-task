import { styled } from '@mui/material';

import { colors } from '../../colors';

import { StatusChipProps } from './StatusChip.props';

export const StatusChipWrapper = styled('span')<StatusChipProps>(({ theme, status }) => ({
  padding: '4px 8px',
  borderRadius: '12px',
  fontSize: '0.875rem',
  fontWeight: 'medium',
  backgroundColor: status === 'Online' ? theme.palette.success.light : theme.palette.error.light,
  color: colors.white,
}));
