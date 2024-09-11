import React from 'react';

import CloseIcon from '@mui/icons-material/Close';
import {
  Box,
  Button,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  IconButton,
  Typography,
} from '@mui/material';

import { colors } from '../../colors';
import { CustomDialog } from '../CustomDialog/CustomDialog';

import type { AlertDialogProps } from './AlertDialog.props';
import { AlertDialogWrapper } from './AlertDialog.styles';

export const AlertDialog: React.FC<AlertDialogProps> = props => {
  const { open, title, message, onConfirm, onCancel } = props;

  return (
    <AlertDialogWrapper>
      <CustomDialog open={open} onClose={onCancel}>
        <DialogTitle>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Typography fontSize={24} fontWeight={500}>
              {title}
            </Typography>
            <IconButton onClick={onCancel}>
              <CloseIcon sx={{ color: colors.white }} />
            </IconButton>
          </Box>
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            <Typography fontSize={18}>{message}</Typography>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button size="large" onClick={onCancel} color="primary">
            Cancel
          </Button>
          <Button size="large" onClick={onConfirm} color="primary" variant="contained" autoFocus>
            Confirm
          </Button>
        </DialogActions>
      </CustomDialog>
    </AlertDialogWrapper>
  );
};

AlertDialog.displayName = 'AlertDialog';
