import "./style.css";

const InputSelect = () => {
  return (
    <select id="cars" name="cars" className="selectBox">
      <option value="volvo">volvo</option>
      <option value="saab">Saab</option>
      <option value="mercedes">Mercedes</option>
      <option value="audi">Audi</option>
    </select>
  );
};

export default InputSelect;
