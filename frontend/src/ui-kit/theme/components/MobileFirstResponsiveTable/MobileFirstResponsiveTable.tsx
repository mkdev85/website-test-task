import React from 'react';

import type { MobileFirstResponsiveTableProps } from './MobileFirstResponsiveTable.props';
import { MobileFirstResponsiveTableWrapper } from './MobileFirstResponsiveTable.styles';

export const MobileFirstResponsiveTable: React.FC<MobileFirstResponsiveTableProps> = props => {
  const { children, ...rest } = props;
  return (
    <MobileFirstResponsiveTableWrapper {...rest}>{children}</MobileFirstResponsiveTableWrapper>
  );
};

MobileFirstResponsiveTable.displayName = 'MobileFirstResponsiveTable';
