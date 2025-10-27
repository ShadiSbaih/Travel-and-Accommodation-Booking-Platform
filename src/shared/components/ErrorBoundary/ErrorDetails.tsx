import {
  Box,
  Typography,
  Alert,
  Collapse,
  IconButton,
} from '@mui/material';
import { ExpandMore, ExpandLess, BugReport } from '@mui/icons-material';
import { useState } from 'react';

interface ErrorDetailsProps {
  error: Error;
}

function ErrorDetails({ error }: ErrorDetailsProps) {
  const [showDetails, setShowDetails] = useState(false);

  const handleToggleDetails = () => {
    setShowDetails((prev) => !prev);
  };

  return (
    <Alert
      severity="error"
      icon={<BugReport />}
      sx={{
        mb: 3,
        textAlign: 'left',
        '& .MuiAlert-message': {
          width: '100%',
        },
      }}
    >
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Typography variant="body2" sx={{ fontWeight: 600 }}>
          Error: {error.message || 'Unknown error'}
        </Typography>
        <IconButton size="small" onClick={handleToggleDetails} sx={{ ml: 1 }}>
          {showDetails ? <ExpandLess /> : <ExpandMore />}
        </IconButton>
      </Box>

      {/* Error Stack Trace */}
      <Collapse in={showDetails}>
        <Box
          sx={{
            mt: 2,
            p: 2,
            bgcolor: 'grey.900',
            borderRadius: 1,
            maxHeight: 200,
            overflow: 'auto',
          }}
        >
          <Typography
            component="pre"
            variant="caption"
            sx={{
              color: '#ff6b6b',
              fontFamily: 'monospace',
              fontSize: '0.75rem',
              whiteSpace: 'pre-wrap',
              wordBreak: 'break-word',
              margin: 0,
            }}
          >
            {error.stack || error.message}
          </Typography>
        </Box>
      </Collapse>
    </Alert>
  );
}

export default ErrorDetails;
