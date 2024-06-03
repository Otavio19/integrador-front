import Button from "../../components/Button";
import { Link } from "react-router-dom";
import Card from "../../components/Card";
import { useEffect, useState } from "react";
import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

//Icon
import { FaEye } from "react-icons/fa6";
import { BiSad } from "react-icons/bi";

//Config:
import { API_URL, USER, USER_ID } from "../../config/api";

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [rows, setRows] = useState([]);

  function createData(client, price, seller) {
    return { client, price, seller };
  }

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
          setOrders(orders);
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

      <br />
      {!orders.length == 0 ? (
        <div>
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell>Ver Pedido</TableCell>
                  <TableCell>Cliente</TableCell>
                  <TableCell align="right">Valor</TableCell>
                  <TableCell align="right">Vendedor</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {orders.map((row) => (
                  <TableRow
                    key={row.id}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell>
                      {
                        <Link to={`/Orders/RegisterOrder/${row.id}`}>
                          <Button text={<FaEye />} />
                        </Link>
                      }
                    </TableCell>
                    <TableCell component="th" scope="row">
                      {row.client}
                    </TableCell>
                    <TableCell align="right">{row.price}</TableCell>
                    <TableCell align="right">{row.seller}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </div>
      ) : (
        <p>
          {" "}
          Nenhum Pedido Registrado <BiSad />
        </p>
      )}
    </div>
  );
};

export default Orders;
