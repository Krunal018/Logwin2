import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  AppBar,
  Toolbar,
  Button,
  Container,
  Switch,
  FormControlLabel,
  IconButton,
  Menu,
  MenuItem,
} from "@mui/material";
import { MoreVert as MoreVertIcon } from "@mui/icons-material";
import { logout } from "../Redux/authSlice"; // Adjust the import path
import { toggleDarkMode } from "../Redux/themeSlice"; // Adjust the import path
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import Badge from "@mui/material/Badge";

const Navbar = () => {
  const { isAuthenticated } = useSelector((state) => state.auth);
  const { cartItem } = useSelector((state) => state.count);
  const darkMode = useSelector((state) => state.theme.darkMode);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = useState(null);

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    dispatch(logout());
    handleMenuClose();
    navigate("/login");
  };

  const handleSettings = () => {
    // Handle settings action here
    handleMenuClose();
  };

  const handleThemeChange = () => {
    dispatch(toggleDarkMode());
  };

  const handleCartClick = () => {
    navigate("/cart"); // Navigate to the Cart Page
  };

  return (
    <AppBar position="static">
      <Toolbar>
        <Container
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <div>
            {isAuthenticated ? (
              <>
                <Button color="inherit" component={Link} to="/home">
                  Home
                </Button>
                <Button color="inherit" component={Link} to="/About">
                  About
                </Button>
                <Button color="inherit" component={Link} to="/Contact">
                  Contact us
                </Button>
              </>
            ) : (
              <Button color="inherit" component={Link} to="/login">
                Login
              </Button>
            )}
          </div>
          <div style={{ display: "flex", alignItems: "center" }}>
            <Badge badgeContent={cartItem?.length} color="primary">
              <IconButton color="inherit" onClick={handleCartClick}>
                <ShoppingCartIcon color="action" />
              </IconButton>
            </Badge>
            <FormControlLabel
              control={
                <Switch checked={darkMode} onChange={handleThemeChange} />
              }
              labelPlacement="start"
              sx={{ ml: 2 }}
            />
            {isAuthenticated && (
              <>
                <IconButton
                  edge="end"
                  color="inherit"
                  aria-label="menu"
                  onClick={handleMenuOpen}
                >
                  <MoreVertIcon />
                </IconButton>
                <Menu
                  anchorEl={anchorEl}
                  open={Boolean(anchorEl)}
                  onClose={handleMenuClose}
                >
                  <MenuItem onClick={handleSettings}>Settings</MenuItem>
                  <MenuItem onClick={handleLogout}>Logout</MenuItem>
                </Menu>
              </>
            )}
          </div>
        </Container>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
