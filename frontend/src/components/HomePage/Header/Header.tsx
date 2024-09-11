import React from 'react';

import { AppBar, Box, Toolbar, Typography } from '@mui/material';

import { AddWebsiteButton } from '../AddWebsiteButton/AddWebsiteButton';

import { HeaderProps } from './Header.props';
import { HeaderWrapper } from './Header.styles';

export const Header: React.FC<HeaderProps> = () => {
  return (
    <HeaderWrapper>
      <AppBar position="static">
        <Toolbar>
          <Typography className="header-text" variant="h6" noWrap component="div">
            Website Monitor
          </Typography>
          <Box>
            <AddWebsiteButton />
          </Box>
        </Toolbar>
      </AppBar>
    </HeaderWrapper>
  );
};

Header.displayName = 'Header';
