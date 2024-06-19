import "./style.css";
import { FaChrome } from "react-icons/fa6";
import { FaUser } from "react-icons/fa6";
import { FaLock } from "react-icons/fa6";
import Button from "../../components/Button";
import Input from "../../components/Input";
import { FaRegEnvelope } from "react-icons/fa6";
import { IoArrowRedoSharp } from "react-icons/io5";
import { IoArrowUndo } from "react-icons/io5";
import { useState } from "react";
import { BiBuildings } from "react-icons/bi";
import CircularProgress from "@mui/material/CircularProgress";

//Config

import { API_URL } from "../../config/api";

const Auth = () => {
  const [loader, setLoader] = useState(false);
  const [statusRegister, setStatusRegister] = useState("");

  const [checkBoxCheck, setCheckBoxCheck] = useState(true);

  const [user, setUser] = useState({});

  const handleChangeChecbox = () => {
    setCheckBoxCheck(!checkBoxCheck);
  };

  const checkBoxPosition = {
    left: checkBoxCheck ? "30rem" : "0",
  };

  const getText = (event) => {
    const { name, value } = event.target;

    setUser({ ...user, [name]: value });
  };

  const createUser = async (event) => {
    event.preventDefault();
    setLoader(true);

    fetch(`${API_URL}/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        localStorage.setItem("token", data.token);
        localStorage.setItem("user", JSON.stringify(data.userFound[0]));

        window.location.reload();
      })
      .catch((error) => {
        console.error("Error", error);
      })
      .finally(() => {
        setLoader(false);
      });

    resetInputs();
  };

  // Função para registrar Usuário Novo:

  const registerUser = async (event) => {
    event.preventDefault();
    const userForm = user;
    console.log(userForm);
    if (userForm.password != userForm.passwordRepeat) {
      return setStatusRegister("Senhas Não Conferem!");
    }

    setStatusRegister("");

    const validateId = await fetch(
      `${API_URL}/company/validate/${userForm.id_company}`
    ).then((company) => company.json());

    if (validateId == null) {
      return setStatusRegister("Empresa Não Existe!");
    }

    delete userForm.passwordRepeat;

    const register = await fetch(`${API_URL}/auth/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userForm),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Erro ao realizar a requisição " + response.status);
        }
        return response.json();
      })
      .then((data) => {
        return data;
      })
      .catch((error) => {
        console.error("Error ", error);
      });

    console.log(register);
    setStatusRegister("Usuário Registrado!");
    resetInputs();
  };

  const resetInputs = () => {
    setUser({});
    document.getElementById("emailId").value = "";
    document.getElementById("passwordId").value = "";
    document.getElementById("nameId").value = "";
    document.getElementById("emailRegisterId").value = "";
    document.getElementById("passwordRegisterId").value = "";
    document.getElementById("repeatPassowrdId").value = "";
    document.getElementById("idCompany").value = "";
  };

  return (
    <div className="authBox">
      <div className="containerAuth">
        {loader == false ? (
          <form action="" onSubmit={createUser}>
            <h1>Acessar Conta</h1>
            <ul>
              <li>
                <FaChrome />
              </li>
              <p>Acessar com o Google</p>
            </ul>
            <Input
              inptId="emailId"
              textLbl="Email"
              icon={<FaUser />}
              inptType="email"
              getDados={getText}
              name="email"
            />
            <Input
              icon={<FaLock />}
              inptId="passwordId"
              inptType="password"
              textLbl="Senha"
              getDados={getText}
              name="password"
            />

            <Button text="Acessar" />
          </form>
        ) : (
          <CircularProgress />
        )}
      </div>

      <div className="containerAuth">
        <h1>Criar Conta</h1>
        <ul>
          <li>
            <FaChrome />
          </li>
        </ul>

        <Input
          inptId="nameId"
          textLbl="Nome"
          icon={<FaUser />}
          inptType="text"
          getDados={getText}
          name="name"
        />

        <Input
          inptId="emailRegisterId"
          textLbl="Email"
          icon={<FaRegEnvelope />}
          inptType="email"
          name="email"
          getDados={getText}
        />

        <Input
          icon={<FaLock />}
          inptId="passwordRegisterId"
          inptType="password"
          textLbl="Senha"
          name="password"
          getDados={getText}
        />

        <Input
          icon={<FaLock />}
          inptId="repeatPassowrdId"
          inptType="password"
          textLbl="Repita a Senha"
          name="passwordRepeat"
          getDados={getText}
        />

        <Input
          icon={<BiBuildings />}
          inptId="idCompany"
          inptType="repeatPassword"
          textLbl="ID da Empresa"
          name="id_company"
          getDados={getText}
        />

        <p>{statusRegister}</p>
        <Button text="Registrar" event={registerUser} />
      </div>
      <input
        type="checkbox"
        id="maskInpt"
        className="maskInpt"
        checked={checkBoxCheck}
        onChange={handleChangeChecbox}
      />
      <div className="mask" style={checkBoxPosition} onClick={resetInputs}>
        <h1>{checkBoxCheck ? "Bem-Vindo!" : "Bom Ve-lo Novamente!"}</h1>
        <br />
        <p>
          {checkBoxCheck
            ? "Estamos ansiosos para vê-lo(a) prosperar e crescer conosco."
            : "Agradecemos por confiar em nós para suas necessidades e esperamos que cada interação com o sistema seja uma experiência positiva e produtiva."}
        </p>
        <p>
          {checkBoxCheck
            ? "Se surgir alguma dúvida, nossa equipe de suporte está sempre disponível para ajudar. Vamos começar essa jornada emocionante juntos!"
            : "Agradecemos por escolher nossa plataforma. Estamos ansiosos para ver como você fará parte dessa jornada digital."}
        </p>
        <br />
        <label htmlFor="maskInpt">
          {checkBoxCheck ? (
            <p>
              Não Possui Conta? Clique aqui! <IoArrowUndo />
            </p>
          ) : (
            <p>
              Já Possui Conta? Clique aqui! <IoArrowRedoSharp />
            </p>
          )}
        </label>
      </div>
    </div>
  );
};

export default Auth;
