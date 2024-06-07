import "./style.css";

const Input = ({
  icon,
  inptType,
  inptId,
  min,
  textLbl,
  getDados,
  name,
  value,
}) => {
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
          <label htmlFor={inptId}>{textLbl}</label>
        </div>
      </div>
    </div>
  );
};

export default Input;
