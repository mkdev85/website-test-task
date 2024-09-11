import React, { useCallback } from 'react';

import CloseIcon from '@mui/icons-material/Close';
import {
  Box,
  Button,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  TextField,
  Typography,
} from '@mui/material';
import { useFormik } from 'formik';
import * as Yup from 'yup';

import { useAddWebsiteMutation } from '@/queries/useAddWebsiteMutation';
import { colors } from '@/ui-kit/theme/colors';
import { CustomDialog } from '@/ui-kit/theme/components/CustomDialog/CustomDialog';

import type { AddWebsiteDialogProps } from './AddWebsiteDialog.props';
import { FormContainer } from './AddWebsiteDialog.styles';

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
      url: Yup.string()
        .url('Enter valid URL (e.g. http://example.com or https://example.com)')
        .required('Website URL is required'),
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
    <CustomDialog open={open} onClose={handleClose}>
      <DialogTitle>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Typography fontSize={24} fontWeight={500}>
            Add New Website
          </Typography>
          <IconButton onClick={handleClose}>
            <CloseIcon sx={{ color: colors.white }} />
          </IconButton>
        </Box>
      </DialogTitle>
      <form onSubmit={formik.handleSubmit}>
        <DialogContent>
          <FormContainer>
            <TextField
              fullWidth
              id="name"
              name="name"
              label="Website Name"
              value={formik.values.name}
              onChange={formik.handleChange}
              error={formik.touched.name && Boolean(formik.errors.name)}
              helperText={formik.touched.name && formik.errors.name}
              autoComplete="off"
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
              autoComplete="off"
            />
          </FormContainer>
        </DialogContent>
        <DialogActions>
          <Button size="large" onClick={handleClose}>
            Cancel
          </Button>
          <Button
            size="large"
            type="submit"
            variant="contained"
            color="primary"
            disabled={mutation.isPending}
          >
            {mutation.isPending ? 'Adding...' : 'Add Website'}
          </Button>
        </DialogActions>
      </form>
    </CustomDialog>
  );
};

AddWebsiteDialog.displayName = 'AddWebsiteDialog';
