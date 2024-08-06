import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import Button from "@mui/material/Button";
import { toggleDarkMode } from "../Redux/themeSlice.js";

const ThemeWrapper = ({ children }) => {
  const darkMode = useSelector((state) => state.theme.darkMode);
  const dispatch = useDispatch();

  const lightTheme = createTheme({
    palette: {
      mode: "light",
    },
  });

  const darkTheme = createTheme({
    palette: {
      mode: "dark",
    },
  });

  return (
    <ThemeProvider theme={darkMode ? darkTheme : lightTheme}>
      <CssBaseline />
      <Button variant="contained" onClick={() => dispatch(toggleDarkMode())}>
        Dark/Light Mode
      </Button>
      {children}
    </ThemeProvider>
  );
};

export default ThemeWrapper;
