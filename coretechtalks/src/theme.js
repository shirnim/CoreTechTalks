
import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#0073e6', // A clean, modern blue
    },
    secondary: {
      main: '#ff4f5a', // A vibrant, attention-grabbing accent color
    },
    background: {
      default: '#ffffff', // A clean, white background
      paper: '#f8f9fa',   // A slightly off-white for paper elements
    },
    text: {
      primary: '#333333', // Dark grey for primary text
      secondary: '#666666', // Lighter grey for secondary text
    },
  },
  typography: {
    fontFamily: 'Poppins, sans-serif', // A modern, geometric sans-serif font
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
    borderRadius: 8, // Softer, more modern rounded corners
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none', // More subtle button text
          borderRadius: 20,      // Pill-shaped buttons for a modern look
          padding: '10px 20px',
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          boxShadow: '0 4px 12px rgba(0,0,0,0.08)', // A softer, more subtle shadow
        },
      },
    },
  },
});

export default theme;
