import PropTypes from "prop-types";
import { Card, CardContent, Typography } from "@mui/material";
import { makeStyles } from "@mui/styles";
import {
  apliqoTangaroa,
  apliqoAliceBlue,
  hasFilter,
  getSelectedFilter,
} from "../utils/utils";
import BasicCardContent from "./BasicCardContent";

const useStyles = makeStyles({
  year: {
    fontFamily: "Aktiv Grotesk !important",
    color: apliqoTangaroa,
    fontSize: "3rem !important",
    filter: "drop-shadow(0px 0px 10px #29ABE3)",
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
  zoom,
  checkIfFirstMonth,
}) => {
  const classes = useStyles({ zoom: zoom || false });

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

  const { month = "01", year = "" } = cardDateObj;
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
        top: topCalc + "%",
        opacity: getOpacity(),
        marginRight: "32px",
      }}
    >
      {checkIfFirstMonth(year, month) && (
        <Typography className={classes.year} variant="h5" component="div">
          {year}
        </Typography>
      )}
      <BasicCardContent
        index={index}
        longCard={longCard}
        zoom={zoom}
        handleClick={handleClick}
        media={media}
        cardSubtitle={cardSubtitle}
        cardDate={cardDate}
      />
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
  zoom: PropTypes.bool,
};

export default BasicCard;
