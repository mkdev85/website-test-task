import React from 'react';

import { useMobileDeviceBreakpoint } from '@/hooks/useMobileDeviceBreakpoint';

import type { CustomDialogProps } from './CustomDialog.props';
import { CustomDialogWrapper } from './CustomDialog.styles';

export const CustomDialog: React.FC<CustomDialogProps> = props => {
  const { open, onClose, children, ...rest } = props;

  const backdropDisabledOnClose = (event: React.SyntheticEvent, reason: string) => {
    console.log({ reason });
    if (reason !== 'backdropClick') {
      onClose(event, reason);
    }
  };

  const isMobile = useMobileDeviceBreakpoint();

  return (
    <CustomDialogWrapper
      fullWidth={isMobile}
      open={open}
      onClose={backdropDisabledOnClose}
      disableEscapeKeyDown
      {...rest}
    >
      {children}
    </CustomDialogWrapper>
  );
};

CustomDialog.displayName = 'CustomDialog';
