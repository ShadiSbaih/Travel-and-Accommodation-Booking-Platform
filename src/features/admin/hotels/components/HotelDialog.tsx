import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogActions,
  Box,
  TextField,
  MenuItem,
  Button,
  Typography,
  IconButton,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import SaveIcon from "@mui/icons-material/Save";
import HotelIcon from "@mui/icons-material/Hotel";
import WarningAmberIcon from "@mui/icons-material/WarningAmber";
import { useFormik } from "formik";
import { useQuery } from "@tanstack/react-query";
import { useHotels } from "../hooks/useHotels";
import { citiesApi } from "@/features/admin/cities/api/cities.api";
import { hotelValidationSchema } from "../utils/validation.utils";
import type { Hotel } from "../types";

interface HotelDialogProps {
  open: boolean;
  onClose: () => void;
  hotel: Hotel | null;
}

const hotelTypes = [
  "Resort",
  "Hotel",
  "Motel",
  "Boutique",
  "Inn",
  "Lodge",
  "Hostel",
];

const CITY_MENU_ITEM_HEIGHT = 48;
const CITY_MENU_PADDING_TOP = 8;
const CITY_MENU_MAX_VISIBLE_ITEMS = 6;

function HotelDialog({ open, onClose, hotel }: HotelDialogProps) {
  const [showConfirmDialog, setShowConfirmDialog] = useState(false);
  const { createHotel, updateHotel, isCreating, isUpdating } = useHotels();

  // Fetch cities for dropdown
  const { data: cities = [] } = useQuery({
    queryKey: ["cities"],
    queryFn: () => citiesApi.getCities(),
  });

  const formik = useFormik({
    initialValues: {
      name: hotel?.hotelName || "",
      description: hotel?.description || "",
      hotelType: hotel?.hotelType || "Hotel",
      starRating: hotel?.starRating || 3,
      latitude: hotel?.latitude || 0,
      longitude: hotel?.longitude || 0,
      cityId: hotel?.cityId?.toString() || "",
    },
    validationSchema: hotelValidationSchema,
    enableReinitialize: true,
    onSubmit: (values) => {
      const currentCity = cities.find(
        (city) => city.id === Number(values.cityId)
      );

      const hotelData = {
        hotelName: values.name,
        name: values.name,
        description: values.description,
        hotelType: values.hotelType,
        starRating: Number(values.starRating),
        latitude: Number(values.latitude),
        longitude: Number(values.longitude),
        location: currentCity?.name || "",
        cityId: Number(values.cityId),
        imageUrl: "",
        availableRooms: 0,
      };

      if (hotel) {
        updateHotel(
          { hotelId: hotel.id, data: hotelData },
          {
            onSuccess: () => {
              formik.resetForm();
              onClose();
            },
          }
        );
      } else {
        createHotel(hotelData, {
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

  const isLoading = isCreating || isUpdating;
  const currentCity = cities.find(
    (city) => city.id === Number(formik.values.cityId)
  );

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
                theme.palette.mode === "dark"
                  ? "rgba(30, 41, 59, 0.98)"
                  : "rgba(255, 255, 255, 0.98)",
              backdropFilter: "blur(20px)",
              boxShadow: (theme) =>
                theme.palette.mode === "dark"
                  ? "0 20px 60px rgba(0, 0, 0, 0.6)"
                  : "0 20px 60px rgba(0, 0, 0, 0.3)",
              overflow: "hidden",
              border: (theme) =>
                theme.palette.mode === "dark"
                  ? "1px solid rgba(148, 163, 184, 0.1)"
                  : "none",
            },
          },
        }}
      >
        {/* Header */}
        <Box
          sx={{
            bgcolor: (theme) =>
              theme.palette.mode === "dark"
                ? "rgba(99, 102, 241, 0.15)"
                : "rgba(99, 102, 241, 0.1)",
            p: 2.5,
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            borderBottom: (theme) =>
              theme.palette.mode === "dark"
                ? "1px solid rgba(148, 163, 184, 0.1)"
                : "1px solid rgba(0, 0, 0, 0.08)",
          }}
        >
          <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
            <Box
              sx={{
                width: 40,
                height: 40,
                borderRadius: 1.5,
                bgcolor: (theme) =>
                  theme.palette.mode === "dark"
                    ? "rgba(99, 102, 241, 0.2)"
                    : "rgba(99, 102, 241, 0.15)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <HotelIcon
                sx={{
                  color: (theme) =>
                    theme.palette.mode === "dark" ? "#818cf8" : "#6366f1",
                  fontSize: 24,
                }}
              />
            </Box>
            <Typography
              variant="h6"
              sx={{
                fontWeight: 700,
                color: (theme) =>
                  theme.palette.mode === "dark" ? "#e2e8f0" : "text.primary",
              }}
            >
              {hotel ? "Edit Hotel" : "Create New Hotel"}
            </Typography>
          </Box>
          <IconButton
            onClick={handleClose}
            size="small"
            aria-label="Close dialog"
            sx={{
              color: (theme) =>
                theme.palette.mode === "dark" ? "#94a3b8" : "text.secondary",
            }}
          >
            <CloseIcon />
          </IconButton>
        </Box>

        {/* Content */}
        <DialogContent sx={{ p: 4 }}>
          <Box component="form" onSubmit={formik.handleSubmit}>
            <Box
              sx={{ mt: 1, display: "flex", flexDirection: "column", gap: 3 }}
            >
              {/* Hotel Name */}
              <TextField
                label="Hotel Name"
                name="name"
                value={formik.values.name}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.name && Boolean(formik.errors.name)}
                helperText={formik.touched.name && formik.errors.name}
                fullWidth
                required
                placeholder="Enter hotel name..."
              />

              {/* Hotel Type and Star Rating - Grid */}
              <Box
                sx={{
                  display: "grid",
                  gridTemplateColumns: { xs: "1fr", sm: "1fr 1fr" },
                  gap: 3,
                }}
              >
                <TextField
                  select
                  label="Hotel Type"
                  name="hotelType"
                  value={formik.values.hotelType}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={
                    formik.touched.hotelType && Boolean(formik.errors.hotelType)
                  }
                  helperText={
                    formik.touched.hotelType && formik.errors.hotelType
                  }
                  fullWidth
                  required
                >
                  {hotelTypes.map((type) => (
                    <MenuItem key={type} value={type}>
                      {type}
                    </MenuItem>
                  ))}
                </TextField>

                <TextField
                  type="number"
                  label="Star Rating"
                  name="starRating"
                  value={formik.values.starRating}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={
                    formik.touched.starRating &&
                    Boolean(formik.errors.starRating)
                  }
                  helperText={
                    formik.touched.starRating && formik.errors.starRating
                  }
                  fullWidth
                  required
                  slotProps={{ htmlInput: { min: 1, max: 5 } }}
                />
              </Box>

              {/* Location (City) */}
              <TextField
                select
                label="Location"
                name="cityId"
                value={formik.values.cityId}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.cityId && Boolean(formik.errors.cityId)}
                helperText={
                  formik.touched.cityId && formik.errors.cityId
                    ? formik.errors.cityId
                    : currentCity
                    ? `Current: ${currentCity.name}`
                    : "Select a city/location"
                }
                fullWidth
                required
                SelectProps={{
                  MenuProps: {
                    PaperProps: {
                      sx: {
                        maxHeight:
                          CITY_MENU_ITEM_HEIGHT * CITY_MENU_MAX_VISIBLE_ITEMS +
                          CITY_MENU_PADDING_TOP,
                      },
                    },
                  },
                }}
              >
                {cities.map((city) => (
                  <MenuItem key={city.id} value={city.id.toString()}>
                    {city.name}
                  </MenuItem>
                ))}
              </TextField>

              {/* Latitude and Longitude - Grid */}
              <Box
                sx={{
                  display: "grid",
                  gridTemplateColumns: { xs: "1fr", sm: "1fr 1fr" },
                  gap: 3,
                }}
              >
                <TextField
                  type="number"
                  label="Latitude"
                  name="latitude"
                  value={formik.values.latitude}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={
                    formik.touched.latitude && Boolean(formik.errors.latitude)
                  }
                  helperText={formik.touched.latitude && formik.errors.latitude}
                  fullWidth
                  required
                  slotProps={{ htmlInput: { step: "any" } }}
                  placeholder="e.g., -8.3405"
                />

                <TextField
                  type="number"
                  label="Longitude"
                  name="longitude"
                  value={formik.values.longitude}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={
                    formik.touched.longitude && Boolean(formik.errors.longitude)
                  }
                  helperText={
                    formik.touched.longitude && formik.errors.longitude
                  }
                  fullWidth
                  required
                  slotProps={{ htmlInput: { step: "any" } }}
                  placeholder="e.g., 115.0915"
                />
              </Box>

              {/* Description */}
              <TextField
                label="Description"
                name="description"
                value={formik.values.description}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={
                  formik.touched.description &&
                  Boolean(formik.errors.description)
                }
                helperText={
                  formik.touched.description && formik.errors.description
                }
                fullWidth
                multiline
                rows={5}
                placeholder="Describe the hotel..."
              />
            </Box>
          </Box>
        </DialogContent>

        {/* Footer */}
        <Box
          sx={{
            p: 2.5,
            display: "flex",
            justifyContent: "flex-end",
            gap: 1.5,
            borderTop: (theme) =>
              theme.palette.mode === "dark"
                ? "1px solid rgba(148, 163, 184, 0.1)"
                : "1px solid rgba(0, 0, 0, 0.08)",
          }}
        >
          <Button
            onClick={handleClose}
            variant="outlined"
            disabled={isLoading}
            sx={{
              textTransform: "none",
              fontWeight: 600,
              borderColor: (theme) =>
                theme.palette.mode === "dark"
                  ? "rgba(148, 163, 184, 0.3)"
                  : "grey.300",
              color: (theme) =>
                theme.palette.mode === "dark" ? "#94a3b8" : "text.secondary",
              "&:hover": {
                borderColor: (theme) =>
                  theme.palette.mode === "dark" ? "#94a3b8" : "grey.400",
              },
            }}
          >
            Cancel
          </Button>
          <Button
            onClick={() => formik.handleSubmit()}
            variant="contained"
            disabled={isLoading || !formik.isValid}
            startIcon={<SaveIcon />}
            sx={{
              textTransform: "none",
              fontWeight: 600,
              bgcolor: (theme) =>
                theme.palette.mode === "dark" ? "#6366f1" : "#6366f1",
              "&:hover": {
                bgcolor: (theme) =>
                  theme.palette.mode === "dark" ? "#4f46e5" : "#4f46e5",
              },
            }}
          >
            {isLoading ? "Saving..." : hotel ? "Update Hotel" : "Create Hotel"}
          </Button>
        </Box>
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
                theme.palette.mode === "dark"
                  ? "rgba(30, 41, 59, 0.98)"
                  : "rgba(255, 255, 255, 0.98)",
              backdropFilter: "blur(20px)",
              boxShadow: (theme) =>
                theme.palette.mode === "dark"
                  ? "0 20px 60px rgba(0, 0, 0, 0.6)"
                  : "0 20px 60px rgba(0, 0, 0, 0.3)",
              border: (theme) =>
                theme.palette.mode === "dark"
                  ? "1px solid rgba(148, 163, 184, 0.1)"
                  : "none",
            },
          },
        }}
      >
        <DialogTitle
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 1.5,
            pb: 2,
            borderBottom: (theme) =>
              theme.palette.mode === "dark"
                ? "1px solid rgba(148, 163, 184, 0.1)"
                : "1px solid rgba(0, 0, 0, 0.08)",
          }}
        >
          <Box
            sx={{
              width: 40,
              height: 40,
              borderRadius: 1.5,
              bgcolor: (theme) =>
                theme.palette.mode === "dark"
                  ? "rgba(251, 191, 36, 0.2)"
                  : "rgba(251, 191, 36, 0.15)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <WarningAmberIcon
              sx={{
                color: (theme) =>
                  theme.palette.mode === "dark" ? "#fbbf24" : "#f59e0b",
                fontSize: 24,
              }}
            />
          </Box>
          <Typography
            variant="h6"
            sx={{
              fontWeight: 700,
              color: (theme) =>
                theme.palette.mode === "dark" ? "#e2e8f0" : "text.primary",
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
                theme.palette.mode === "dark" ? "#cbd5e1" : "text.secondary",
            }}
          >
            You have unsaved changes. Are you sure you want to close this form?
            All changes will be lost.
          </Typography>
        </DialogContent>
        <DialogActions
          sx={{
            p: 2.5,
            gap: 1,
            borderTop: (theme) =>
              theme.palette.mode === "dark"
                ? "1px solid rgba(148, 163, 184, 0.1)"
                : "1px solid rgba(0, 0, 0, 0.08)",
          }}
        >
          <Button
            onClick={handleCancelClose}
            variant="outlined"
            sx={{
              textTransform: "none",
              fontWeight: 600,
              borderColor: (theme) =>
                theme.palette.mode === "dark"
                  ? "rgba(148, 163, 184, 0.3)"
                  : "grey.300",
              color: (theme) =>
                theme.palette.mode === "dark" ? "#94a3b8" : "text.secondary",
              "&:hover": {
                borderColor: (theme) =>
                  theme.palette.mode === "dark" ? "#94a3b8" : "grey.400",
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
              textTransform: "none",
              fontWeight: 600,
              bgcolor: (theme) =>
                theme.palette.mode === "dark" ? "#f59e0b" : "#f97316",
              "&:hover": {
                bgcolor: (theme) =>
                  theme.palette.mode === "dark" ? "#d97706" : "#ea580c",
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

export default HotelDialog;
