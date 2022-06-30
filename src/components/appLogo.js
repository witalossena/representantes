import React from "react";

import Typography from "@mui/material/Typography";
import logo from "../logo_sismega.jpeg";

const AppLogo = () => {
  return (
    <>
      <img style={{ width: "100px" }} src={logo} />
      <Typography component="h1" variant="h4">
        sismega
      </Typography>
      <Typography component="h1" variant="h5">
        representação de sucesso
      </Typography>
    </>
  );
};

export default AppLogo;
