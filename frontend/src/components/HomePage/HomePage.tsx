import React from 'react';

import type { HomePageProps } from './HomePage.props';
import { HomePageWrapper } from './HomePage.styles';
import { WebsitesList } from './WebsitesList/WebsitesList';

export const HomePage: React.FC<HomePageProps> = () => {
  return (
    <HomePageWrapper>
      <WebsitesList />
    </HomePageWrapper>
  );
};

HomePage.displayName = 'HomePage';
