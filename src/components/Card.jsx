import PropTypes from "prop-types";
import { Card, CardContent, Typography } from "@mui/material";
import { makeStyles } from "@mui/styles";
import {
  apliqoTangaroa,
  apliqoAliceBlue,
  hasFilter,
  getSelectedFilter,
} from "../utils/utils";

const useStyles = makeStyles({
  cardDate: {
    fontFamily: "Aktiv Grotesk !important",
    color: apliqoAliceBlue,
    fontSize: "0.6rem !important",
  },
  cardSubtitle: {
    fontFamily: "Aktiv Bold !important",
    color: apliqoAliceBlue,
    fontSize: "0.8rem !important",
  },
  cardDetailedText: {
    fontFamily: "Aktiv Grotesk !important",
    color: apliqoAliceBlue,
  },
  url: {
    fontFamily: "Aktiv Grotesk !important",
    color: apliqoAliceBlue,
  },
});

const BasicCard = ({
  item,
  index,
  handleSelectItem,
  handleOpen,
  getItemDatePercentage,
  filter,
  positionalArray,
}) => {
  const classes = useStyles();

  const {
    cardDate = "Ago 2023",
    cardSubtitle = "Default Subtitle",
    cardDateObj = {},
    major = false,
    office = false,
    product = false,
    media = {},
    longCard = false,
  } = item;

  const { type = "", source: mediaSource = "" } = media;
  const { month = "", year = " " } = cardDateObj;
  const handleClick = (e) => {
    e.preventDefault();
    handleSelectItem(index);
    handleOpen();
  };

  const getFirstPositionNotTaken = () => {
    return positionalArray[parseInt(month) - 1];
  };

  const objPosition = getFirstPositionNotTaken();
  const { top: topCalc = 0 } = objPosition;
  const position = getItemDatePercentage(item);

  const getOpacity = () => {
    return hasFilter(filter)
      ? getSelectedFilter(filter, major, office, product)
        ? 1
        : 0.5
      : 1;
  };

  return (
    <div
      className="cardLineContainer"
      style={{
        left: position,
        top: topCalc + "%",
        opacity: getOpacity(),
      }}
    >
      <Card
        id={"card_" + index}
        className="card"
        sx={{
          display: "inline-block",
          backgroundColor: apliqoTangaroa,
          borderRadius: 2,
          width: longCard ? "200px" : "125px",
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
          {type === "IMAGE" && (
            <img id={"img_" + index} src={mediaSource} className={"cardImg"} />
          )}
        </CardContent>
      </Card>
      <div className="cardLine"></div>
    </div>
  );
};

BasicCard.propTypes = {
  filter: PropTypes.object,
  item: PropTypes.object,
  index: PropTypes.number,
  handleOpen: PropTypes.func,
  handleSelectItem: PropTypes.func,
  getItemDatePercentage: PropTypes.func,
  positionalArray: PropTypes.array,
};

export default BasicCard;
