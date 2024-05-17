import Button from "../../components/Button";
import { Link } from "react-router-dom";

const Orders = () => {
  return (
    <>
      <h1>Pedidos</h1>
      <Link to="/Orders/RegisterOrder">
        <Button text="Novo Pedido" />
      </Link>
    </>
  );
};

export default Orders;
