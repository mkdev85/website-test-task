import React from 'react';

import type { StatusChipProps } from './StatusChip.props';
import { StatusChipWrapper } from './StatusChip.styles';

export const StatusChip: React.FC<StatusChipProps> = props => {
  const { children, ...rest } = props;

  return <StatusChipWrapper {...rest}>{children}</StatusChipWrapper>;
};

StatusChip.displayName = 'StatusChip';
