import PropTypes from "prop-types";
import { Box, Card, CardContent, Typography } from "@mui/material";
import { makeStyles } from "@mui/styles";

const useStyles = makeStyles({
  cardDate: {
    fontFamily: "Aktiv Grotesk",
    color: "#F4F9FC",
  },
  cardSubtitle: {
    fontFamily: "Aktiv Bold",
    color: "#F4F9FC",
  },
  cardDetailedText: {
    fontFamily: "Aktiv Grotesk",
    color: "#F4F9FC",
  },
  url: {
    fontFamily: "Aktiv Grotesk",
    color: "#F4F9FC",
  },
});

const bull = (
  <Box
    component="span"
    sx={{ display: "inline-block", mx: "2px", transform: "scale(0.8)" }}
  >
    •
  </Box>
);

const BasicCard = ({
  cardDate = "Ago 2023",
  cardSubtitle = "Default Subtitle",
  cardDetailedText = "Description",
  url = "www.defaulturl.com",
  media = {},
  index,
  handleRemove,
  selected,
  handleSelectItem,
  handleOpen,
}) => {
  const classes = useStyles();
  const { type, source: mediaSource = "" } = media;
  const { show: showUrl = false, source: urlSource = "" } = url;

  const handleClick = (e) => {
    e.preventDefault();
    handleSelectItem(index);
    handleOpen();
  };

  return (
    <>
      <Card
        className="card"
        sx={{
          display: "inline-block",
          backgroundColor: "#202E39",
          borderRadius: 2,
          width: 340,
        }}
        onClick={(e) => handleClick(e)}
        raised={true}
      >
        <CardContent>
          <Typography
            className={classes.cardSubtitle}
            variant="h5"
            component="div"
          >
            {cardSubtitle}
          </Typography>
          <Typography
            className={classes.cardDate}
            sx={{ fontSize: 14 }}
            gutterBottom
          >
            {cardDate}
          </Typography>

          {/* <Typography className={classes.url} sx={{ mb: 1.5 }}>
            {showUrl && urlSource}
          </Typography>
          <Typography className={classes.cardDetailedText} variant="body2">
            {cardDetailedText}
          </Typography> 
          <Typography variant="body2" color={selected ? "green" : "red"}>
            Selected
          </Typography>*/}
          {type === "IMAGE" && (
            <img id={"img_" + index} src={mediaSource} className={"cardImg"} />
          )}
        </CardContent>
        {/* <CardActions>
          <Button
            href={"#cardId_" + index}
            size="small"
            onClick={(e) => handleClick(e)}
          >
            Edit Card
          </Button>
          <Button size="small" onClick={(e) => handleRemove(index)}>
            Remove
          </Button>
        </CardActions> */}
      </Card>
    </>
  );
};

BasicCard.propTypes = {
  cardDate: PropTypes.string,
  cardSubtitle: PropTypes.string,
  cardDetailedText: PropTypes.string,
  url: PropTypes.object,
};

export default BasicCard;
