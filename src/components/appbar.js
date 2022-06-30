import React, { useEffect, useState } from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Button from "@mui/material/Button";
import Cookies from "js-cookie";
import { useAuth } from "../hooks/useAuth";

export default function ButtonAppBar() {
  const [token, set_tokenjs] = useState("");

  const {
    onLogout, 
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
          {token ? <Button onClick={handleLogout} color="inherit">Sair</Button> : null}
        </Toolbar>
      </AppBar>
    </Box>
  );
}
