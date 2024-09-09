import React from 'react';

import { Header } from '../HomePage/Header/Header';

import type { LayoutProps } from './Layout.props';
import { LayoutWrapper } from './Layout.styles';

export const Layout: React.FC<LayoutProps> = props => {
  const { children } = props;

  return (
    <LayoutWrapper>
      <Header />
      <main>{children}</main>
    </LayoutWrapper>
  );
};

Layout.displayName = 'Layout';
