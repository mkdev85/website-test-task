import React from 'react';

import type { MobileFirstResponsiveTableContainerProps } from './MobileFirstResponsiveTableContainer.props';
import { MobileFirstResponsiveTableContainerWrapper } from './MobileFirstResponsiveTableContainer.styles';

export const MobileFirstResponsiveTableContainer: React.FC<
  MobileFirstResponsiveTableContainerProps
> = props => {
  const { children, ...rest } = props;

  return (
    <MobileFirstResponsiveTableContainerWrapper {...rest}>
      {children}
    </MobileFirstResponsiveTableContainerWrapper>
  );
};

MobileFirstResponsiveTableContainer.displayName = 'MobileFirstResponsiveTableContainer';
