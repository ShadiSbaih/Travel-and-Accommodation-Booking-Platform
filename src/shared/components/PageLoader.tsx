import { Box, Typography } from "@mui/material";

const PageLoader = () => {
  return (
    <Box
      sx={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        background: "#e5e7eb",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        zIndex: 9999,
      }}
    >
      {/* Spinner matching index.html */}
      <Box
        sx={{
          width: 70,
          height: 70,
          border: "5px solid transparent",
          borderTop: "5px solid #3b82f6",
          borderRight: "5px solid #3b82f6",
          borderRadius: "50%",
          animation: "spin 1s linear infinite",
          "@keyframes spin": {
            "0%": { transform: "rotate(0deg)" },
            "100%": { transform: "rotate(360deg)" },
          },
        }}
      />

      <Typography
        sx={{
          color: "#6b7280",
          fontFamily: "'Poppins', sans-serif",
          fontSize: "1rem",
          fontWeight: 400,
          marginTop: "1.5rem",
          letterSpacing: "0.3px",
        }}
      >
        Loading your content...
      </Typography>
    </Box>
  );
};

export default PageLoader;
