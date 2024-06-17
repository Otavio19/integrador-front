import "./style.css";

const CardOrder = ({
  id,
  value,
  client,
  seller,
  iconSource,
  iconStatus,
  date,
}) => {
  const redirect = () => {
    console.log("Outra Pagina");
    history.replace("/");
  };
  return (
    <div className="cardOrderBox" onClick={redirect}>
      <div className="dateOrder">{date}</div>
      <div className="valueCard">
        <span>R$</span>
        {value}
      </div>
      <div className="infoBox">
        <div className="infoCardBox">
          <div className="infoCard">{client}</div>
          <div className="toolTipInfo">Cliente: {client}</div>
        </div>
        <div className="infoCardBox">
          <div className="infoCard">{seller}</div>
          <div className="toolTipInfo">Vendedor: {seller}</div>
        </div>
      </div>
      <div className="iconSource">{iconSource}</div>
      <div className="iconStatus">{iconStatus}</div>
    </div>
  );
};

export default CardOrder;
