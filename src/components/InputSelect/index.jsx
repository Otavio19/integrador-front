import "./style.css";

const InputSelect = ({ id, name, options }) => {
  return (
    <select id={id} name={name} className="selectBox">
      {Array.isArray(options) &&
        options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.text}
          </option>
        ))}
    </select>
  );
};

export default InputSelect;
