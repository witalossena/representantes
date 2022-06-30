import React, {useState, useEffect} from "react";

import Box from "@mui/material/Box";
import Alert from "@mui/material/Alert";

const AppAlert = ({data}) => {
  const [display, set_display] = useState("none");

  useEffect(() => {
    if (data.open) {
      set_display("");

      setTimeout(() => {
        set_display("none");
      }, 3000);
    }
  }, [data]);

  return (
    <Box
      sx={{
        width: "90%",
        position: "fixed",
        marginTop: 98,
        zIndex: 10,
        display: display,
      }}
    >
      <Alert variant="filled" severity="success" onClose={() => {}}>
        Usuário inserido com sucesso!
      </Alert>
    </Box>
  );
};

export default AppAlert;

