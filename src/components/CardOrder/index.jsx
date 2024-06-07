import "./style.css";
import { FaCheck } from "react-icons/fa6";

const CardOrder = ({ id, value, client, seller, iconSource, iconStatus }) => {
  return (
    <div className="cardOrderBox">
      <div className="valueCard">R$ {value}</div>
      <div className="infoCard">
        <div className="clientCard">{client}</div>
        <div className="sellerCard">{seller}</div>
      </div>
      <div className="iconSource">{iconSource}</div>
      <div className="iconStatus">{iconStatus}</div>
    </div>
  );
};

export default CardOrder;
