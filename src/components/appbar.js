import React, { useEffect, useState } from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import Cookies from "js-cookie";
import { useAuth } from "../hooks/useAuth";

export default function ButtonAppBar() {
  const [token, set_tokenjs] = useState("");

  const {
    onLogin,
    onLogout,
    set_token,
    error,
    message,
    isLoading,
    set_error,
    set_message,
  } = useAuth();

  useEffect(() => {
    let token_cookie = Cookies.get("token");

    if (token_cookie) {
      set_tokenjs(token_cookie);
    }
  }, []);

  const handleLogout = async () => {
    await onLogout();
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar sx={{ display: "flex", justifyContent: "flex-end" }}>
          {/* <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton> */}
          {/* <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            News
          </Typography> */}
          {token ? <Button onClick={handleLogout} color="inherit">Sair</Button> : null}
        </Toolbar>
      </AppBar>
    </Box>
  );
}
