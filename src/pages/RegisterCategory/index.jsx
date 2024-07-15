import TextField from "@mui/material/TextField";
import { Grid } from "@mui/material";
import Button from "../../components/Button";
import { useEffect, useState } from "react";
import MenuItem from "@mui/material/MenuItem";

//Config
import { API_URL, USER_ID } from "../../config/api";
import Utils from "../../config/utils";
import "./style.css";
import { useParams } from "react-router-dom";

const RegisterCategory = () => {
  const { id } = useParams();

  useEffect(() => {
    if (id != undefined) {
      fetch(`${API_URL}/category/${id}`)
        .then((response) => {
          if (!response.ok) {
            throw new Error("Erro na requisição");
          }
          return response.json();
        })
        .then((data) => {
          console.log(data);
          setCategory(data);
        })
        .catch((error) => console.log(error));
    }
  }, []);

  const [category, setCategory] = useState();
  const [feedback, setFeedback] = useState();
  const [active, setActive] = useState();
  const utils = new Utils();

  const inputValue = (event) => {
    console.log(event.target.value);
    const { name, value } = event.target;
    setCategory({ ...category, [name]: value });
  };

  const mostrar = () => {
    const updateCategory = { ...category, id_company: USER_ID.id_company };
    console.log(updateCategory);
    setCategory(updateCategory);

    const newCategory = utils.fetchObjetct("category", "POST", updateCategory);

    if (newCategory) {
      setFeedback("Categoria Salva Com Sucesso!");
      setTimeout(() => {
        setFeedback("");
      }, 3000);
    }
  };

  const update = () => {
    console.log(category);
    const updateProduct = utils.fetchObjetct(
      `category/${category.id}`,
      "PUT",
      category
    );
    if (updateProduct) {
      setFeedback("Categoria Atualizada Com Sucesso!");
      setTimeout(() => {
        setFeedback("");
      }, 3000);
    }
  };
  return (
    <div className="containerBox">
      <h1>Registrar Categoria</h1>
      <form action="">
        <div className="inptBox">
          <TextField
            label="Nome"
            variant="outlined"
            name="name"
            onChange={inputValue}
            value={category?.name}
            focused={category?.id !== undefined}
          />
        </div>
        <div className="inptBox">
          <TextField
            id="activeClient"
            select
            label="Ativo?"
            helperText="Selecione um estado."
            name="active"
            onChange={(value) => {
              setCategory({ ...category, active: value.target.value });
            }}
            value={active}
          >
            <MenuItem value={true}>{"Sim"}</MenuItem>
            <MenuItem value={false}>{"Não"}</MenuItem>
          </TextField>
        </div>
      </form>
      <p>{feedback}</p>
      <Button
        text={id == undefined ? "Salvar" : "Editar"}
        event={id == undefined ? mostrar : update}
      />
    </div>
  );
};

export default RegisterCategory;
