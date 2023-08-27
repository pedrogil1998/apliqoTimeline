import PropTypes from "prop-types";

const Beepoint = ({ widthLeft, widthRight }) => {
  return (
    <>
      <div className="beePointLeft" style={{ width: widthLeft }} />
      <div className="beePointMiddle">
        <div className="test">
          <span>Title</span>
          <span>Subtitle</span>
        </div>
      </div>
      <div className="beePointRight" style={{ width: widthRight }} />
    </>
  );
};

Beepoint.propTypes = {
  widthLeft: PropTypes.string,
  widthRight: PropTypes.string,
};

export default Beepoint;
