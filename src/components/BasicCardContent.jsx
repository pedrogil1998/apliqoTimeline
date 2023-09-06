import PropTypes from "prop-types";
import { Card, CardContent, Typography } from "@mui/material";
import { apliqoAliceBlue, apliqoTangaroa } from "../utils/utils";
import { makeStyles } from "@mui/styles";

const useStyles = makeStyles({
  cardDate: {
    fontFamily: "Aktiv Grotesk !important",
    color: apliqoAliceBlue,
    fontSize: "1.3rem !important",
  },
  cardSubtitle: {
    fontFamily: "Aktiv Bold !important",
    color: apliqoAliceBlue,
    fontSize: "1.6rem !important",
  },
});

const BasicCardContent = ({
  index,
  longCard,
  zoom,
  handleClick,
  media,
  cardSubtitle,
  cardDate,
}) => {
  const { type = "", source: mediaSource = "" } = media;
  const classes = useStyles();
  return (
    <Card
      id={"card_" + index}
      className="card"
      sx={{
        display: "inline-block",
        backgroundColor: apliqoTangaroa,
        borderRadius: 2,
        width: !zoom
          ? longCard
            ? "300px"
            : "225px"
          : longCard
          ? "225px"
          : "175px",
      }}
      onClick={(e) => handleClick(e)}
      raised={true}
    >
      <CardContent>
        {!zoom && (
          <Typography
            className={classes.cardSubtitle}
            variant="h5"
            component="div"
          >
            {cardSubtitle}
          </Typography>
        )}
        <Typography
          className={!zoom ? classes.cardDate : classes.cardSubtitle}
          sx={{ fontSize: 14 }}
          gutterBottom
        >
          {cardDate}
        </Typography>
        {type === "IMAGE" && mediaSource && (
          <img id={"img_" + index} src={mediaSource} className={"cardImg"} />
        )}
      </CardContent>
    </Card>
  );
};

BasicCardContent.propTypes = {
  index: PropTypes.number,
  longCard: PropTypes.bool,
  zoom: PropTypes.bool,
  handlClick: PropTypes.func,
  media: PropTypes.object,
  cardSubtitle: PropTypes.string,
  cardDate: PropTypes.string,
};

export default BasicCardContent;