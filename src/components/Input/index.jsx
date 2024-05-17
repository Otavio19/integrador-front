import "./style.css";

import PropTypes from "prop-types";

function Input(props) {
  const { icon, inptType, inptId, min, textLbl, getDados, name, value } = props;
  return (
    <div className="display">
      <div className="inptBox">
        <div className="icon">{icon}</div>
        <div className="contentBox">
          <input
            type={inptType}
            name={name}
            id={inptId}
            min={min}
            onChange={getDados}
            required
            value={value}
          />
          <label htmlFor={props.inptId}>{textLbl}</label>
        </div>
      </div>
    </div>
  );
}

Input.propTypes = {
  icon: PropTypes.node,
  inptType: PropTypes.string,
  inptId: PropTypes.string,
  textLbl: PropTypes.string,
};

export default Input;
