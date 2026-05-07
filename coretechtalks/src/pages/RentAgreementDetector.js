import React, { useState, useRef } from 'react';
import { Box, Typography, Container, Button, Paper, CircularProgress, Grid, Card, CardContent, Divider, Chip, List, ListItem, ListItemIcon, ListItemText } from '@mui/material';
import { UploadCloud, CheckCircle, AlertTriangle, FileText, CheckSquare, AlertCircle } from 'lucide-react';
import { API_BASE_URL } from '../config';

const RentAgreementDetector = () => {
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);
  const fileInputRef = useRef(null);

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      const selectedFile = e.target.files[0];
      if (selectedFile.type !== "application/pdf") {
        setError("Please upload a valid PDF file.");
        setFile(null);
        return;
      }
      setFile(selectedFile);
      setError(null);
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleDrop = (e) => {
    e.preventDefault();
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const droppedFile = e.dataTransfer.files[0];
      if (droppedFile.type !== "application/pdf") {
        setError("Please upload a valid PDF file.");
        return;
      }
      setFile(droppedFile);
      setError(null);
    }
  };

  const analyzeAgreement = async () => {
    if (!file) {
      setError("Please select a file first.");
      return;
    }
    setLoading(true);
    setError(null);

    const formData = new FormData();
    formData.append('file', file);

    try {
      const response = await fetch(`${API_BASE_URL}/api/rent-agreement/analyze`, {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.detail || "Failed to analyze agreement.");
      }

      const data = await response.json();
      setResult(data);
    } catch (err) {
      console.error(err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const getRiskColor = (score) => {
    if (score >= 8) return '#ef4444'; // Red
    if (score >= 4) return '#f59e0b'; // Orange
    return '#10b981'; // Green
  };

  const getRiskLabel = (score) => {
    if (score >= 8) return 'High Risk';
    if (score >= 4) return 'Medium Risk';
    return 'Low Risk';
  };

  return (
    <Box sx={{ flexGrow: 1, py: 8, backgroundColor: '#F8FAFC', minHeight: 'calc(100vh - 200px)' }}>
      <Container maxWidth="lg">
        <Box textAlign="center" mb={6}>
          <Typography variant="h3" component="h1" sx={{ fontWeight: 800, mb: 2, color: '#0f172a' }}>
            Rent Agreement Red Flag Detector
          </Typography>
          <Typography variant="h6" color="text.secondary" maxWidth="800px" mx="auto">
            Upload your rent agreement PDF to instantly get a plain English summary, 
            detect hidden risky clauses, and review a comprehensive tenant rights checklist.
          </Typography>
        </Box>

        {!result && (
          <Paper 
            sx={{ 
              p: 6, 
              textAlign: 'center', 
              borderRadius: 4, 
              border: '2px dashed #cbd5e1',
              backgroundColor: '#ffffff',
              boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
              maxWidth: 600,
              mx: 'auto',
              cursor: 'pointer',
              transition: 'all 0.2s ease',
              '&:hover': { borderColor: '#3b82f6', backgroundColor: '#f0f9ff' }
            }}
            onDragOver={handleDragOver}
            onDrop={handleDrop}
            onClick={() => fileInputRef.current?.click()}
          >
            <input 
              type="file" 
              accept=".pdf" 
              ref={fileInputRef} 
              style={{ display: 'none' }} 
              onChange={handleFileChange}
            />
            <UploadCloud size={64} color="#94a3b8" style={{ marginBottom: 16 }} />
            <Typography variant="h5" fontWeight="bold" gutterBottom>
              {file ? file.name : "Click or drag your PDF here"}
            </Typography>
            <Typography color="text.secondary" mb={4}>
              {file ? "File ready for analysis" : "Supports .pdf files"}
            </Typography>
            
            <Button 
              variant="contained" 
              size="large"
              disabled={loading || !file}
              onClick={(e) => {
                e.stopPropagation();
                analyzeAgreement();
              }}
              sx={{ px: 6, py: 1.5, borderRadius: 2, fontSize: '1.1rem', backgroundColor: '#3b82f6' }}
            >
              {loading ? <CircularProgress size={24} color="inherit" /> : "Analyze Agreement"}
            </Button>
            
            {error && (
              <Typography color="error" sx={{ mt: 3, fontWeight: 500 }}>
                {error}
              </Typography>
            )}
          </Paper>
        )}

        {loading && !result && (
          <Box textAlign="center" mt={4}>
            <Typography variant="h6" color="text.secondary" sx={{ mt: 2, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <CircularProgress size={20} sx={{ mr: 2 }} /> Extracting and analyzing clauses... this may take a moment.
            </Typography>
          </Box>
        )}

        {result && (
          <Box>
            <Box mb={4} display="flex" justifyContent="space-between" alignItems="center">
              <Typography variant="h5" fontWeight="bold" color="#0f172a">Analysis Results</Typography>
              <Button variant="outlined" onClick={() => { setResult(null); setFile(null); }}>
                Analyze Another File
              </Button>
            </Box>

            <Grid container spacing={4}>
              <Grid item xs={12}>
                <Card sx={{ borderRadius: 3, boxShadow: '0 4px 6px -1px rgba(0,0,0,0.1)' }}>
                  <CardContent sx={{ p: 4 }}>
                    <Typography variant="h6" fontWeight="bold" sx={{ display: 'flex', alignItems: 'center', mb: 2, color: '#3b82f6' }}>
                      <FileText size={24} style={{ marginRight: 8 }} /> Plain English Summary
                    </Typography>
                    <Typography variant="body1" fontSize="1.1rem" color="text.secondary" lineHeight={1.6}>
                      {result.summary}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>

              <Grid item xs={12} md={7}>
                <Card sx={{ borderRadius: 3, height: '100%', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.1)' }}>
                  <CardContent sx={{ p: 4 }}>
                    <Typography variant="h6" fontWeight="bold" sx={{ display: 'flex', alignItems: 'center', mb: 3, color: '#ef4444' }}>
                      <AlertTriangle size={24} style={{ marginRight: 8 }} /> Red Flags & Risky Clauses
                    </Typography>
                    
                    {result.risky_clauses && result.risky_clauses.length > 0 ? (
                      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
                        {result.risky_clauses.map((clause, idx) => (
                          <Paper key={idx} sx={{ p: 3, borderRadius: 2, borderLeft: `6px solid ${getRiskColor(clause.risk_score)}`, backgroundColor: '#f8fafc' }}>
                            <Box display="flex" justifyContent="space-between" alignItems="flex-start" mb={2}>
                              <Chip 
                                label={`${getRiskLabel(clause.risk_score)} (${clause.risk_score}/10)`} 
                                sx={{ backgroundColor: getRiskColor(clause.risk_score), color: 'white', fontWeight: 'bold' }} 
                                size="small"
                              />
                            </Box>
                            <Typography variant="subtitle1" fontWeight="bold" color="#0f172a" gutterBottom>
                              " {clause.clause_text} "
                            </Typography>
                            <Divider sx={{ my: 1.5 }} />
                            <Typography variant="body2" color="text.secondary" sx={{ display: 'flex', alignItems: 'flex-start' }}>
                              <AlertCircle size={16} color={getRiskColor(clause.risk_score)} style={{ marginRight: 8, marginTop: 2, minWidth: 16 }} />
                              {clause.reason}
                            </Typography>
                          </Paper>
                        ))}
                      </Box>
                    ) : (
                      <Typography color="text.secondary" fontStyle="italic">No major red flags detected in this agreement.</Typography>
                    )}
                  </CardContent>
                </Card>
              </Grid>

              <Grid item xs={12} md={5}>
                <Card sx={{ borderRadius: 3, height: '100%', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.1)', backgroundColor: '#f0fdf4' }}>
                  <CardContent sx={{ p: 4 }}>
                    <Typography variant="h6" fontWeight="bold" sx={{ display: 'flex', alignItems: 'center', mb: 3, color: '#16a34a' }}>
                      <CheckSquare size={24} style={{ marginRight: 8 }} /> Tenant Rights Checklist
                    </Typography>
                    
                    {result.tenant_checklist && result.tenant_checklist.length > 0 ? (
                      <List disablePadding>
                        {result.tenant_checklist.map((item, idx) => (
                          <ListItem key={idx} sx={{ px: 0, py: 1.5, alignItems: 'flex-start' }}>
                            <ListItemIcon sx={{ minWidth: 32, mt: 0.5 }}>
                              <CheckCircle size={20} color="#16a34a" />
                            </ListItemIcon>
                            <ListItemText 
                              primary={item} 
                              primaryTypographyProps={{ variant: 'body1', color: '#1e293b', fontWeight: 500 }} 
                            />
                          </ListItem>
                        ))}
                      </List>
                    ) : (
                      <Typography color="text.secondary" fontStyle="italic">Checklist not available.</Typography>
                    )}
                  </CardContent>
                </Card>
              </Grid>

            </Grid>
          </Box>
        )}
      </Container>
    </Box>
  );
};

export default RentAgreementDetector;
