import "./style.css";
import Input from "../../components/Input";
import { useState } from "react";
import { BiSolidUser } from "react-icons/bi";
import Button from "../../components/Button";
import { Link } from "react-router-dom";
import Modal from "../../components/Modal";

const RegisterClient = () => {
  const API_URL = "https://x8ki-letl-twmt.n7.xano.io/api:1eigxzy0/clients";

  const [client, setClient] = useState({});
  const [modal, setModal] = useState(false);

  const saveText = (event) => {
    const { name, value } = event.target;
    setClient({ ...client, [name]: value });
    console.log(client);
  };

  const saveClient = async (evento) => {
    evento.preventDefault();

    try {
      const response = await fetch(API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(client),
      });

      setModal(false);
      setTimeout(changeValue, 2000);
      console.log("Cliente Registrado");
    } catch (e) {
      console.log("Erro durante a requisição: " + e);
    }
  };

  const changeValue = () => {
    setModal(true);
  };

  const showModal = {
    display: "none",
  };
  return (
    <div className="containerBox">
      <h1>
        <BiSolidUser />
        Registrar Cliente
      </h1>
      <form onSubmit={saveClient}>
        <Input
          icon={<BiSolidUser />}
          inptType="text"
          inptId="nameClient"
          textLbl="Nome"
          name="Name"
          getDados={saveText}
        />

        <Input
          icon={<BiSolidUser />}
          inptType="text"
          inptId="nameClient"
          textLbl="Vendedor"
          name="Seller"
          getDados={saveText}
        />
        <div className="buttonsForm">
          <Button text="Salvar" />
          <Link to="/ClientList">
            <Button text="Cancelar" />
          </Link>
        </div>
      </form>
    </div>
  );
};

export default RegisterClient;
