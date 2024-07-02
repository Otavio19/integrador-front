import "./style.css";

import blackPlan from "../../assets/img/planoPreto.png";

import { FaCheck } from "react-icons/fa6";
import { FaXmark } from "react-icons/fa6";

const CardPlan = ({ img, title, value, details = [] }) => {
  return (
    <div className="cardPlan">
      <div className="maskPlan">
        <img src={img} alt="" />
        <h1>{value}$</h1>
        <h2>{title}</h2>
      </div>
      <div className="planDesc">
        <h1>Detalhes do Plano:</h1>

        <ul>
          {details.map((detail) => (
            <li>
              {detail.active ? (
                <span className="iconDesc sucess">
                  <FaCheck />
                </span>
              ) : (
                <span className="iconDesc error">
                  <FaXmark />
                </span>
              )}
              {detail.title}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default CardPlan;
