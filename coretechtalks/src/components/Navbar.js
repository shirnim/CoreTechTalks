import React, { useState } from 'react';
import { AppBar, Toolbar, Typography, Button, Box, IconButton, Drawer, List, ListItem, ListItemButton, ListItemText, Container } from '@mui/material';
import { Link } from 'react-router-dom';
import { Menu as MenuIcon } from '@mui/icons-material';

const Navbar = () => {
  const [drawerOpen, setDrawerOpen] = useState(false);

  const toggleDrawer = (open) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }
    setDrawerOpen(open);
  };

  const navLinks = [
    { title: 'Blog', path: '/blogs' },
    { title: 'Tools', path: '/tools' },
    { title: 'Services', path: '/services' },
    { title: 'About', path: '/about' },
  ];

  const drawer = (
    <Box
      sx={{ width: 250, pt: 4 }}
      role="presentation"
      onClick={toggleDrawer(false)}
      onKeyDown={toggleDrawer(false)}
    >
      <List>
        {navLinks.map((link) => (
          <ListItem key={link.title} disablePadding>
            <ListItemButton component={Link} to={link.path}>
              <ListItemText primary={link.title} sx={{ textAlign: 'center' }} />
            </ListItemButton>
          </ListItem>
        ))}
        <ListItem disablePadding sx={{ mt: 2 }}>
          <ListItemButton component={Link} to="/contact">
            <Button variant="contained" color="primary" fullWidth>Subscribe</Button>
          </ListItemButton>
        </ListItem>
      </List>
    </Box>
  );

  return (
    <>
      <AppBar
        position="sticky"
        elevation={0}
        sx={{
          backgroundColor: 'rgba(241, 245, 249, 0.7)', // Semi-transparent background
          backdropFilter: 'blur(10px)', 
          borderBottom: '1px solid #E2E8F0', // Soft border
        }}
      >
        <Container maxWidth="lg">
          <Toolbar disableGutters>
            <Typography
              variant="h6"
              component={Link}
              to="/"
              sx={{
                flexGrow: 1,
                textDecoration: 'none',
                color: 'text.primary',
                fontWeight: 700,
              }}
            >
              CoreTechTalks
            </Typography>
            <Box sx={{ display: { xs: 'none', md: 'flex' }, alignItems: 'center' }}>
              {navLinks.map((link) => (
                <Button
                  component={Link}
                  to={link.path}
                  key={link.title}
                  sx={{
                    color: 'text.secondary',
                    fontWeight: 500,
                    ml: 3,
                    '&:hover': {
                      color: 'text.primary',
                      backgroundColor: 'transparent',
                    },
                  }}
                >
                  {link.title}
                </Button>
              ))}
              <Button
                variant="contained"
                color="primary"
                component={Link}
                to="/contact"
                sx={{ ml: 3 }}
              >
                Subscribe
              </Button>
            </Box>
            <IconButton
              edge="end"
              color="inherit"
              aria-label="menu"
              onClick={toggleDrawer(true)}
              sx={{ display: { xs: 'block', md: 'none' }, color: 'text.primary' }}
            >
              <MenuIcon />
            </IconButton>
          </Toolbar>
        </Container>
      </AppBar>
      <Drawer
        anchor="right"
        open={drawerOpen}
        onClose={toggleDrawer(false)}
        PaperProps={{
          sx: {
            backgroundColor: '#F8FAFC', // Soft neutral gray for drawer
          },
        }}
      >
        {drawer}
      </Drawer>
    </>
  );
};

export default Navbar;
