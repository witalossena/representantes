import React from "react";
import Box from "@mui/material/Box";

const AppClientCounter = ({countClients}) => {
  return (
    <Box>
      <div className="clientCounter">TOTAL DE CLIENTES: {countClients}</div>
    </Box>
  );
};

export default AppClientCounter;
