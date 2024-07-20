import "./style.css";
import { FaCheck } from "react-icons/fa6";

const Modal = ({ text, type }) => {
  return (
    <div className={`modalBox ${type}`}>
      <p>{text}</p>
    </div>
  );
};

export default Modal;
