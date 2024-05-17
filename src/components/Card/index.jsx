import Button from "../Button";
import "./style.css";

function Card(props) {
  return (
    <>
      <div className="cardBody">
        <img src="https://via.placeholder.com/200" alt="" />
        <div className="cardText">
          <p className="titleCard">{props.title}</p>
          <div className="btnBox">
            <Button text={props.textBtn} />
            <Button text={props.iconBtn} />
          </div>
        </div>
      </div>
    </>
  );
}

export default Card;
