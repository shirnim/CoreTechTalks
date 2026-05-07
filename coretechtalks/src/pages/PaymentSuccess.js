import React, { useEffect, useState } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { Box, Typography, Container, Button, Paper, CircularProgress } from '@mui/material';
import DownloadIcon from '@mui/icons-material/Download';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import { API_BASE_URL } from '../config';

const PaymentSuccess = () => {
  const [searchParams] = useSearchParams();
  const sessionId = searchParams.get('session_id');
  const [status, setStatus] = useState('verifying'); // verifying, success, error
  const [token, setToken] = useState(null);
  const [toolName, setToolName] = useState("");

  useEffect(() => {
    if (!sessionId) {
      setStatus('error');
      return;
    }

    fetch(`${API_BASE_URL}/api/verify-session?session_id=${sessionId}`)
      .then(res => {
        if (!res.ok) throw new Error("Verification failed");
        return res.json();
      })
      .then(data => {
        setToken(data.token);
        setToolName(data.tool_name);
        setStatus('success');
      })
      .catch(err => {
        console.error("Verification error:", err);
        setStatus('error');
      });
  }, [sessionId]);

  return (
    <Box sx={{ flexGrow: 1, py: 10, backgroundColor: '#F0FDF4', minHeight: 'calc(100vh - 200px)' }}>
      <Container maxWidth="sm">
        <Paper sx={{ p: 5, textAlign: 'center', borderRadius: 4, boxShadow: 3 }}>
          {status === 'verifying' && (
            <>
              <CircularProgress size={60} sx={{ mb: 3 }} />
              <Typography variant="h5">Verifying Payment...</Typography>
            </>
          )}

          {status === 'error' && (
            <>
              <Typography variant="h5" color="error" gutterBottom>Payment Verification Failed</Typography>
              <Typography color="text.secondary" sx={{ mb: 3 }}>
                We could not verify your payment session. If you believe this is an error, please contact support.
              </Typography>
              <Button component={Link} to="/tools" variant="contained">Return to Tools</Button>
            </>
          )}

          {status === 'success' && (
            <>
              <CheckCircleOutlineIcon color="success" sx={{ fontSize: 80, mb: 2 }} />
              <Typography variant="h4" gutterBottom fontWeight="bold">Payment Successful!</Typography>
              <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
                Thank you for purchasing <strong>{toolName}</strong>. Your secure download link has been generated. Note: This link expires in 10 minutes and can be used once. We have also sent you an email with the link.
              </Typography>
              
              <Button 
                variant="contained" 
                color="primary" 
                size="large"
                startIcon={<DownloadIcon />}
                href={`${API_BASE_URL}/api/download?token=${token}`}
                sx={{ mb: 2, display: 'flex', width: '100%' }}
              >
                Download File Now
              </Button>
            </>
          )}
        </Paper>
      </Container>
    </Box>
  );
};

export default PaymentSuccess;
