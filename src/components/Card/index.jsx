import Button from "../Button";
import "./style.css";

import { Link } from "react-router-dom";

function Card({ title, textBtn, iconBtn, directTo }) {
  return (
    <>
      <div className="cardBody">
        <img src="https://via.placeholder.com/200" alt="" />
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
