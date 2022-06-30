import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 250,
  bgcolor: "background.paper",
  p: 4,
};

const AppModal = ({ option, data }) => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);

  console.log(option);
  const handleClose = () => {
    setOpen(false);
    option = false;
  };

  useEffect(() => {
    setOpen(option);
  },[option]);

  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <Typography id="modal-modal-title" variant="h6" component="h2">
          Text in a modal
        </Typography>
      </Box>
    </Modal>
  );
};

export default AppModal;
