/* Components */
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Button from "../../components/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import Input from "../../components/Input";

//Icons
import { FaEye } from "react-icons/fa6";
import { BiSearchAlt } from "react-icons/bi";
import { BiCheckDouble } from "react-icons/bi";

// Config
import { API_URL, USER_ID } from "../../config/api";
import Utils from "../../config/utils";
import Convert from "../../config/convert";
import "./style.css";

const Invoice = () => {
  const convert = new Convert();
  const utils = new Utils();
  const [orders, setOrders] = useState([]);
  const [idOrder, setIdOrder] = useState();
  const [idSearch, setIdSearch] = useState();
  const [orderFound, setOrderFound] = useState(true);

  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
  };

  useEffect(() => {
    fetch(`${API_URL}/orderProduct/${USER_ID.id_company}`)
      .then((response) => {
        if (!response.ok) {
          return console.log("Erro na requisição de Pedidos.");
        }
        return response.json();
      })
      .then((data) => {
        const newOrders = data.map((order) => ({
          ...order,
          created_at: new Date(order.created_at),
        }));
        setOrders(newOrders);
      });
  }, []);

  const invoiceOrder = async () => {
    await fetch(
      `${API_URL}/orderProduct/invoiceOrder/${idOrder}`,
      utils.option("PUT", {})
    )
      .then((response) => {
        if (!response.ok) {
          throw new Error("Erro Ao Faturar o Pedido");
        }
        return response.json();
      })
      .then(() => {
        handleClose();
      });
  };

  const getText = (event) => {
    setIdSearch(event.target.value);
  };

  const getOrderById = async () => {
    console.log("ID buscado: ", idSearch);
    await fetch(`${API_URL}/orderProduct/order/${idSearch}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Erro Na Requisição.");
        }
        return response.json();
      })
      .then((data) => {
        if (data == null) {
          setOrderFound(false);

          return setTimeout(() => {
            setOrderFound(true);
          }, 3000);
        }
        const newOrder = {
          ...data,
          created_at: new Date(data.created_at),
        };

        setOrders([newOrder]);
      });
  };

  return (
    <div className="containerBox">
      <h1>Faturar Pedidos</h1>
      <div className="searchBox">
        <Input
          textLbl="Buscar Pedido por ID"
          getDados={getText}
          icon={<BiSearchAlt />}
        />

        <Button text="Buscar" event={getOrderById} />
      </div>
      {!orderFound && <p className="alertMsg">Nenhum Pedido Encontrado</p>}
      <div>
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>Ver Pedido</TableCell>
                <TableCell>Data</TableCell>
                <TableCell>Cliente</TableCell>
                <TableCell>Vendedor</TableCell>
                <TableCell>Valor</TableCell>
                <TableCell>Ação</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {orders.map((order) => (
                <TableRow
                  key={order.id}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell>
                    {
                      <Link to={`/Orders/RegisterOrder/${order.id}`}>
                        <Button text={<FaEye />} />
                      </Link>
                    }
                  </TableCell>
                  <TableCell component="th" scope="row">
                    {`${convert.date(order.created_at.getDate())} /
                    ${convert.date(order.created_at.getMonth())} /
                    ${order.created_at.getFullYear()}`}
                  </TableCell>
                  <TableCell component="th" scope="row">
                    {order.client}
                  </TableCell>
                  <TableCell>{order.seller}</TableCell>
                  <TableCell>{order.price}</TableCell>
                  <TableCell>
                    {order.status == "invoiced" ? (
                      "Faturado"
                    ) : (
                      <Button
                        event={() => {
                          setOpen(true);
                          setIdOrder(order.id);
                        }}
                        text={<BiCheckDouble />}
                      />
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Faturar Pedido?
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            <div className="buttonBox">
              <Button text="Sim" event={invoiceOrder} />
              <Button text="Cancelar" event={handleClose} />
            </div>
            <div className="alertMsg">
              <p>Ação não pode ser desfeita</p>
            </div>
          </Typography>
        </Box>
      </Modal>
    </div>
  );
};

export default Invoice;
