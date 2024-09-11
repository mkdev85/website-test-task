import React, { useState } from 'react';

import DeleteIcon from '@mui/icons-material/Delete';
import { Button } from '@mui/material';

import { useDeleteWebsiteMutation } from '@/queries/useDeleteWebsiteMutation';
import { AlertDialog } from '@/ui-kit/theme/components/AlertDialog/AlertDialog';

import type { RemoveWebsiteButtonProps } from './RemoveWebsiteButton.props';
import { RemoveWebsiteButtonWrapper } from './RemoveWebsiteButton.styles';

export const RemoveWebsiteButton: React.FC<RemoveWebsiteButtonProps> = props => {
  const { websiteListItemId } = props;
  const [showRemoveConfirmationDialog, setShowRemoveConfirmationDialog] = useState<boolean>(false);

  const { mutate: deleteMutate, isPending: isDeletePending } = useDeleteWebsiteMutation();

  const handleConfirm = () => {
    deleteMutate({ id: websiteListItemId });
    setShowRemoveConfirmationDialog(false);
  };

  const handleCancel = () => {
    setShowRemoveConfirmationDialog(false);
  };

  const handleRemoveWebsite = () => {
    setShowRemoveConfirmationDialog(true);
  };

  return (
    <RemoveWebsiteButtonWrapper>
      <Button
        onClick={() => handleRemoveWebsite()}
        variant="outlined"
        color="error"
        size="small"
        startIcon={<DeleteIcon />}
        disabled={isDeletePending}
      >
        {isDeletePending ? 'Removing...' : 'Remove'}
      </Button>
      {showRemoveConfirmationDialog && (
        <AlertDialog
          open={showRemoveConfirmationDialog}
          message="Are you sure, you want to remove the website from monitoring"
          onCancel={handleCancel}
          onConfirm={handleConfirm}
          title="Remove Website"
        />
      )}
    </RemoveWebsiteButtonWrapper>
  );
};

RemoveWebsiteButton.displayName = 'RemoveWebsiteButton';
