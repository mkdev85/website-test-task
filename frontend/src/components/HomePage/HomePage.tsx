import React from 'react';

import type { HomePageProps } from './HomePage.props';
import { HomePageWrapper } from './HomePage.styles';

export const HomePage: React.FC<HomePageProps> = props => {

  return (
    <HomePageWrapper>
      Hello HomePage!
    </HomePageWrapper>
  );
};

HomePage.displayName = 'HomePage';