import { Box, Button, Modal, Typography } from "@mui/material";
import { useState } from "react";
import PropTypes from "prop-types";

const BasicItem = ({ cardDate, cardSubtitle, cardDetailedText, url }) => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 800,
    bgcolor: "#202E39",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
  };
  const handleParentClick = (event) => {
    event.preventDefault();

    if (event.target === event.currentTarget) {
      console.log("parent clicked");
      // 👇 your logic here
    }
  };
  return (
    <div
      onClick={(event) => handleParentClick(event)}
      style={{ height: "100%", width: "100%" }}
    >
      <div onClick={handleOpen}>
        <Box sx={{ bgcolor: "#202E39" }}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            {cardDate}
          </Typography>
        </Box>
      </div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            {cardDate}
          </Typography>
          <Typography id="modal-modal-cardSubtitle" sx={{ mt: 2 }}>
            {cardSubtitle}
          </Typography>
          <Typography id="modal-modal-cardDetailedText" sx={{ mt: 2 }}>
            {cardDetailedText}
          </Typography>
          <Typography id="modal-modal-url" sx={{ mt: 2 }}>
            {url}
          </Typography>
        </Box>
      </Modal>
    </div>
  );
};

BasicItem.propTypes = {
  cardDate: PropTypes.string,
  cardSubtitle: PropTypes.string,
  cardDetailedText: PropTypes.string,
  url: PropTypes.string,
};

export default BasicItem;
