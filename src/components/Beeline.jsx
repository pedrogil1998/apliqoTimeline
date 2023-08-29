import { Box } from "@mui/material";
import PropTypes from "prop-types";
import Beepoint from "./Beepoint";
import {
  getDateFromObj,
  getMaxDate,
  getMinDate,
  percentage,
} from "../utils/utils";

const bull = (
  <Box component="span" sx={{ display: "inline-block", mx: "2px" }}>
    •
  </Box>
);

const Beeline = ({ items, selectedCard, handleSelectItem, handleOpen }) => {
  const handleClick = (e, index) => {
    e.preventDefault();
    handleSelectItem(index);
    handleOpen();
  };

  const maxDate = getMaxDate(items);
  const minDate = getMinDate(items);

  const dateDif = Math.abs(maxDate - minDate);

  const date1 = getDateFromObj(items[1]);
  const date1Dif = Math.abs(date1 - minDate);
  return (
    <div className="beelineDiv">
      {/* <Beepoint className="beePoint" widthLeft={"50px"} widthRight={"30px"} />
      <Beepoint widthLeft={"30px"} widthRight={"36px"} />
      <Beepoint widthLeft={"36px"} widthRight={"20px"} />
      <Beepoint widthLeft={"2px"} widthRight={"12px"} /> */}
      {/* <div className="timeline">
        <span>{items[0].cardDate}</span>
        <span>{items[items.length - 1].cardDate}</span>
      </div> */}
      <div className="beeline">
        {items.map((item, index) => {
          const date = getDateFromObj(item);
          const dateDif2 = Math.abs(date - minDate);
          const perc = percentage(dateDif2, dateDif) + "%";
          return (
            <div
              style={{ left: perc !== "100%" ? perc : "90%" }}
              className={
                selectedCard?.index === index
                  ? "selectedBeePoint"
                  : "beePointMiddle"
              }
              key={index}
              onClick={(e) => handleClick(e, index)}
            >
              <span className="beePointDate">{item.cardDate}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
};

Beeline.propTypes = {
  items: PropTypes.array,
  selectedCard: PropTypes.object,
  handleSelectItem: PropTypes.func,
  handleOpen: PropTypes.func,
};

export default Beeline;
