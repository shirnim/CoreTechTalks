import React from 'react';
import { Box, Typography, Container, Button, Paper } from '@mui/material';
import { Link } from 'react-router-dom';
import CancelOutlinedIcon from '@mui/icons-material/CancelOutlined';

const PaymentCancel = () => {
  return (
    <Box sx={{ flexGrow: 1, py: 10, backgroundColor: '#FEF2F2', minHeight: 'calc(100vh - 200px)' }}>
      <Container maxWidth="sm">
        <Paper sx={{ p: 5, textAlign: 'center', borderRadius: 4, boxShadow: 3 }}>
          <CancelOutlinedIcon color="error" sx={{ fontSize: 80, mb: 2 }} />
          <Typography variant="h4" gutterBottom fontWeight="bold">Checkout Cancelled</Typography>
          <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
            Your transaction was cancelled and you have not been charged.
          </Typography>
          <Button component={Link} to="/tools" variant="contained" size="large">
            Return to Tools
          </Button>
        </Paper>
      </Container>
    </Box>
  );
};

export default PaymentCancel;
