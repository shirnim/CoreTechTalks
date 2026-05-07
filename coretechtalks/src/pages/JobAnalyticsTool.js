import React, { useState, useEffect } from 'react';
import { 
  Box, Typography, Container, TextField, Button, Paper, Grid,
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TablePagination,
  CircularProgress, Card, CardContent, Tabs, Tab, Autocomplete, Collapse, IconButton, List, ListItem, ListItemIcon, ListItemText, Chip
} from '@mui/material';
import { Search, Download, BarChart2, ChevronDown, ChevronUp, CheckCircle2, Wrench, Award, CheckSquare } from 'lucide-react';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell
} from 'recharts';
import { API_BASE_URL } from '../config';

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8', '#82ca9d', '#ffc658', '#4caf50'];

const COMMON_ROLES = [
  "Software Engineer", "Data Scientist", "Product Manager", "QA Automation Engineer", 
  "DevOps Engineer", "Frontend Developer", "Backend Developer", "Full Stack Engineer", 
  "UX Designer", "Technical Project Manager", "Machine Learning Engineer"
];

const COMMON_LOCATIONS = [
  "Remote", "New York, USA", "San Francisco, USA", "London, UK", "Berlin, Germany", 
  "Toronto, Canada", "Sydney, Australia", "Mumbai, India", "Bengaluru, India", 
  "Pune, India", "Hyderabad, India", "Delhi, India", "Seattle, USA", "Singapore"
];

const EXPERIENCE_LEVELS = [
  "Internship", "Entry level", "Associate", "Mid-Senior level", "Director", "Executive"
];

const JobRow = ({ job }) => {
  const [open, setOpen] = useState(false);

  return (
    <React.Fragment>
      <TableRow hover sx={{ '& > *': { borderBottom: 'unset' } }}>
        <TableCell>
          <IconButton aria-label="expand row" size="small" onClick={() => setOpen(!open)}>
            {open ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
          </IconButton>
        </TableCell>
        <TableCell>
          <a href={job.job_link} target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'none', color: '#1976d2', fontWeight: 500 }}>
            {job.job_title}
          </a>
        </TableCell>
        <TableCell>{job.company}</TableCell>
        <TableCell>{job.location}</TableCell>
        <TableCell>{job.experience}</TableCell>
        <TableCell>{job.posted_date}</TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box sx={{ margin: 2, p: 3, backgroundColor: '#f8fafc', borderRadius: 2, border: '1px solid #e2e8f0' }}>
              <Typography variant="h6" gutterBottom component="div" fontWeight="bold" color="#0f172a">
                NLP Extracted Job Details
              </Typography>
              
              <Grid container spacing={4} sx={{ mt: 1 }}>
                <Grid item xs={12} md={6}>
                  <Box sx={{ mb: 3 }}>
                    <Typography variant="subtitle1" fontWeight="bold" sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                      <CheckSquare size={18} style={{ marginRight: 8, color: '#3b82f6' }} /> Responsibilities
                    </Typography>
                    {job.responsibilities && job.responsibilities.length > 0 ? (
                      <List dense disablePadding>
                        {job.responsibilities.map((req, i) => (
                          <ListItem key={i} sx={{ px: 0, py: 0.5, alignItems: 'flex-start' }}>
                            <ListItemIcon sx={{ minWidth: 28, mt: 0.5 }}><CheckCircle2 size={14} color="#64748b" /></ListItemIcon>
                            <ListItemText primary={req} primaryTypographyProps={{ variant: 'body2', color: 'text.secondary' }} />
                          </ListItem>
                        ))}
                      </List>
                    ) : (
                      <Typography variant="body2" color="text.secondary" fontStyle="italic">Not extracted</Typography>
                    )}
                  </Box>
                  
                  <Box>
                    <Typography variant="subtitle1" fontWeight="bold" sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                      <CheckCircle2 size={18} style={{ marginRight: 8, color: '#10b981' }} /> Qualifications
                    </Typography>
                    {job.qualifications && job.qualifications.length > 0 ? (
                      <List dense disablePadding>
                        {job.qualifications.map((qual, i) => (
                          <ListItem key={i} sx={{ px: 0, py: 0.5, alignItems: 'flex-start' }}>
                            <ListItemIcon sx={{ minWidth: 28, mt: 0.5 }}><CheckCircle2 size={14} color="#64748b" /></ListItemIcon>
                            <ListItemText primary={qual} primaryTypographyProps={{ variant: 'body2', color: 'text.secondary' }} />
                          </ListItem>
                        ))}
                      </List>
                    ) : (
                      <Typography variant="body2" color="text.secondary" fontStyle="italic">Not extracted</Typography>
                    )}
                  </Box>
                </Grid>
                
                <Grid item xs={12} md={6}>
                  <Box sx={{ mb: 3 }}>
                    <Typography variant="subtitle1" fontWeight="bold" sx={{ display: 'flex', alignItems: 'center', mb: 1.5 }}>
                      <Wrench size={18} style={{ marginRight: 8, color: '#f59e0b' }} /> Tools & Tech Stack
                    </Typography>
                    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                      {job.tools && job.tools !== "Not specified" ? (
                        job.tools.split(',').map((tool, i) => (
                          <Chip key={i} label={tool.trim()} size="small" variant="outlined" sx={{ borderColor: '#cbd5e1', backgroundColor: '#fff' }} />
                        ))
                      ) : (
                        <Typography variant="body2" color="text.secondary" fontStyle="italic">No specific tools mentioned</Typography>
                      )}
                    </Box>
                  </Box>
                  
                  <Box>
                    <Typography variant="subtitle1" fontWeight="bold" sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                      <Award size={18} style={{ marginRight: 8, color: '#8b5cf6' }} /> Certifications
                    </Typography>
                    {job.certifications && job.certifications !== "None required" ? (
                      <Typography variant="body2" color="text.secondary">{job.certifications}</Typography>
                    ) : (
                      <Typography variant="body2" color="text.secondary" fontStyle="italic">None required</Typography>
                    )}
                  </Box>
                </Grid>
              </Grid>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
};

