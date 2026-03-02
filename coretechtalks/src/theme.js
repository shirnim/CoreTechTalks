import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#4F46E5', // Indigo
    },
    secondary: {
      main: '#2563EB', // Deep Tech Blue
    },
    background: {
      default: '#F1F5F9', // Soft Neutral Gray
      paper: '#FFFFFF',    // White Content Cards
    },
    text: {
      primary: '#1E293B',   // Equivalent to Slate 800
      secondary: '#64748B', // Equivalent to Slate 500
    },
  },
  typography: {
    fontFamily: '"Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
    h1: {
      fontSize: '48px',
      fontWeight: 700, // Bold
    },
    h2: {
      fontSize: '32px',
      fontWeight: 600, // Semibold
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
    borderRadius: 14, // Consistent border radius
  },
  components: {
    MuiContainer: {
      styleOverrides: {
        root: {
          maxWidth: '1150px !important',
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: '16px', // Slightly larger radius for cards
          boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)', // Soft shadow
          transition: 'transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out',
          '&:hover': {
            transform: 'translateY(-4px)',
            boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)', // Elevation effect
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
          padding: '10px 22px',
        },
        containedPrimary: {
          boxShadow: 'none',
          '&:hover': {
            boxShadow: 'none',
          },
        },
      },
    },
  },
  spacing: 8, // 8px spacing system
});

export default theme;
