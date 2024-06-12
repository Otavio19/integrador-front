//Config
import "./style.css";
import { useEffect, useState } from "react";
import Button from "../../components/Button";
import { Link } from "react-router-dom";
import { API_URL, USER_ID } from "../../config/api";

/* Components */
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

//Icon
import { FaEye } from "react-icons/fa6";

const ClientList = () => {
  const [clientList, setClientList] = useState([{}]);

  useEffect(() => {
    const fetchClient = async () => {
      const response = await fetch(
        `${API_URL}/client/company/${USER_ID.id_company}`
      );
      const client = await response.json();
      setClientList(client);
    };

    fetchClient();
  }, []);

  return (
    <>
      <div className="containerBox">
        <div className="headContainer">
          <h1>Clientes Cadastrados</h1>
          <Link to="/ClientList/RegisterClient">
            <Button text="Cadastrar Novo Cliente" />
          </Link>
        </div>

        <div>
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell>Ação</TableCell>
                  <TableCell>Nome</TableCell>
                  <TableCell align="right">Vendedor</TableCell>
                  <TableCell align="right">Ativo?</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {clientList.map((client) => (
                  <TableRow
                    key={client.id}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell>
                      {
                        <Link to={`/ClientList/RegisterClient/${client.id}`}>
                          <Button text={<FaEye />} />
                        </Link>
                      }
                    </TableCell>
                    <TableCell component="th" scope="row">
                      {client.client_name}
                    </TableCell>
                    <TableCell align="right">{client.seller_name}</TableCell>
                    <TableCell align="right">
                      {client.active ? "Ativo" : "Inativo"}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </div>
      </div>
    </>
  );
};

export default ClientList;
