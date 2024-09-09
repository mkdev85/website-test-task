import React from 'react';

import { AppBar, Box, Button, Toolbar, Typography } from '@mui/material';

import { HeaderProps } from './Header.props';
import { HeaderWrapper } from './Header.styles';

export const Header: React.FC<HeaderProps> = props => {
  return (
    <HeaderWrapper>
      <AppBar position="static">
        <Toolbar>
          <Typography className="header-text" variant="h6" noWrap component="div">
            Website Monitor
          </Typography>
          <Box sx={{ flexGrow: 1 }} />

          <Button color="inherit" variant="outlined">
            Add Website
          </Button>
        </Toolbar>
      </AppBar>
    </HeaderWrapper>
  );
};

Header.displayName = 'Header';
