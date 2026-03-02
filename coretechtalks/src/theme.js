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
      default: '#121212', // A dark, professional background
      paper: '#1e1e1e',   // A slightly lighter dark for paper elements
    },
    text: {
      primary: '#ffffff', // White for primary text
      secondary: '#bbbbbb', // Lighter grey for secondary text
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
    borderRadius: 8, // Slightly rounded corners for a modern look
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none', // More readable button text
        },
      },
    },
  },
});

export default theme;
