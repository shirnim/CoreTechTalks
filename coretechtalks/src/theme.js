import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#00f5a0', // A vibrant green/cyan
    },
    secondary: {
      main: '#ff007a', // A vibrant pink
    },
    background: {
      default: '#0a0f23', // A deep, dark blue
      paper: '#161d3f',   // A slightly lighter, saturated blue for paper
    },
    text: {
      primary: '#ffffff',
      secondary: '#b3b8d4',
    },
  },
  typography: {
    fontFamily: 'Poppins, sans-serif',
    h1: {
      fontSize: '3rem',
      fontWeight: 700,
      letterSpacing: '-0.02em',
    },
    h2: {
      fontSize: '2.25rem',
      fontWeight: 600,
    },
    h3: {
      fontSize: '1.75rem',
      fontWeight: 600,
    },
    h4: {
      fontSize: '1.5rem',
      fontWeight: 600,
    },
    body1: {
      fontSize: '1rem',
      lineHeight: 1.6,
    },
  },
  shape: {
    borderRadius: 8,
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none',
          borderRadius: 999, // Pill-shaped buttons
          fontWeight: 600,
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundImage: 'none',
          backgroundColor: 'rgba(22, 29, 63, 0.78)', // Corresponds to paper background
          border: '1px solid rgba(179, 184, 212, 0.2)',
          backdropFilter: 'blur(12px)',
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          backgroundColor: 'rgba(22, 29, 63, 0.72)', // Corresponds to paper background
          border: '1px solid rgba(179, 184, 212, 0.2)',
          backdropFilter: 'blur(12px)',
        },
      },
    },
  },
});

export default theme;
