import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#4F46E5', // Deep Indigo
    },
    secondary: {
      main: '#2563EB', // Professional Blue
    },
    background: {
      default: '#F1F5F9', // Soft Neutral Background
      paper: '#FFFFFF',    // White Elevated Cards
    },
    text: {
      primary: '#1E293B', // Slate 800
      secondary: '#64748B', // Slate 500
    },
  },
  typography: {
    fontFamily: '"Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
    h1: {
      fontSize: '44px',
      fontWeight: 700,
    },
    h2: {
      fontSize: '30px',
      fontWeight: 600,
    },
    body1: {
      fontSize: '18px',
      lineHeight: 1.7,
    },
    body2: {
      fontSize: '16px',
    },
  },
  shape: {
    borderRadius: 12, // 12px rounded corners
  },
  components: {
    MuiContainer: {
      styleOverrides: {
        root: {
          maxWidth: '1200px !important', // Max width for content
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: '16px',
          boxShadow: '0 4px 12px rgba(0, 0, 0, 0.05)',
          transition: 'transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out',
          '&:hover': {
            transform: 'translateY(-4px)',
            boxShadow: '0 8px 24px rgba(0, 0, 0, 0.08)',
          },
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none',
          fontWeight: 600,
          borderRadius: '8px',
          padding: '10px 20px',
        },
        containedPrimary: {
          boxShadow: '0 2px 8px rgba(79, 70, 229, 0.3)',
          '&:hover': {
            boxShadow: '0 4px 16px rgba(79, 70, 229, 0.4)',
          },
        },
      },
    },
  },
});

export default theme;
