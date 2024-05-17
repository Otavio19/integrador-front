import "./style.css";
import { FaCheck } from "react-icons/fa6";

const Modal = ({ text }) => {
  return (
    <div className="modalBox">
      <p>{text}</p>
    </div>
  );
};

export default Modal;
