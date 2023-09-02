import { Box, Button, Fade, Input, Modal, Typography } from "@mui/material";
import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";
import PropTypes from "prop-types";
import { makeStyles } from "@mui/styles";
import { apliqoAliceBlue, modes } from "../utils/utils";

const useStyles = makeStyles({
  header: {
    color: apliqoAliceBlue,
  },
});

const style = {
  display: "flex",
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 600,
  bgcolor: "#202E39",
  borderRadius: "8px",
  boxShadow: 24,
  p: 4,
  outline: "none",
};

const BasicModal = ({
  open,
  mode,
  handleClose,
  handleNextModal,
  handlePreviousModal,
  deleteCard,
  item,
  handleOpenNew,
}) => {
  const classes = useStyles();

  const {
    cardDate = "Ago 2023",
    cardSubtitle = "Default Subtitle",
    cardDetailedText = "Description",
    major = false,
    office = false,
    product = false,
    url = {},
    media = {},
    id,
    index,
  } = item;
  const { show: showUrl = false, source: urlSource = "" } = url;
  const { type = "", source: mediaSource = "" } = media;
  const handleNextClick = (e) => {
    e.preventDefault();
    handleNextModal();
  };

  const handlePreviousClick = (e) => {
    e.preventDefault();
    handlePreviousModal();
  };
  const handleKeyDown = (e) => {
    if (e.keyCode === 39) {
      handleNextClick(e);
    }
    if (e.keyCode === 37) {
      handlePreviousClick(e);
    }
  };

  const handleDeleteCard = () => {
    deleteCard(id);
  };
  const handleEditCard = () => {
    handleClose(false);
    handleOpenNew();
  };

  return (
    <>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        onKeyDown={(e) => handleKeyDown(e)}
      >
        <Fade timeout={500} in={open}>
          <Box sx={style}>
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                flexDirection: "column",
                width: 0,
              }}
            >
              <Input onKeyDown={handleKeyDown}></Input>
              <KeyboardBackspaceIcon
                className="arrowSelector"
                sx={{ fontSize: "3rem", left: "-300px" }}
                onClick={(e) => handlePreviousClick(e)}
              ></KeyboardBackspaceIcon>
            </Box>
            <Box>
              <Typography
                id="modal-modal-title"
                color={apliqoAliceBlue}
                variant="h6"
                component="h2"
              >
                {cardDate}
              </Typography>
              <Typography
                color={apliqoAliceBlue}
                id="modal-modal-cardSubtitle"
                sx={{ mt: 2 }}
              >
                {cardSubtitle}
              </Typography>
              <Typography
                color={apliqoAliceBlue}
                id="modal-modal-cardDetailedText"
                sx={{ mt: 2 }}
              >
                {cardDetailedText}
              </Typography>
              <Typography id="modal-modal-url" sx={{ mt: 2 }}>
                {showUrl && urlSource}
              </Typography>
              {type === "IMAGE" && (
                <img
                  src={mediaSource}
                  className={"cardImg"}
                  style={{ width: "100%", height: "" }}
                />
              )}
              {mode === modes.MANAGE && (
                <>
                  <Button onClick={handleEditCard}>Edit</Button>
                  <Button onClick={handleDeleteCard}>Remove</Button>
                </>
              )}
            </Box>
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                flexDirection: "column",
              }}
            >
              <KeyboardBackspaceIcon
                className="arrowSelector"
                sx={{ fontSize: "3rem", right: "-300px", rotate: "180deg" }}
                onClick={(e) => handleNextClick(e)}
              ></KeyboardBackspaceIcon>
            </Box>
          </Box>
        </Fade>
      </Modal>
    </>
  );
};

BasicModal.propTypes = {
  cardDate: PropTypes.string,
  cardSubtitle: PropTypes.string,
  cardDetailedText: PropTypes.string,
  url: PropTypes.string,
};

export default BasicModal;
