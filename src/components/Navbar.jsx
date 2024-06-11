// src/components/Navbar.js
import React from 'react';
import { AppBar, Toolbar, Typography, Button } from '@mui/material';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logOut } from '../redux/authSlice'; 

const Navbar = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);

  const handleLogout = () => {
    dispatch(logOut());
  };

  return (
    <AppBar position="static" sx={{ backgroundColor: 'rgba(118, 47, 207, 0.9)', backdropFilter: 'blur(10px)' }}>
      <Toolbar>
        <Typography variant="h6" style={{ flexGrow: 1 }}>
          Zetaton
        </Typography>
        <Button color="inherit" component={Link} to="/">Home</Button>
        <Button color="inherit" component={Link} to="/favorites">Favorites</Button>
        {user ? (
          <>
            <Button color="inherit" onClick={handleLogout}>Logout</Button>
          </>
        ) : (
          <>
            <Button color="inherit" component={Link} to="/signin">Sign In</Button>
            <Button color="inherit" component={Link} to="/signup">Sign Up</Button>
          </>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
