import React, { useEffect, useState } from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Button from "@mui/material/Button";
import Cookies from "js-cookie";
import { useAuth } from "../hooks/useAuth";
import { Typography } from "@mui/material";

export default function ButtonAppBar() {
  const [token, set_tokenjs] = useState("");

  const { onLogout } = useAuth();

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
        <Toolbar sx={{ display: "flex", justifyContent: "space-around" }}>
          <Box sx={{width: '70%', textAlign: 'right'}}>     
            <Typography>SISMEGA AUTOMAÇÃO</Typography>
          </Box>

          <Box  sx={{textAlign: 'right'}}>
            {token ? (
              <Button onClick={handleLogout} color="inherit">
                Sair
              </Button>
            ) : null}
          </Box>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
