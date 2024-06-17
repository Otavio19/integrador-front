import Button from "../../components/Button";
import { Link } from "react-router-dom";
import Card from "../../components/Card";
import { useEffect, useState } from "react";
import * as React from "react";

//Config:
import { API_URL, USER_ID } from "../../config/api";
import CardOrder from "../../components/CardOrder";
import "./style.css";
import Convert from "../../config/convert";

//Icons:
import { FaDesktop } from "react-icons/fa6";
import { FaStore } from "react-icons/fa6";
import { FaCheck } from "react-icons/fa6";
import { FaClockRotateLeft } from "react-icons/fa6";

const Orders = () => {
  const convert = new Convert();
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchOrders = async () => {
      fetch(API_URL + "/orderProduct/" + USER_ID.id_company)
        .then((response) => {
          if (!response.ok) {
            throw new Error("API Não Respondendo (Orders)");
          }
          return response.json();
        })
        .then((orders) => {
          const formattedOrders = orders.map((order) => ({
            ...order,
            created_at: new Date(order.created_at), // Converter para objeto Date
          }));

          // Agora você pode adicionar formattedOrders ao seu estado ou fazer o que for necessário com ele
          console.log(formattedOrders);
          setOrders(formattedOrders);
        })
        .catch((error) => console.log(error));
    };

    fetchOrders();
  }, []);

  return (
    <div className="containerBox">
      <h1>Pedidos</h1>
      <Link to="/Orders/RegisterOrder">
        <Button text="Novo Pedido" />
      </Link>
      <div className="cardContainer">
        {orders.map((order) => (
          <Link to={`/Orders/RegisterOrder/${order.id}`} className="linkStyle">
            <CardOrder
              key={order.id}
              date={`${convert.date(
                order.created_at.getDate()
              )} / ${convert.date(
                order.created_at.getMonth() + 1
              )} / ${order.created_at.getFullYear()}`}
              value={order.price}
              client={order.client}
              seller={order.seller}
              iconSource={
                order.source == "system" ? <FaDesktop /> : <FaStore />
              }
              iconStatus={
                order.status == "invoiced" ? <FaCheck /> : <FaClockRotateLeft />
              }
            />
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Orders;
