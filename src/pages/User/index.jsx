import { useEffect, useState } from "react";
import { USER_ID, API_URL } from "../../config/api";
import Input from "../../components/Input";
import { FaRegEnvelope } from "react-icons/fa6";

import { BiSolidUserDetail } from "react-icons/bi";

const User = () => {
  const [company, setCompany] = useState();
  useEffect(() => {
    const fetchCompany = async () => {
      try {
        const response = await fetch(
          `${API_URL}/company/${USER_ID.id_company}`
        );
        if (!response.ok) {
          throw new Error("Erro ao obter os Dados");
        }

        const companyJson = await response.json();
        setCompany(companyJson[0]);
        console.log(company);
      } catch (erro) {
        console.log(erro);
      }
    };

    fetchCompany();
  }, []);

  return (
    <div className="formBox">
      <h1>Dados do Perfil</h1>
      <br />

      <Input value={USER_ID.name} textLbl="Nome" icon={<BiSolidUserDetail />} />
      <Input value={USER_ID.email} textLbl="Email" icon={<FaRegEnvelope />} />
      {company ? (
        <Input value={company.name} textLbl="Email" icon={<FaRegEnvelope />} />
      ) : (
        <Input value="Sem Empresa" textLbl="Email" icon={<FaRegEnvelope />} />
      )}
    </div>
  );
};

export default User;
