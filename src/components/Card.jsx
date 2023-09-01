import PropTypes from "prop-types";
import { Card, CardContent, Typography } from "@mui/material";
import { makeStyles } from "@mui/styles";
import { apliqoTangaroa } from "../utils/utils";

const useStyles = makeStyles({
  cardDate: {
    fontFamily: "Aktiv Grotesk !important",
    color: "#F4F9FC",
    fontSize: "0.6rem !important",
  },
  cardSubtitle: {
    fontFamily: "Aktiv Bold !important",
    color: "#F4F9FC",
    fontSize: "0.8rem !important",
  },
  cardDetailedText: {
    fontFamily: "Aktiv Grotesk !important",
    color: "#F4F9FC",
  },
  url: {
    fontFamily: "Aktiv Grotesk !important",
    color: "#F4F9FC",
  },
});

const BasicCard = ({
  item,
  index,
  handleSelectItem,
  handleOpen,
  getItemDatePercentage,
  positionalArray,
  setPosition,
  mode,
  filter,
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
    longCard = false,
  } = item;

  const { show: showUrl = false, source: urlSource = "" } = url;
  const { type, source: mediaSource = "" } = media;
  const handleClick = (e) => {
    e.preventDefault();
    handleSelectItem(index);
    handleOpen();
  };

  const getFirstPositionNotTaken = () => {
    let objectRet = {};
    positionalArray.forEach((row, rIndex) => {
      row.forEach((column, cIndex) => {
        if (
          (!Object.keys(objectRet).length && column?.taken === false) ||
          column.taken === index
        ) {
          let newPositions = positionalArray;
          newPositions[rIndex][cIndex].taken = index;

          setPosition(newPositions);
          //console.log(newPositions[rIndex][cIndex]);
          objectRet = newPositions[rIndex][cIndex];
        }
      });
    });
    return objectRet;
  };

  const objPosition = getFirstPositionNotTaken();
  const { bottom: bottomCalc = 0, top: topCalc = 0 } = objPosition;
  const position = getItemDatePercentage(item);

  return (
    <>
      <Card
        className="card"
        sx={{
          display: "inline-block",
          backgroundColor:
            filter.major && major
              ? "red"
              : filter.office && office
              ? "green"
              : filter.product && product
              ? "brown"
              : apliqoTangaroa,
          borderRadius: 2,
          width: longCard ? "10%" : "8%",
          //left: index !== 0 ? position.split("%")[0] - 5 + "%" : position,
          left: position,
          top: topCalc + "%",
          marginLeft: "32px",
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
      <div
        className="cardLine"
        style={{ left: position, top: topCalc + "%" }}
      ></div>
    </>
  );
};

BasicCard.propTypes = {
  cardDate: PropTypes.string,
  cardSubtitle: PropTypes.string,
  cardDetailedText: PropTypes.string,
  getItemDatePercentage: PropTypes.func,
  getFirstPositionNotTaken: PropTypes.func,
  url: PropTypes.object,
  item: PropTypes.object,
};

export default BasicCard;
