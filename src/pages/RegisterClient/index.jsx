import "./style.css";

//Components:
import { useEffect, useState } from "react";
import Button from "../../components/Button";
import { Grid } from "@mui/material";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";

//Config
import { Link, useParams } from "react-router-dom";
import { API_URL, USER_ID } from "../../config/api";
import Utils from "../../config/utils";

const RegisterClient = () => {
  const util = new Utils()
  const { id } = useParams();
  const [status, setStatus] = useState();

  const [client, setClient] = useState();

  useEffect(() => {
    if (id) {
      const clientFetch = async () => {
        await fetch(`${API_URL}/client/${id}`)
          .then((response) => {
            if (!response.ok) {
              return console.log(
                "Servidor não respondendo.(Buscar de Clientes"
              );
            }

            return response.json();
          })
          .then((data) => {
            return setClient(data[0]);
          })
          .catch((error) => {
            console.log(error);
          });
      };

      clientFetch();
    }

    console.log(client);
  }, []);

  const getText = (event) => {
    event.preventDefault();
    const { name, value } = event.target;

    setClient({ ...client, [name]: value });
  };

  const saveClient = (event) => {
    event.preventDefault();

    const clientAdd = {
      ...client,
      id_seller: USER_ID.id,
      id_company: USER_ID.id_company,
      password: "12345678",
    };

    if (clientAdd) {
      const fetchClient = fetch(`${API_URL}/client`, util.option("POST", clientAdd))
        .then((response) => {
          setStatus("");
          if (!response.ok) {
            return setStatus("Verifique os campos.");
          }
          return response.json();
        })
        .then((data) => {
          return true;
        })
        .catch((error) => {
          console.log(error);
        });

      if (fetchClient) {
        document.getElementById("nameClient").value = "";
        document.getElementById("emailClient").value = "";
      }
    }

    setStatus("Cliente Registrado!");
  };

  const editClient = () => {
    fetch(`${API_URL}/client/${id}`, util.option("PUT", client))
      .then((response) => {
        if (!response.ok) {
          throw new Error("Erro ao atualizar o cliente");
        }
        return response.json();
      })
      .then((data) => {
        setStatus("Cliente Atualizado! ", data);
      })
      .catch((error) => {
        console.error("Erro:", error);
      });
  };

  return (
    <div className="containerBox">
      {!id ? <h1>Registrar Client</h1> : <h1>Cliente Registrado</h1>}
      <br />
      <form>
        <Grid container spacing={2}>
          <Grid item xs={4}>
            {!id ? (
              <TextField
                id="nameClient"
                label="Nome"
                variant="outlined"
                onChange={getText}
                name="name"
              />
            ) : (
              <TextField
                id="nameClient"
                label="Nome"
                variant="outlined"
                name="name"
                value={client?.name}
                onChange={getText}
                focused
              />
            )}
          </Grid>
          <Grid item xs={4}>
            {id ? (
              <TextField
                id="emailClient"
                label="Email"
                variant="outlined"
                focused
                name="email"
                value={client?.email}
                onChange={getText}
              />
            ) : (
              <TextField
                id="emailClient"
                label="Email"
                variant="outlined"
                onChange={getText}
                name="email"
              />
            )}
          </Grid>
        </Grid>
        <br />
        <h2>Configurações</h2>
        <br />
        <Grid container spacing={2}>
          <Grid item xs={4}>
            <TextField
              id="sellerClient"
              label="Vendedor"
              variant="outlined"
              onChange={getText}
              name="seller"
              value={USER_ID.name}
            />
          </Grid>
          <Grid item xs={4}>
            {id ? (
              <TextField
                id="activeClient"
                select
                label="Ativo?"
                helperText="Selecione um estado."
                name="active"
                onChange={getText}
              >
                <MenuItem value={true}>{"Sim"}</MenuItem>
                <MenuItem value={false}>{"Não"}</MenuItem>
              </TextField>
            ) : (
              <TextField
                id="activeClient"
                select
                label="Ativo?"
                defaultValue="True"
                helperText="Selecione um estado."
                name="active"
                onChange={getText}
              >
                <MenuItem value={true}>{"Sim"}</MenuItem>
                <MenuItem value={false}>{"Não"}</MenuItem>
              </TextField>
            )}
          </Grid>
        </Grid>
      </form>
      {<p>{status}</p>}
      <Grid container spacing={2}>
        <Grid item>
          {!id ? (
            <Button text="Salvar" event={saveClient} />
          ) : (
            <Button text="Editar" event={editClient} />
          )}
        </Grid>
        <Grid item>
          <Link to="/ClientList">
            <Button text="Voltar" />
          </Link>
        </Grid>
      </Grid>
    </div>
  );
};

export default RegisterClient;
