//Config
import { useEffect, useState } from "react";

//Components
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Button from "../../components/Button";
import { Link } from "react-router-dom";
import { Grid } from "@mui/material";

//Icon
import { FaEye } from "react-icons/fa6";
import { API_URL, USER_ID } from "../../config/api";

const CategoryList = () => {
  const [category, setCategory] = useState([{}]);

  useEffect(() => {
    fetch(`${API_URL}/category/company/${USER_ID.id_company}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error(response);
        }
        return response.json();
      })
      .then((data) => {
        setCategory(data);
      });
  }, []);

  return (
    <div className="containerBox">
      <Grid container direction="row" justifyContent="space-between">
        <Grid item>
          <h1>Categorias</h1>
        </Grid>
        <Grid item>
          <Link to="/Category/RegisterCategory">
            <Button text="Nova Categoria" />
          </Link>
        </Grid>
      </Grid>
      <div>
        <Grid container spacing={2}>
          <Grid item xs={7}>
            <TableContainer component={Paper}>
              <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                  <TableRow>
                    <TableCell>Ação</TableCell>
                    <TableCell>Nome</TableCell>
                    <TableCell align="right">Ativo?</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {category.map((category) => (
                    <TableRow
                      key={category.id}
                      sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                    >
                      <TableCell>
                        {
                          <Link to={`/Category/${category.id}`}>
                            <Button text={<FaEye />} />
                          </Link>
                        }
                      </TableCell>
                      <TableCell component="th" scope="row">
                        {category.name}
                      </TableCell>
                      <TableCell align="right">
                        {category.active ? "Ativo" : "Inativo"}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Grid>
        </Grid>
      </div>
    </div>
  );
};

export default CategoryList;
