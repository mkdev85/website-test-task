import React, { useState } from 'react';

import { Button } from '@mui/material';

import { AddWebsiteDialog } from '../AddWebsiteDialog/AddWebsiteDialog';

import type { AddWebsiteButtonProps } from './AddWebsiteButton.props';
import { AddWebsiteButtonWrapper } from './AddWebsiteButton.styles';

export const AddWebsiteButton: React.FC<AddWebsiteButtonProps> = () => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleDialogOpen = () => {
    setIsDialogOpen(true);
  };

  const handleDialogClose = () => {
    setIsDialogOpen(false);
  };

  return (
    <AddWebsiteButtonWrapper>
      <Button color="inherit" variant="outlined" onClick={handleDialogOpen}>
        Add Website
      </Button>
      <AddWebsiteDialog open={isDialogOpen} onClose={handleDialogClose} />
    </AddWebsiteButtonWrapper>
  );
};

AddWebsiteButton.displayName = 'AddWebsiteButton';
