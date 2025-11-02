import { Box, CircularProgress, Typography } from "@mui/material";

const PageLoader = () => (
  <Box
    sx={{
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",
      minHeight: "100vh",
      background: "linear-gradient(135deg, #0f172a 0%, #1e293b 100%)",
      color: "#e2e8f0",
      gap: 3,
    }}
  >
    {/* Outer glow ring */}
    <Box
      sx={{
        position: "relative",
        width: 100,
        height: 100,
        borderRadius: "50%",
        background:
          "radial-gradient(circle at center, rgba(59,130,246,0.3), transparent 70%)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        animation: "pulse 2s ease-in-out infinite",
        "@keyframes pulse": {
          "0%, 100%": { transform: "scale(1)", opacity: 0.7 },
          "50%": { transform: "scale(1.15)", opacity: 1 },
        },
      }}
    >
      <CircularProgress
        size={70}
        thickness={4}
        sx={{
          color: "#3b82f6",
          filter: "drop-shadow(0 0 12px rgba(59,130,246,0.7))",
        }}
      />
    </Box>

    <Typography
      variant="h6"
      sx={{
        letterSpacing: 1.2,
        mt: 2,
        opacity: 0.85,
        animation: "fade 2s ease-in-out infinite",
        "@keyframes fade": {
          "0%, 100%": { opacity: 0.4 },
          "50%": { opacity: 1 },
        },
      }}
    >
      Loading your content...
    </Typography>
  </Box>
);

export default PageLoader;
