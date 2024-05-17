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

const Auth = ({ setLogin }) => {
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

    console.log(event.target.value);
    console.log(user);
  };

  const createUser = async (event) => {
    event.preventDefault();
    console.log("User: ", user);

    fetch("http://localhost:3333/login", {
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
        console.log("Sucess: ", data);
        console.log("token", data.token);
        console.log("user", data.userFound[0]);
        localStorage.setItem("token", data.token);
        localStorage.setItem("user", JSON.stringify(data.userFound[0]));
        changeLogin();
      })
      .catch((error) => {
        console.error("Error", error);
      });
  };

  const changeLogin = () => {
    setLogin(true);
  };

  return (
    <div className="authBox">
      <div className="containerAuth">
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
        />

        <Input
          inptId="emailRegisterId"
          textLbl="Email"
          icon={<FaRegEnvelope />}
          inptType="email"
        />

        <Input
          icon={<FaLock />}
          inptId="passwordRegisterId"
          inptType="password"
          textLbl="Senha"
        />

        <Input
          icon={<FaLock />}
          inptId="repeatPassowrdId"
          inptType="repeatPassword"
          textLbl="Repita a Senha"
        />

        <Button text="Registrar" />
      </div>
      <input
        type="checkbox"
        id="maskInpt"
        className="maskInpt"
        checked={checkBoxCheck}
        onChange={handleChangeChecbox}
      />
      <div className="mask" style={checkBoxPosition}>
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
