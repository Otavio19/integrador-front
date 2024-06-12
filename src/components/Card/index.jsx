import Button from "../Button";
import "./style.css";

import { Link } from "react-router-dom";

function Card({ title, textBtn, iconBtn, directTo, img }) {
  return (
    <>
      <div className="cardBody">
        <div className="cardImg">
          <img src={img ? img : "https://via.placeholder.com/200"} alt="" />
        </div>
        <div className="cardText">
          <p className="titleCard">{title}</p>
          <div className="btnBox">
            <Link to={directTo}>
              <Button text={textBtn} />
            </Link>
            <Button text={iconBtn} />
          </div>
        </div>
      </div>
    </>
  );
}

export default Card;
