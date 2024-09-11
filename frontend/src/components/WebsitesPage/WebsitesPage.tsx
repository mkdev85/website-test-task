import React from 'react';

import { WebsitesListContainer } from './WebsitesListContainer/WebsitesListContainer';
import type { WebsitesPageProps } from './WebsitesPage.props';
import { WebsitesPageWrapper } from './WebsitesPage.styles';

export const WebsitesPage: React.FC<WebsitesPageProps> = () => {
  return (
    <WebsitesPageWrapper>
      <WebsitesListContainer />
    </WebsitesPageWrapper>
  );
};

WebsitesPage.displayName = 'WebsitesPage';
