import React from 'react';

import { CircularProgress } from '@mui/material';

import type { CustomLoadingProps } from './CustomLoading.props';
import { LoadingOverlay, LoadingText } from './CustomLoading.styles';

export const CustomLoading: React.FC<CustomLoadingProps> = props => {
  const { message = 'Loading..' } = props;
  return (
    <LoadingOverlay>
      <CircularProgress size={60} thickness={4} />
      <LoadingText variant="h6">{message}</LoadingText>
    </LoadingOverlay>
  );
};

CustomLoading.displayName = 'CustomLoading';
