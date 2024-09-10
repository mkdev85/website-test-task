import React, { useCallback } from 'react';

import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
} from '@mui/material';
import { useFormik } from 'formik';
import * as Yup from 'yup';

import { useAddWebsiteMutation } from '@/queries/useAddWebsiteMutation';

import type { AddWebsiteDialogProps } from './AddWebsiteDialog.props';
import { AddWebsiteDialogWrapper } from './AddWebsiteDialog.styles';

export const AddWebsiteDialog: React.FC<AddWebsiteDialogProps> = props => {
  const { open, onClose } = props;
  const mutation = useAddWebsiteMutation();

  const formik = useFormik({
    initialValues: {
      name: '',
      url: '',
    },
    validationSchema: Yup.object({
      name: Yup.string().required('Website name is required'),
      url: Yup.string().url('Invalid URL').required('Website URL is required'),
    }),
    onSubmit: values => {
      mutation.mutate(values, {
        onSuccess: () => {
          onClose();
          formik.resetForm();
        },
      });
    },
  });

  const handleClose = useCallback(() => {
    formik.resetForm();
    onClose();
  }, [formik, onClose]);

  return (
    <AddWebsiteDialogWrapper>
      <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
        <DialogTitle>Add New Website</DialogTitle>
        <form onSubmit={formik.handleSubmit}>
          <DialogContent>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
              <TextField
                fullWidth
                id="name"
                name="name"
                label="Website Name"
                value={formik.values.name}
                onChange={formik.handleChange}
                error={formik.touched.name && Boolean(formik.errors.name)}
                helperText={formik.touched.name && formik.errors.name}
              />
              <TextField
                fullWidth
                id="url"
                name="url"
                label="Website URL"
                value={formik.values.url}
                onChange={formik.handleChange}
                error={formik.touched.url && Boolean(formik.errors.url)}
                helperText={formik.touched.url && formik.errors.url}
              />
            </Box>
          </DialogContent>
          <DialogActions>
            <Button onClick={onClose}>Cancel</Button>
            <Button type="submit" variant="contained" color="primary" disabled={mutation.isPending}>
              {mutation.isPending ? 'Adding...' : 'Add Website'}
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    </AddWebsiteDialogWrapper>
  );
};

AddWebsiteDialog.displayName = 'AddWebsiteDialog';
