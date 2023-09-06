import { Tooltip } from "@mui/material";
import PropTypes from "prop-types";
import {
  apliqoDarkOrange,
  apliqoTangaroa,
  getDateFromObj,
  getMaxDate,
  getMinDate,
  handleScrollByIndex,
  modes,
  percentage,
} from "../utils/utils";

const Beeline = ({ items, selectedCard, mode }) => {
  const maxDate = getMaxDate(items);
  const minDate = getMinDate(items);
  const dateDif = Math.abs(maxDate - minDate) * 1.2;

  const handleClick = (e, index) => {
    e.preventDefault();
    handleScrollByIndex(index, e);
  };

  return (
    <div
      className="beeline"
      style={{
        backgroundColor:
          mode === modes.MANAGE ? apliqoDarkOrange : apliqoTangaroa,
      }}
    >
      {items.map((item, index) => {
        const date = getDateFromObj(item);
        const dateDif2 = Math.abs(date - minDate);
        const perc = percentage(dateDif2, dateDif);
        return (
          <Tooltip key={index} title={item.cardDate} placement="top">
            <div
              style={{ left: perc }}
              className={
                selectedCard?.index === index
                  ? "selectedBeePoint"
                  : "beePointMiddle"
              }
              key={index}
              onClick={(e) => handleClick(e, index)}
            ></div>
          </Tooltip>
        );
      })}
    </div>
  );
};

Beeline.propTypes = {
  items: PropTypes.array,
  selectedCard: PropTypes.object,
  mode: PropTypes.string,
};

export default Beeline;
