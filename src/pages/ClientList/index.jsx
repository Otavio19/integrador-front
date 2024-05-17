import "./style.css";
import Table from "../../components/Table";
import { useEffect, useState } from "react";
import Button from "../../components/Button";
import { Link } from "react-router-dom";

const ClientList = () => {
  const API_URL = "https://x8ki-letl-twmt.n7.xano.io/api:1eigxzy0/clients";

  const [client, setClient] = useState([{}]);

  useEffect(() => {
    const fetchClient = async () => {
      const response = await fetch(API_URL);
      const client = await response.json();
      console.log(client);
      setClient(client);
    };

    fetchClient();
  }, []);

  return (
    <>
      <div className="containerBox">
        <div className="headContainer">
          <h1>Client</h1>
          <Link to="/ClientList/RegisterClient">
            <Button text="Cadastrar Novo Cliente" />
          </Link>
        </div>
        <Table dados={client} />
      </div>
    </>
  );
};

export default ClientList;
