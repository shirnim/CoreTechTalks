import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#38bdf8',
    },
    secondary: {
      main: '#a78bfa',
    },
    background: {
      default: '#060b17',
      paper: '#111a2f',
    },
    text: {
      primary: '#eaf1ff',
      secondary: '#a8b8d8',
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
    borderRadius: 12,
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          color: '#eaf1ff',
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none',
          borderRadius: 999,
          fontWeight: 600,
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundImage: 'none',
          backgroundColor: 'rgba(16, 25, 47, 0.78)',
          border: '1px solid rgba(153, 177, 255, 0.2)',
          backdropFilter: 'blur(8px)',
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          backgroundColor: 'rgba(16, 25, 47, 0.72)',
          border: '1px solid rgba(153, 177, 255, 0.2)',
          backdropFilter: 'blur(8px)',
        },
      },
    },
  },
});

export default theme;
