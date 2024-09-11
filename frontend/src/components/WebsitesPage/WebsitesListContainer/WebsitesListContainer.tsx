import React from 'react';

import { MobileFirstResponsiveTableContainer } from '@/ui-kit/theme/components/MobileFirstResponsiveTableContainer/MobileFirstResponsiveTableContainer';

import { WebsiteSearch } from '../WebsiteSearch/WebsiteSearch';
import { WebsitesList } from '../WebsitesList/WebsitesList';

import type { WebsitesListContainerProps } from './WebsitesListContainer.props';
import { WebsitesListContainerWrapper } from './WebsitesListContainer.styles';

export const WebsitesListContainer: React.FC<WebsitesListContainerProps> = () => {
  return (
    <WebsitesListContainerWrapper>
      <WebsiteSearch />
      <MobileFirstResponsiveTableContainer>
        <WebsitesList />
      </MobileFirstResponsiveTableContainer>
    </WebsitesListContainerWrapper>
  );
};

WebsitesListContainer.displayName = 'WebsitesListContainer';
