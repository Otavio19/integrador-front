import "./style.css";

const CardHome = ({ icon, value, title }) => {
  return (
    <div className="cardBox">
      <div className="iconCard">{icon}</div>
      <div className="infoCardHome">
        <div className="valueCardHome">{value}</div>
        <div className="tooltipCard">{value}</div>
        <div className="titleCards">{title}</div>
      </div>
    </div>
  );
};

export default CardHome;
