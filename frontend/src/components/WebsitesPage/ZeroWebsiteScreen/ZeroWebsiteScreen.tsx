import React from 'react';

import LanguageIcon from '@mui/icons-material/Language';

import type { ZeroWebsiteScreenProps } from './ZeroWebsiteScreen.props';
import {
  StyledContainer,
  StyledIcon,
  StyledSubtitle,
  StyledTitle,
  ZeroWebsiteScreenWrapper,
} from './ZeroWebsiteScreen.styles';

export const ZeroWebsiteScreen: React.FC<ZeroWebsiteScreenProps> = () => {
  return (
    <ZeroWebsiteScreenWrapper>
      <StyledContainer>
        <StyledIcon>
          <LanguageIcon fontSize="inherit" />
        </StyledIcon>
        <StyledTitle variant="h5">No Websites Found</StyledTitle>
        <StyledSubtitle variant="body1">
          It looks like you have no websites yet.
        </StyledSubtitle>
      </StyledContainer>
    </ZeroWebsiteScreenWrapper>
  );
};

ZeroWebsiteScreen.displayName = 'ZeroWebsiteScreen';
