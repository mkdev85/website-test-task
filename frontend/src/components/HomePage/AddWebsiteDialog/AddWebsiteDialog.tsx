import React, { useCallback } from 'react';

import { TextField } from '@mui/material';
import { useFormik } from 'formik';
import * as Yup from 'yup';

import { useMobileDeviceBreakpoint } from '@/hooks/useMobileDeviceBreakpoint';
import { useAddWebsiteMutation } from '@/queries/useAddWebsiteMutation';

import type { AddWebsiteDialogProps } from './AddWebsiteDialog.props';
import {
  FormContainer,
  FullWidthButton,
  StyledDialog,
  StyledDialogActions,
  StyledDialogContent,
  StyledDialogTitle,
} from './AddWebsiteDialog.styles';

export const AddWebsiteDialog: React.FC<AddWebsiteDialogProps> = props => {
  const { open, onClose } = props;
  const mutation = useAddWebsiteMutation();

  const fullScreen = useMobileDeviceBreakpoint();
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
    <StyledDialog open={open} onClose={handleClose} fullScreen={fullScreen}>
      <StyledDialogTitle>Add New Website</StyledDialogTitle>
      <form onSubmit={formik.handleSubmit}>
        <StyledDialogContent>
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
          </FormContainer>
        </StyledDialogContent>
        <StyledDialogActions>
          <FullWidthButton onClick={handleClose}>Cancel</FullWidthButton>
          <FullWidthButton
            type="submit"
            variant="contained"
            color="primary"
            disabled={mutation.isPending}
          >
            {mutation.isPending ? 'Adding...' : 'Add Website'}
          </FullWidthButton>
        </StyledDialogActions>
      </form>
    </StyledDialog>
  );
};

AddWebsiteDialog.displayName = 'AddWebsiteDialog';
