import "./style.css";
import Input from "../../components/Input";
import { Link, useParams } from "react-router-dom";
import { API_URL, TOKEN } from "../../config/api";
import { BiNotepad, BiBox, BiDollar, BiPlusMedical } from "react-icons/bi";
import { useEffect, useState } from "react";
import { Grid } from "@mui/material";

//Components
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Button from "../../components/Button";
import InputSelect from "../../components/InputSelect";

const RegisterProduct = () => {
  const { id } = useParams();

  //Criamos o objeto que vai ser salvo no BD
  const [product, setProduct] = useState({
    amount: "",
    description: "",
    name: "",
    price: "",
    id_company: "",
    active: true, // Exemplo de campo booleano
  });

  const [img, setImg] = useState();

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
    console.log("Produto: ", product);
    const newProduct = { ...product, img: img };
    try {
      await fetch(`${API_URL}/product`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${TOKEN}`,
        },
        body: JSON.stringify(product),
      }).then((response) => {
        !response.ok
          ? console.log(
              "Erro ao Registrar o Produto: " +
                response.statusText +
                " Produto:" +
                product
            )
          : console.log("Produto Registrado com Sucesso!");
      });
    } catch (error) {
      console.log("Erro durante a requisição: ", error);
    }
  };

  useEffect(() => {
    const fetchProduct = async () => {
      await fetch(`${API_URL}/product/${id}`)
        .then((response) => {
          if (!response.ok) return console.log("Erro na requisição.");
          return response.json();
        })
        .then((data) => setProduct(data[0]));
    };

    fetchProduct();
  }, []);

  return (
    <form className="formBox" onSubmit={saveProduct}>
      <h1 className="formTitle">
        <BiPlusMedical /> Registrar Produto
      </h1>
      <Input
        icon={<BiNotepad />}
        inptType="text"
        inptId="nameProduct"
        textLbl="Nome"
        name="name"
        getDados={getValue}
        value={product?.name}
      />

      <Input
        icon={<BiBox />}
        inptType="number"
        min="0"
        inptId="logisticProduct"
        textLbl="Quantidade em Estoque"
        name="amount"
        getDados={getValue}
        value={product?.amount}
      />

      <Input
        icon={<BiDollar />}
        inptType="number"
        min="0"
        inptId="priceProduct"
        textLbl="Valor"
        name="price"
        getDados={getValue}
        value={product?.price}
      />

      <Input
        icon={<BiDollar />}
        inptType="text"
        inptId="descriptionProduct"
        textLbl="Descrição"
        name="description"
        getDados={getValue}
        value={product?.description}
      />

      <InputSelect
        name="active"
        getDados={getValue}
        options={[
          { value: true, text: "Sim" },
          { value: false, text: "Não" },
        ]}
      />

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

      <Grid container spacing={2} alignItems="center">
        <Grid item>
          <Button text="Salvar" type="submit" />
        </Grid>
        <Grid item>
          <Link to="/ProductList">
            <Button text="Cancelar" />
          </Link>
        </Grid>
      </Grid>
    </form>
  );
};

export default RegisterProduct;
