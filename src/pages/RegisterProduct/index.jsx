import "./style.css";
import Input from "../../components/Input";
import { Link, useParams } from "react-router-dom";
import { API_URL, TOKEN, USER_ID } from "../../config/api";
import { BiNotepad, BiBox, BiDollar, BiPlusMedical } from "react-icons/bi";
import { useEffect, useState } from "react";
import { Grid } from "@mui/material";
import Utils from "../../config/utils";

//Components
import Button from "../../components/Button";
import InputSelect from "../../components/InputSelect";
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import InputLabel from "@mui/material/InputLabel";

const RegisterProduct = () => {
  const { id } = useParams();
  const utils = new Utils();

  const [category, setCategory] = useState(["Buscando.."]);

  const getCategory = async () => {
    const fectCategory = await utils.fetchObjetct(
      `category/company/${USER_ID.id_company}`,
      "GET"
    );
    setCategory(fectCategory);
  };

  const getProduct = async () => {
    const response = await utils.fetchObjetct(`product/${id}`, "GET");
    setProduct(response[0]);
  };

  useEffect(() => {
    getCategory();
    if (id) {
      getProduct();
    }
  }, []);

  //Criamos o objeto que vai ser salvo no BD
  const [product, setProduct] = useState({
    id_company: USER_ID.id_company,
  });
  const [img, setImg] = useState();
  const [feedback, setFeedback] = useState();

  const getValue = (event) => {
    const { name, value } = event.target;
    setProduct({ ...product, [name]: value });
  };

  const saveImg = (event) => {
    event.preventDefault();
    const data = new FileReader();
    data.addEventListener("load", () => {
      setImg(data.result);
      setProduct({ ...product, img: data.result });
    });
    data.readAsDataURL(event.target.files[0]);
  };

  const saveProduct = async (event) => {
    event.preventDefault();
    setProduct({ ...product, img: img });

    try {
      const fetchProduct = await utils.fetchObjetct("product", "POST", product);
      if (fetchProduct) {
        setFeedback("Produto Cadastrado com Sucesso!");
        setTimeout(() => {
          setFeedback("");
        }, 3000);
      }
    } catch (error) {
      console.log("Erro durante a requisição: ", error);
    }
  };

  const editProduct = async (event) => {
    event.preventDefault();
    delete product.category;

    try {
      const fetchProduct = await utils.fetchObjetct(
        `product/${id}`,
        "PUT",
        product
      );

      if (fetchProduct) {
        setFeedback("Produto Editado com Sucesso!");
        setTimeout(() => {
          setFeedback("");
        }, 3000);
      }

      setFeedback(fetchProduct);
    } catch (err) {
      console.log("Erro durante a requisição: ", err);
    }
  };

  return (
    <form className="formBox">
      <h1 className="formTitle">
        <BiPlusMedical /> Registrar Produto
      </h1>
      <div className="inptContainer">
        <TextField
          id="outlined-basic"
          label="Nome"
          name="name"
          style={{ width: 300 }}
          onChange={getValue}
          value={product?.name}
          focused={product?.name}
        />
      </div>

      <div className="inptContainer">
        <Autocomplete
          id="id_category"
          name="id_category"
          style={{ width: 300 }}
          options={category}
          defaultValue={product?.category}
          onChange={(event, category) => {
            console.log([name] + category.id);
            setProduct({ ...product, id_category: category.id });
          }}
          getOptionLabel={(c) => c?.name ?? ""}
          renderInput={(params) => (
            <TextField {...params} label="Categoria" variant="outlined" />
          )}
        />
      </div>

      <div className="inptContainer">
        <TextField
          id="outlined-basic"
          label="Descrição"
          name="description"
          smultiline
          maxRows={4}
          style={{ width: 300 }}
          onChange={getValue}
          value={product?.description}
          focused={product?.description}
        />
      </div>

      <div className="inptContainer">
        <TextField
          id="outlined-basic"
          label="Quantidade em Estoque"
          name="amount"
          style={{ width: 300 }}
          onChange={getValue}
          value={product?.amount}
          focused={product?.amount}
        />
      </div>

      <div className="inptContainer">
        <TextField
          id="outlined-basic"
          label="Preço"
          name="price"
          style={{ width: 300 }}
          onChange={getValue}
          value={product?.price}
          focused={product?.price}
        />
      </div>

      <div className="inptContainer">
        <div className="inptItem">
          <InputLabel id="demo-simple-select-label">Ativo?</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            label="Ativo"
            style={{ width: 300 }}
            onChange={getValue}
            name="active"
          >
            <MenuItem value={true}>Sim</MenuItem>
            <MenuItem value={false}>Não</MenuItem>
          </Select>
        </div>
      </div>

      {id ? (
        <img src={product?.img} alt="" className="imgProduct" />
      ) : (
        <>
          <label htmlFor="imgProduct" className="selectImg">
            Selecione a Foto...
          </label>
          <input type="file" onChange={saveImg} id="imgProduct" />
        </>
      )}

      <p>{feedback}</p>

      <Grid container spacing={2} alignItems="center">
        <Grid item>
          <Button
            text={id ? "Editar" : "Salvar"}
            event={id ? editProduct : saveProduct}
          />
        </Grid>
        <Grid item>
          <Link to="/ProductList">
            <Button text={id ? "Voltar" : "Cancelar"} />
          </Link>
        </Grid>
      </Grid>
    </form>
  );
};

export default RegisterProduct;
