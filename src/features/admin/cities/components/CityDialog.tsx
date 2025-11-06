import { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogActions,
  TextField,
  Button,
  Box,
  Typography,
  IconButton,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import SaveIcon from '@mui/icons-material/Save';
import AddLocationIcon from '@mui/icons-material/AddLocation';
import WarningAmberIcon from '@mui/icons-material/WarningAmber';
import { useFormik } from 'formik';
import { useCities } from '../hooks/useCities';
import { cityValidationSchema } from '../utils/validation.utils';
import type { City } from '../types';

interface CityDialogProps {
  open: boolean;
  onClose: () => void;
  city: City | null;
}

function CityDialog({ open, onClose, city }: CityDialogProps) {
  const [showConfirmDialog, setShowConfirmDialog] = useState(false);
  const { createCity, updateCity, isCreating, isUpdating } = useCities();

  const formik = useFormik({
    initialValues: {
      name: city?.name || '',
      description: city?.description || '',
    },
    validationSchema: cityValidationSchema,
    enableReinitialize: true,
    onSubmit: (values) => {
      if (city) {
        updateCity(
          { cityId: city.id, data: values },
          {
            onSuccess: () => {
              formik.resetForm();
              onClose();
            },
          }
        );
      } else {
        createCity(values, {
          onSuccess: () => {
            formik.resetForm();
            onClose();
          },
        });
      }
    },
  });

  const handleClose = () => {
    if (formik.dirty) {
      setShowConfirmDialog(true);
    } else {
      formik.resetForm();
      onClose();
    }
  };

  const handleConfirmClose = () => {
    setShowConfirmDialog(false);
    formik.resetForm();
    onClose();
  };

  const handleCancelClose = () => {
    setShowConfirmDialog(false);
  };

  return (
    <>
      <Dialog
        open={open}
        onClose={handleClose}
        maxWidth="md"
        fullWidth
      slotProps={{
        paper: {
          sx: {
            borderRadius: 2,
            background: (theme) =>
              theme.palette.mode === 'dark'
                ? 'rgba(30, 41, 59, 0.98)'
                : 'rgba(255, 255, 255, 0.98)',
            backdropFilter: 'blur(20px)',
            boxShadow: (theme) =>
              theme.palette.mode === 'dark'
                ? '0 20px 60px rgba(0, 0, 0, 0.6)'
                : '0 20px 60px rgba(0, 0, 0, 0.3)',
            overflow: 'hidden',
            border: (theme) =>
              theme.palette.mode === 'dark'
                ? '1px solid rgba(148, 163, 184, 0.1)'
                : 'none',
          },
        },
      }}
    >
      {/* Header */}
      <Box
        sx={{
          bgcolor: (theme) =>
            theme.palette.mode === 'dark'
              ? 'rgba(51, 65, 85, 0.6)'
              : 'rgba(226, 232, 240, 0.8)',
          p: 3,
          position: 'relative',
        }}
      >
        <IconButton
          onClick={handleClose}
          aria-label="Close dialog"
          sx={{
            position: 'absolute',
            right: 16,
            top: 16,
            color: (theme) =>
              theme.palette.mode === 'dark' ? '#e2e8f0' : 'text.primary',
            bgcolor: (theme) =>
              theme.palette.mode === 'dark'
                ? 'rgba(71, 85, 105, 0.5)'
                : 'rgba(148, 163, 184, 0.2)',
            '&:hover': {
              bgcolor: (theme) =>
                theme.palette.mode === 'dark'
                  ? 'rgba(71, 85, 105, 0.7)'
                  : 'rgba(148, 163, 184, 0.3)',
            },
          }}
        >
          <CloseIcon />
        </IconButton>

        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <Box
            sx={{
              width: 56,
              height: 56,
              borderRadius: 1.5,
              bgcolor: (theme) =>
                theme.palette.mode === 'dark'
                  ? 'rgba(6, 182, 212, 0.2)'
                  : 'rgba(20, 184, 166, 0.15)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <AddLocationIcon
              sx={{
                color: (theme) =>
                  theme.palette.mode === 'dark' ? '#22d3ee' : '#0d9488',
                fontSize: 32,
              }}
            />
          </Box>
          <Box>
            <Typography
              variant="h5"
              fontWeight="700"
              sx={{
                color: (theme) =>
                  theme.palette.mode === 'dark' ? '#e2e8f0' : 'text.primary',
              }}
            >
              {city ? 'Edit City' : 'Add New City'}
            </Typography>
            <Typography
              variant="body2"
              sx={{
                color: (theme) =>
                  theme.palette.mode === 'dark' ? '#94a3b8' : 'text.secondary',
                mt: 0.5,
              }}
            >
              {city
                ? 'Update city information below'
                : 'Fill in the details to create a new city'}
            </Typography>
          </Box>
        </Box>
      </Box>

      {/* Content */}
      <DialogContent sx={{ p: 4 }}>
        <Box component="form" onSubmit={formik.handleSubmit} sx={{ mt: 1 }}>
          <TextField
            label="City Name"
            name="name"
            value={formik.values.name}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.name && Boolean(formik.errors.name)}
            helperText={formik.touched.name && formik.errors.name}
            fullWidth
            required
            variant="outlined"
            sx={{
              mb: 3,
              '& .MuiOutlinedInput-root': {
                borderRadius: 1.5,
                bgcolor: (theme) =>
                  theme.palette.mode === 'dark' ? 'rgba(51, 65, 85, 0.3)' : 'white',
                '& fieldset': {
                  borderColor: (theme) =>
                    theme.palette.mode === 'dark'
                      ? 'rgba(148, 163, 184, 0.2)'
                      : 'rgba(0, 0, 0, 0.12)',
                },
                '&:hover fieldset': {
                  borderColor: (theme) =>
                    theme.palette.mode === 'dark' ? '#22d3ee' : '#14b8a6',
                },
                '&.Mui-focused fieldset': {
                  borderWidth: 2,
                  borderColor: (theme) =>
                    theme.palette.mode === 'dark' ? '#06b6d4' : '#0d9488',
                },
                '& input': {
                  color: (theme) =>
                    theme.palette.mode === 'dark' ? '#e2e8f0' : 'inherit',
                },
              },
              '& .MuiInputLabel-root': {
                color: (theme) =>
                  theme.palette.mode === 'dark' ? '#94a3b8' : 'inherit',
              },
            }}
            placeholder="Enter city name..."
          />

          <TextField
            label="Description"
            name="description"
            value={formik.values.description}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.description && Boolean(formik.errors.description)}
            helperText={formik.touched.description && formik.errors.description}
            fullWidth
            multiline
            rows={5}
            variant="outlined"
            sx={{
              mb: 4,
              '& .MuiOutlinedInput-root': {
                borderRadius: 1.5,
                bgcolor: (theme) =>
                  theme.palette.mode === 'dark' ? 'rgba(51, 65, 85, 0.3)' : 'white',
                '& fieldset': {
                  borderColor: (theme) =>
                    theme.palette.mode === 'dark'
                      ? 'rgba(148, 163, 184, 0.2)'
                      : 'rgba(0, 0, 0, 0.12)',
                },
                '&:hover fieldset': {
                  borderColor: (theme) =>
                    theme.palette.mode === 'dark' ? '#22d3ee' : '#14b8a6',
                },
                '&.Mui-focused fieldset': {
                  borderWidth: 2,
                  borderColor: (theme) =>
                    theme.palette.mode === 'dark' ? '#06b6d4' : '#0d9488',
                },
                '& textarea': {
                  color: (theme) =>
                    theme.palette.mode === 'dark' ? '#e2e8f0' : 'inherit',
                },
              },
              '& .MuiInputLabel-root': {
                color: (theme) =>
                  theme.palette.mode === 'dark' ? '#94a3b8' : 'inherit',
              },
            }}
            placeholder="Describe the city..."
          />

          {/* Action Buttons */}
          <Box sx={{ display: 'flex', gap: 2, justifyContent: 'flex-end' }}>
            <Button
              variant="outlined"
              onClick={handleClose}
              disabled={isCreating || isUpdating}
              sx={{
                textTransform: 'none',
                borderRadius: 1.5,
                px: 4,
                py: 1.2,
                fontWeight: 600,
                borderColor: (theme) =>
                  theme.palette.mode === 'dark'
                    ? 'rgba(148, 163, 184, 0.3)'
                    : 'grey.400',
                color: (theme) =>
                  theme.palette.mode === 'dark' ? '#94a3b8' : 'text.secondary',
                '&:hover': {
                  borderColor: (theme) =>
                    theme.palette.mode === 'dark' ? '#475569' : 'grey.600',
                  bgcolor: (theme) =>
                    theme.palette.mode === 'dark'
                      ? 'rgba(51, 65, 85, 0.3)'
                      : 'grey.50',
                },
              }}
            >
              Cancel
            </Button>
            <Button
              variant="contained"
              onClick={() => formik.handleSubmit()}
              disabled={isCreating || isUpdating || !formik.isValid}
              startIcon={<SaveIcon />}
              sx={{
                textTransform: 'none',
                borderRadius: 1.5,
                px: 4,
                py: 1.2,
                fontWeight: 600,
                bgcolor: (theme) =>
                  theme.palette.mode === 'dark' ? '#0891b2' : '#14b8a6',
                color: 'white',
                '&:hover': {
                  bgcolor: (theme) =>
                    theme.palette.mode === 'dark' ? '#0e7490' : '#0d9488',
                },
                '&:disabled': {
                  bgcolor: (theme) =>
                    theme.palette.mode === 'dark'
                      ? 'rgba(100, 116, 139, 0.3)'
                      : 'grey.300',
                  color: (theme) =>
                    theme.palette.mode === 'dark'
                      ? 'rgba(148, 163, 184, 0.5)'
                      : 'rgba(0, 0, 0, 0.26)',
                  boxShadow: 'none',
                },
              }}
            >
              {city ? 'Update City' : 'Add City'}
            </Button>
          </Box>
        </Box>
      </DialogContent>
    </Dialog>

    {/* Confirmation Dialog */}
    <Dialog
      open={showConfirmDialog}
      onClose={handleCancelClose}
      maxWidth="xs"
      fullWidth
      slotProps={{
        paper: {
          sx: {
            borderRadius: 2,
            background: (theme) =>
              theme.palette.mode === 'dark'
                ? 'rgba(30, 41, 59, 0.98)'
                : 'rgba(255, 255, 255, 0.98)',
            backdropFilter: 'blur(20px)',
            boxShadow: (theme) =>
              theme.palette.mode === 'dark'
                ? '0 20px 60px rgba(0, 0, 0, 0.6)'
                : '0 20px 60px rgba(0, 0, 0, 0.3)',
            border: (theme) =>
              theme.palette.mode === 'dark'
                ? '1px solid rgba(148, 163, 184, 0.1)'
                : 'none',
          },
        },
      }}
    >
      <DialogTitle
        sx={{
          display: 'flex',
          alignItems: 'center',
          gap: 1.5,
          pb: 2,
          borderBottom: (theme) =>
            theme.palette.mode === 'dark'
              ? '1px solid rgba(148, 163, 184, 0.1)'
              : '1px solid rgba(0, 0, 0, 0.08)',
        }}
      >
        <Box
          sx={{
            width: 40,
            height: 40,
            borderRadius: 1.5,
            bgcolor: (theme) =>
              theme.palette.mode === 'dark'
                ? 'rgba(251, 191, 36, 0.2)'
                : 'rgba(251, 191, 36, 0.15)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <WarningAmberIcon
            sx={{
              color: (theme) =>
                theme.palette.mode === 'dark' ? '#fbbf24' : '#f59e0b',
              fontSize: 24,
            }}
          />
        </Box>
        <Typography
          variant="h6"
          sx={{
            fontWeight: 700,
            color: (theme) =>
              theme.palette.mode === 'dark' ? '#e2e8f0' : 'text.primary',
          }}
        >
          Unsaved Changes
        </Typography>
      </DialogTitle>
      <DialogContent sx={{ pt: 3, pb: 2 }}>
        <Typography
          variant="body1"
          sx={{
            color: (theme) =>
              theme.palette.mode === 'dark' ? '#cbd5e1' : 'text.secondary',
          }}
        >
          You have unsaved changes. Are you sure you want to close this form? All changes will be lost.
        </Typography>
      </DialogContent>
      <DialogActions
        sx={{
          p: 2.5,
          gap: 1,
          borderTop: (theme) =>
            theme.palette.mode === 'dark'
              ? '1px solid rgba(148, 163, 184, 0.1)'
              : '1px solid rgba(0, 0, 0, 0.08)',
        }}
      >
        <Button
          onClick={handleCancelClose}
          variant="outlined"
          sx={{
            textTransform: 'none',
            fontWeight: 600,
            borderColor: (theme) =>
              theme.palette.mode === 'dark' ? 'rgba(148, 163, 184, 0.3)' : 'grey.300',
            color: (theme) =>
              theme.palette.mode === 'dark' ? '#94a3b8' : 'text.secondary',
            '&:hover': {
              borderColor: (theme) =>
                theme.palette.mode === 'dark' ? '#94a3b8' : 'grey.400',
            },
          }}
        >
          Keep Editing
        </Button>
        <Button
          onClick={handleConfirmClose}
          variant="contained"
          color="warning"
          sx={{
            textTransform: 'none',
            fontWeight: 600,
            bgcolor: (theme) =>
              theme.palette.mode === 'dark' ? '#f59e0b' : '#f97316',
            '&:hover': {
              bgcolor: (theme) =>
                theme.palette.mode === 'dark' ? '#d97706' : '#ea580c',
            },
          }}
        >
          Discard Changes
        </Button>
      </DialogActions>
    </Dialog>
  </>
  );
}

export default CityDialog;
