import * as React from "react";
import { PieChart } from "@mui/x-charts/PieChart";
import CardHome from "../../components/CardHome";
import { API_URL, USER_ID } from "../../config/api";
import "./style.css";
import { useState, useEffect } from "react";
//icons
import { FaArrowTrendUp } from "react-icons/fa6";
import { FaDollarSign } from "react-icons/fa6";

const Home = () => {
  const [orderStatus, setOrderStatus] = useState([
    { label: "initial", value: 0 },
  ]);

  useEffect(() => {
    const fetchStatusOrder = () => {
      fetch(`${API_URL}/orderStatus/${USER_ID.id_company}`)
        .then((response) => {
          if (!response.ok) {
            throw new Error("Network response was not ok");
          }
          return response.json();
        })
        .then((data) => {
          const formattedData = data.map((item) => ({
            label: item.status,
            value: item.total,
            totalPrice: item.total_price,
          }));
          setOrderStatus(formattedData);
          console.log(formattedData);
        })
        .catch((error) => {
          console.error("Error fetching order status:", error);
          setOrderStatus([{ label: "Error", value: 0 }]);
        });
    };

    fetchStatusOrder();
  }, []);

  return (
    <div className="containerBox">
      <h1>Olá {USER_ID.name}, pronto para alcançar novos objetivos hoje?</h1>
      <br />
      <div className="cardBoxHome">
        <CardHome
          icon={<FaDollarSign />}
          value={"R$ " + orderStatus[0]?.totalPrice}
          title="Total Faturado"
        />
        <CardHome
          icon={<FaArrowTrendUp />}
          value={Number(orderStatus[0]?.value) + Number(orderStatus[1]?.value)}
          title="Total de Pedidos"
        />
        <CardHome icon={<FaArrowTrendUp />} value="20" title="Vendas no Mês" />
      </div>
      <br />
      <div className="cardBoxHome">
        <div className="cardGraphic">
          <h4>Pedidos Faturados VS Pendentes</h4>
          <PieChart
            colors={["green", "red"]}
            series={[
              {
                data: orderStatus,
              },
            ]}
            width={400}
            height={200}
          />
        </div>
      </div>
    </div>
  );
};

export default Home;
