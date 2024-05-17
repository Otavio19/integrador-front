import "./style.css";
import Input from "../../components/Input";
import Button from "../../components/Button";
import { Link } from "react-router-dom";
import { API_URL, USER_ID, TOKEN } from "../../config/api";
import { BiNotepad, BiBox, BiDollar, BiPlusMedical } from "react-icons/bi";
import { useState } from "react";
import Modal from "../../components/Modal";

const RegisterProduct = () => {
  //Criamos o objeto que vai ser salvo no BD
  const [product, setProduct] = useState({});

  const user = USER_ID;

  const [modal, setModal] = useState(true);

  const changeValue = () => {
    setModal(true);
  };

  const saveData = (event) => {
    const { name, value } = event.target;
    setProduct({ ...product, [name]: value });
  };

  const getDados = async (evento) => {
    event.preventDefault();
    console.log(product);
    try {
      const response = await fetch(API_URL + "/product", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${TOKEN}`,
        },
        body: JSON.stringify(product),
      });

      if (response.ok) {
        console.log("Produto Registrado com Sucesso!");
        setModal(false);
        setTimeout(changeValue, 2000);
      } else {
        console.log("Erro ao Registrar o Produto: " + response.statusText);
      }
    } catch (error) {
      console.log("Erro durante a requisição: ", error);
    }
  };

  const showModal = {
    display: "none",
  };

  return (
    <form className="formBox" onSubmit={getDados}>
      <h1 className="formTitle">
        <BiPlusMedical /> Registrar Produto
      </h1>
      <Input
        icon={<BiNotepad />}
        inptType="text"
        inptId="nameProduct"
        textLbl="Nome"
        name="name"
        getDados={saveData}
      />

      <Input
        icon={<BiBox />}
        inptType="number"
        min="0"
        inptId="logisticProduct"
        textLbl="Quantidade em Estoque"
        name="amount"
        getDados={saveData}
      />

      <Input
        icon={<BiDollar />}
        inptType="number"
        min="0"
        inptId="priceProduct"
        textLbl="Valor"
        name="price"
        getDados={saveData}
      />

      <Input
        icon={<BiDollar />}
        inptType="text"
        inptId="descriptionProduct"
        textLbl="Descrição"
        name="description"
        getDados={saveData}
      />

      <div className="buttonsForm">
        <Button text="Salvar" type="submit" />
        <Link to="/ProductList">
          <Button text="Cancelar" />
        </Link>
      </div>

      {modal == true ? (
        <div className="showModal" style={showModal}>
          <Modal text="Sucesso ao Cadastrar o Produto!" />
        </div>
      ) : (
        <div className="showModal">
          <Modal />
        </div>
      )}
    </form>
  );
};

export default RegisterProduct;