const JobAnalyticsTool = () => {
  const [isLinkedInConnected, setIsLinkedInConnected] = useState(false);
  const [linkedinUsername, setLinkedinUsername] = useState('');
  const [linkedinPassword, setLinkedinPassword] = useState('');
  const [isAuthenticating, setIsAuthenticating] = useState(false);
  const [authError, setAuthError] = useState('');
  const [activeTab, setActiveTab] = useState(0);
  const [isScraping, setIsScraping] = useState(false);
  const [jobs, setJobs] = useState([]);
  const [totalJobs, setTotalJobs] = useState(0);
  const [loading, setLoading] = useState(false);

  const [searchTerm, setSearchTerm] = useState('');
  const [location, setLocation] = useState('');
  const [experience, setExperience] = useState('');

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const [analyticsData, setAnalyticsData] = useState(null);
  const [analyticsLoading, setAnalyticsLoading] = useState(false);

  useEffect(() => {
    fetchJobs();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page, rowsPerPage]);

  const fetchJobs = async () => {
    setLoading(true);
    try {
      const response = await fetch(`${API_BASE_URL}/api/jobs/search`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          term: searchTerm,
          location: location,
          experience: experience,
          page: page + 1,
          limit: rowsPerPage
        })
      });
      const data = await response.json();
      setJobs(data.results || []);
      setTotalJobs(data.total_results || 0);
    } catch (err) {
      console.error('Failed to fetch jobs', err);
    } finally {
      setLoading(false);
    }
  };

  const handleSearchClick = async () => {
    setPage(0);
    setIsScraping(true);
    try {
      const response = await fetch(`${API_BASE_URL}/api/jobs/live-scrape`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          username: linkedinUsername,
          password: linkedinPassword,
          term: searchTerm,
          location: location,
          experience: experience
        })
      });
      const data = await response.json();
      if (!response.ok) {
        alert(`Scrape failed: ${data.detail || 'Unknown error'}`);
      } else {
        console.log(`[Scrape] Success: ${data.total_jobs_scraped} jobs scraped`);
      }
    } catch (err) {
      console.error('LinkedIn Scraper Service disconnected or timed out:', err);
      alert('Connection to scraping service timed out. Results may be incomplete.');
    } finally {
      setIsScraping(false);
      fetchJobs();
      if (activeTab === 1) {
        fetchAnalytics();
      }
    }
  };

  const handleExport = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/api/jobs/export`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          term: searchTerm,
          location: location,
          experience: experience
        })
      });
      
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `job_analytics_export_${new Date().getTime()}.xlsx`;
      document.body.appendChild(a);
      a.click();
      a.remove();
    } catch (err) {
      console.error('Export failed', err);
      alert('Failed to export. Check server connection.');
    }
  };

  const fetchAnalytics = async () => {
    setAnalyticsLoading(true);
    try {
      const response = await fetch(`${API_BASE_URL}/api/jobs/analyze`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          term: searchTerm,
          location: location,
          experience: experience
        })
      });
      const data = await response.json();
      setAnalyticsData(data);
    } catch (err) {
      console.error('Failed to fetch analytics', err);
    } finally {
      setAnalyticsLoading(false);
    }
  };

  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
    if (newValue === 1 && !analyticsData) {
      fetchAnalytics();
    }
  };

  if (isScraping) {
    return (
      <Box sx={{ flexGrow: 1, py: 15, backgroundColor: '#F8FAFC', minHeight: 'calc(100vh - 200px)', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <CircularProgress size={80} sx={{ mb: 4, color: '#0077b5' }} />
        <Typography variant="h4" fontWeight="800" gutterBottom>
          Live Scrape in Progress...
        </Typography>
        <Typography variant="subtitle1" color="text.secondary">
          Navigating securely to fetch the absolute latest opportunities matching your criteria.
        </Typography>
        <Typography variant="body2" color="error" sx={{ mt: 2 }}>
          (This can take 30-90 seconds. A Chrome window may pop up on your server if security tasks are pending.)
        </Typography>
      </Box>
    );
  }

  const handleLogin = async () => {
    setIsAuthenticating(true);
    setAuthError('');
    try {
      const response = await fetch(`${API_BASE_URL}/api/jobs/verify-linkedin`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          username: linkedinUsername,
          password: linkedinPassword
        })
      });
      if (response.ok) {
        setIsLinkedInConnected(true);
      } else {
        const errorData = await response.json();
        setAuthError(errorData.detail || 'Authentication failed. Please check credentials or solve CAPTCHA on the server.');
      }
    } catch (err) {
      console.error('Verify failed', err);
      setAuthError('Server connection failed while verifying credentials.');
    } finally {
      setIsAuthenticating(false);
    }
  };

  if (!isLinkedInConnected) {
    if (isAuthenticating) {
      return (
        <Box sx={{ flexGrow: 1, py: 15, backgroundColor: '#F8FAFC', minHeight: 'calc(100vh - 200px)', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
          <CircularProgress size={70} sx={{ mb: 4, color: '#0077b5' }} />
          <Typography variant="h5" fontWeight="700" color="#0077b5" gutterBottom>
            Validating Credentials...
          </Typography>
          <Typography variant="body1" color="text.secondary">
            Securely connecting to LinkedIn in the background to instantiate your session.
          </Typography>
        </Box>
      );
    }

    return (
      <Box sx={{ flexGrow: 1, py: 10, backgroundColor: '#F8FAFC', minHeight: 'calc(100vh - 200px)', display: 'flex', alignItems: 'center' }}>
        <Container maxWidth="xs" sx={{ maxWidth: '400px !important' }}>
          <Paper sx={{ p: 4, textAlign: 'center', borderRadius: 2, boxShadow: '0 4px 12px rgba(0,0,0,0.15)' }}>
            <Typography variant="h5" component="h1" sx={{ fontWeight: 700, mb: 1, color: '#0077b5' }}>
              Sign in
            </Typography>
            <Typography variant="body2" color="text.secondary" mb={3}>
              Connect with your LinkedIn credentials to activate live market tracking.
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2.5, mb: 3 }}>
              <TextField 
                label="Email or Phone" 
                variant="outlined" 
                size="small"
                fullWidth 
                value={linkedinUsername}
                onChange={(e) => setLinkedinUsername(e.target.value)}
              />
              <TextField 
                label="Password" 
                type="password"
                variant="outlined" 
                size="small"
                fullWidth 
                value={linkedinPassword}
                onChange={(e) => setLinkedinPassword(e.target.value)}
              />
            </Box>
            
            {authError && (
              <Typography variant="body2" color="error" sx={{ mb: 3, fontWeight: 'bold' }}>
                {authError}
              </Typography>
            )}

            <Button 
              variant="contained" 
              size="large" 
              fullWidth
              disabled={!linkedinUsername || !linkedinPassword}
              sx={{ backgroundColor: '#0077b5', '&:hover': { backgroundColor: '#005582' }, py: 1.5, fontSize: '1.1rem', borderRadius: 2 }}
              onClick={handleLogin}
            >
              Sign in with LinkedIn
            </Button>
          </Paper>
        </Container>
      </Box>
    );
  }

  return (
    <Box sx={{ flexGrow: 1, py: 6, backgroundColor: '#F8FAFC', minHeight: 'calc(100vh - 200px)' }}>
      <Container maxWidth="xl">
        <Typography variant="h3" component="h1" sx={{ fontWeight: 800, mb: 1 }}>
          Job Analytics
        </Typography>
        <Typography variant="subtitle1" color="text.secondary" mb={4}>
          Search, export, and visualize real-time job market data.
        </Typography>

        <Paper sx={{ p: 3, mb: 4, borderRadius: 3, boxShadow: 2 }}>
          <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, flexWrap: 'wrap', gap: 2, alignItems: 'stretch' }}>
            <Autocomplete
              sx={{ flex: 2, minWidth: '250px' }}
              freeSolo
              options={COMMON_ROLES}
              inputValue={searchTerm}
              onInputChange={(event, newInputValue) => setSearchTerm(newInputValue || '')}
              renderInput={(params) => (
                <TextField {...params} label="Search Keyword (e.g. QA, Engineer)" variant="outlined" />
              )}
            />
            <Autocomplete
              sx={{ flex: 1.5, minWidth: '200px' }}
              freeSolo
              options={COMMON_LOCATIONS}
              inputValue={location}
              onInputChange={(event, newInputValue) => setLocation(newInputValue || '')}
              renderInput={(params) => (
                <TextField {...params} label="Location" variant="outlined" />
              )}
            />
            <Autocomplete
              sx={{ flex: 1.2, minWidth: '180px' }}
              options={EXPERIENCE_LEVELS}
              value={experience || null}
              onChange={(event, newValue) => setExperience(newValue || '')}
              renderInput={(params) => (
                <TextField {...params} label="Experience Level" variant="outlined" />
              )}
            />
            <Box sx={{ display: 'flex', flex: 1.5, minWidth: '250px', gap: 2, alignItems: 'center' }}>
              <Button 
                variant="contained" 
                color="primary" 
                startIcon={<Search size={20} />}
                onClick={handleSearchClick}
                sx={{ height: '56px', flex: 1 }}
              >
                Search
              </Button>
              <Button 
                variant="outlined" 
                color="secondary" 
                startIcon={<Download size={20} />}
                onClick={handleExport}
                sx={{ height: '56px', flex: 1 }}
              >
                Export
              </Button>
            </Box>
          </Box>
        </Paper>

        <Paper sx={{ borderRadius: 3, boxShadow: 2, overflow: 'hidden' }}>
          <Tabs 
            value={activeTab} 
            onChange={handleTabChange} 
            sx={{ borderBottom: 1, borderColor: 'divider', px: 2, pt: 2 }}
          >
            <Tab label="Detailed Results" sx={{ fontWeight: 'bold' }} />
            <Tab label={<Box display="flex" alignItems="center"><BarChart2 size={18} style={{marginRight:8}} /> Analytics Dashboard</Box>} sx={{ fontWeight: 'bold' }} />
          </Tabs>

          <Box sx={{ p: 0 }}>
            {activeTab === 0 && (
              <Box>
                {loading ? (
                  <Box sx={{ display: 'flex', justifyContent: 'center', py: 10 }}>
                    <CircularProgress />
                  </Box>
                ) : (
                  <>
                    <TableContainer>
                      <Table sx={{ minWidth: 650 }}>
                        <TableHead sx={{ backgroundColor: '#f1f5f9' }}>
                          <TableRow>
                            <TableCell width={50} />
                            <TableCell sx={{ fontWeight: 'bold' }}>Job Title</TableCell>
                            <TableCell sx={{ fontWeight: 'bold' }}>Company</TableCell>
                            <TableCell sx={{ fontWeight: 'bold' }}>Location</TableCell>
                            <TableCell sx={{ fontWeight: 'bold' }}>Experience</TableCell>
                            <TableCell sx={{ fontWeight: 'bold' }}>Date Posted</TableCell>
                          </TableRow>
                        </TableHead>
                        <TableBody>
                          {jobs.length === 0 ? (
                            <TableRow>
                              <TableCell colSpan={5} align="center" sx={{ py: 6 }}>
                                No jobs found matching your criteria.
                              </TableCell>
                            </TableRow>
                          ) : (
                            jobs.map((job) => (
                              <JobRow key={job.id} job={job} />
                            ))
                          )}
                        </TableBody>
                      </Table>
                    </TableContainer>
                    <TablePagination
                      component="div"
                      count={totalJobs}
                      page={page}
                      onPageChange={(e, newPage) => setPage(newPage)}
                      rowsPerPage={rowsPerPage}
                      onRowsPerPageChange={(e) => {
                        setRowsPerPage(parseInt(e.target.value, 10));
                        setPage(0);
                      }}
                    />
                  </>
                )}
              </Box>
            )}

            {activeTab === 1 && (
              <Box sx={{ p: 4, backgroundColor: '#f8fafc' }}>
                {analyticsLoading || !analyticsData ? (
                  <Box sx={{ display: 'flex', justifyContent: 'center', py: 10 }}>
                    <CircularProgress />
                  </Box>
                ) : (
                  <Grid container spacing={4}>
                    
                    {/* Top 5 Metrics Cards */}
                    <Grid item xs={12} sm={6} md={2.4}>
                      <Card sx={{ height: '100%', boxShadow: 1 }}>
                        <CardContent>
                          <Typography color="text.secondary" gutterBottom>Total Matches</Typography>
                          <Typography variant="h4" color="primary" fontWeight="bold">{analyticsData.total_jobs}</Typography>
                        </CardContent>
                      </Card>
                    </Grid>
                    <Grid item xs={12} sm={6} md={2.4}>
                      <Card sx={{ height: '100%', boxShadow: 1 }}>
                        <CardContent>
                          <Typography color="text.secondary" gutterBottom>Top Hiring Company</Typography>
                          <Typography variant="subtitle1" color="secondary" fontWeight="bold">{analyticsData.top_company}</Typography>
                        </CardContent>
                      </Card>
                    </Grid>
                    <Grid item xs={12} sm={6} md={2.4}>
                      <Card sx={{ height: '100%', boxShadow: 1 }}>
                        <CardContent>
                          <Typography color="text.secondary" gutterBottom>Most Common Title</Typography>
                          <Typography variant="subtitle2" fontWeight="bold">{analyticsData.top_title}</Typography>
                        </CardContent>
                      </Card>
                    </Grid>
                    <Grid item xs={12} sm={6} md={2.4}>
                      <Card sx={{ height: '100%', boxShadow: 1, borderLeft: '4px solid #10b981' }}>
                        <CardContent>
                          <Typography color="text.secondary" gutterBottom>Top Requested Tool</Typography>
                          <Typography variant="h5" color="#10b981" fontWeight="bold">{analyticsData.top_tool}</Typography>
                        </CardContent>
                      </Card>
                    </Grid>
                    <Grid item xs={12} sm={6} md={2.4}>
                      <Card sx={{ height: '100%', boxShadow: 1, borderLeft: '4px solid #8b5cf6' }}>
                        <CardContent>
                          <Typography color="text.secondary" gutterBottom>Top Certification</Typography>
                          <Typography variant="h6" color="#8b5cf6" fontWeight="bold">{analyticsData.top_cert}</Typography>
                        </CardContent>
                      </Card>
                    </Grid>

                    {/* Row 2: Deep NLP Charts */}
                    <Grid item xs={12} md={6}>
                      <Paper sx={{ p: 3, height: 420, boxShadow: 1 }}>
                        <Typography variant="h6" mb={2} fontWeight="bold" sx={{ display: 'flex', alignItems: 'center' }}><Wrench size={20} style={{marginRight:8, color:'#10b981'}}/> Top 10 Tools & Tech Stack</Typography>
                        <ResponsiveContainer width="100%" height="88%">
                          <BarChart data={analyticsData.tools_chart} layout="vertical" margin={{top: 5, right: 30, left: 30, bottom: 5}}>
                            <CartesianGrid strokeDasharray="3 3" horizontal={true} vertical={false} />
                            <XAxis type="number" hide />
                            <YAxis dataKey="name" type="category" tick={{fontSize: 12}} width={90} axisLine={false} tickLine={false} />
                            <Tooltip contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px rgba(0,0,0,0.1)' }} cursor={{fill: '#f1f5f9'}} />
                            <Bar dataKey="count" fill="#10b981" radius={[0, 4, 4, 0]} barSize={20} />
                          </BarChart>
                        </ResponsiveContainer>
                      </Paper>
                    </Grid>

                    <Grid item xs={12} md={6}>
                      <Paper sx={{ p: 3, height: 420, boxShadow: 1 }}>
                        <Typography variant="h6" mb={2} fontWeight="bold">Jobs Distribution by Location</Typography>
                        <ResponsiveContainer width="100%" height="88%">
                          <PieChart>
                            <Pie data={analyticsData.location_chart} cx="50%" cy="50%" outerRadius={125} fill="#8884d8" dataKey="value" label={({name, percent}) => `${name} ${(percent * 100).toFixed(0)}%`}>
                              {analyticsData.location_chart.map((entry, index) => <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />)}
                            </Pie>
                            <Tooltip contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px rgba(0,0,0,0.1)' }} />
                          </PieChart>
                        </ResponsiveContainer>
                      </Paper>
                    </Grid>

                    {/* Row 3: Meta Charts */}
                    <Grid item xs={12} md={6}>
                      <Paper sx={{ p: 3, height: 350, boxShadow: 1 }}>
                        <Typography variant="h6" mb={2} fontWeight="bold" sx={{ display: 'flex', alignItems: 'center' }}><Award size={20} style={{marginRight:8, color:'#8b5cf6'}}/> Certification Demand</Typography>
                        <ResponsiveContainer width="100%" height="85%">
                          <PieChart>
                            <Pie data={analyticsData.certs_chart} cx="50%" cy="50%" innerRadius={70} outerRadius={100} paddingAngle={5} dataKey="value" label={({name}) => name}>
                              {analyticsData.certs_chart.map((entry, index) => <Cell key={`cell-${index}`} fill={['#8b5cf6', '#a78bfa', '#c4b5fd', '#ddd6fe', '#f5f3ff'][index % 5]} />)}
                            </Pie>
                            <Tooltip contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px rgba(0,0,0,0.1)' }} />
                          </PieChart>
                        </ResponsiveContainer>
                      </Paper>
                    </Grid>

                    <Grid item xs={12} md={6}>
                      <Paper sx={{ p: 3, height: 350, boxShadow: 1 }}>
                        <Typography variant="h6" mb={2} fontWeight="bold">Jobs by Top Companies</Typography>
                        <ResponsiveContainer width="100%" height="85%">
                          <BarChart data={analyticsData.company_chart}>
                            <CartesianGrid strokeDasharray="3 3" vertical={false} />
                            <XAxis dataKey="name" tick={{fontSize: 12}} />
                            <YAxis />
                            <Tooltip contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px rgba(0,0,0,0.1)' }} cursor={{fill: '#f1f5f9'}} />
                            <Bar dataKey="count" fill="#3b82f6" radius={[4, 4, 0, 0]} />
                          </BarChart>
                        </ResponsiveContainer>
                      </Paper>
                    </Grid>

                    {/* Row 4: NLP Representative Samples */}
                    <Grid item xs={12}>
                      <Paper sx={{ p: 4, boxShadow: 1, borderRadius: 3 }}>
                        <Typography variant="h5" mb={3} fontWeight="bold" color="#0f172a">Curated Market Requirements Sample</Typography>
                        <Typography variant="body2" color="text.secondary" mb={4}>
                          A random sampling of exact bullet points extracted across the highest-matching roles to give you an immediate feel for employer expectations.
                        </Typography>
                        <Grid container spacing={4}>
                          <Grid item xs={12} md={6}>
                            <Box sx={{ p: 3, backgroundColor: '#f0f9ff', borderRadius: 2, height: '100%' }}>
                              <Typography variant="h6" color="#0284c7" mb={2} sx={{ display:'flex', alignItems:'center' }}>
                                <CheckSquare size={20} style={{marginRight:8}}/> Representative Responsibilities
                              </Typography>
                              <List dense sx={{ pl: 1 }}>
                                {(analyticsData.sample_responsibilities || []).map((resp, i) => (
                                  <ListItem key={i} sx={{ alignItems: 'flex-start', mb: 1, px: 0 }}>
                                    <ListItemIcon sx={{ minWidth: 28, mt: 0.5 }}><CheckCircle2 size={16} color="#0284c7" /></ListItemIcon>
                                    <ListItemText primary={resp} primaryTypographyProps={{ color: '#334155', fontWeight: 500 }} />
                                  </ListItem>
                                ))}
                                {(!analyticsData.sample_responsibilities || analyticsData.sample_responsibilities.length === 0) && (
                                  <Typography variant="body2" fontStyle="italic" color="text.secondary">No responsibilities extracted from the dataset.</Typography>
                                )}
                              </List>
                            </Box>
                          </Grid>
                          <Grid item xs={12} md={6}>
                            <Box sx={{ p: 3, backgroundColor: '#f0fdf4', borderRadius: 2, height: '100%' }}>
                              <Typography variant="h6" color="#16a34a" mb={2} sx={{ display:'flex', alignItems:'center' }}>
                                <Award size={20} style={{marginRight:8}}/> Key Qualifications
                              </Typography>
                              <List dense sx={{ pl: 1 }}>
                                {(analyticsData.sample_qualifications || []).map((qual, i) => (
                                  <ListItem key={i} sx={{ alignItems: 'flex-start', mb: 1, px: 0 }}>
                                    <ListItemIcon sx={{ minWidth: 28, mt: 0.5 }}><CheckCircle2 size={16} color="#16a34a" /></ListItemIcon>
                                    <ListItemText primary={qual} primaryTypographyProps={{ color: '#334155', fontWeight: 500 }} />
                                  </ListItem>
                                ))}
                                {(!analyticsData.sample_qualifications || analyticsData.sample_qualifications.length === 0) && (
                                  <Typography variant="body2" fontStyle="italic" color="text.secondary">No qualifications extracted from the dataset.</Typography>
                                )}
                              </List>
                            </Box>
                          </Grid>
                        </Grid>
                      </Paper>
                    </Grid>
                  </Grid>
                )}
              </Box>
            )}
          </Box>
        </Paper>
      </Container>
    </Box>
  );
};

export default JobAnalyticsTool;
