import "./style.css";

//Components:
import { useEffect, useState } from "react";
import Button from "../../components/Button";
import { Grid } from "@mui/material";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import Modal from "../../components/Modal";

//Config
import { Link, useParams } from "react-router-dom";
import { API_URL, USER_ID } from "../../config/api";
import Utils from "../../config/utils";

const RegisterClient = () => {
  const util = new Utils();
  const { id } = useParams();

  const [client, setClient] = useState({});
  const [feedback, setFeedback] = useState();
  const [showModal, setShowModal] = useState(false);

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
            console.log(data);
            return setClient(data);
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

  const saveClient = async (event) => {
    event.preventDefault();

    const clientAdd = {
      ...client,
      id_seller: USER_ID.id,
      id_company: USER_ID.id_company,
      password: "12345678",
    };

    const fetchClient = await util.fetchObjetct("client", "POST", clientAdd);
    console.log("Resultado: ", fetchClient);
    setShowModal(true);
    setFeedback(fetchClient);
    setTimeout(() => {
      setFeedback("");
      setShowModal(false);
    }, 3000);
  };

  const editClient = () => {
    const fetchClient = util.fetchObjetct(`client/${client.id}`, "PUT", client);
    if (fetchClient) {
      setFeedback("Cliente Atualizado com Sucesso!");
      setTimeout(() => {
        setFeedback("");
      }, 3000);
    }
  };

  return (
    <div className="containerBox">
      {!id ? <h1>Registrar Client</h1> : <h1>Cliente Registrado</h1>}
      <br />
      <form>
        <Grid container spacing={2}>
          <Grid item xs={4}>
            <TextField
              id="nameClient"
              label="Nome"
              variant="outlined"
              name="name"
              value={client?.name}
              onChange={getText}
              InputLabelProps={{
                shrink: client?.name ? true : false,
              }}
            />
          </Grid>
          <Grid item xs={4}>
            <TextField
              id="cpfClient"
              label="CPF"
              variant="outlined"
              onChange={getText}
              name="cpf"
              value={client?.cpf}
              InputLabelProps={{
                shrink: client?.cpf ? true : false,
              }}
            />
          </Grid>
        </Grid>
        <br />
        <h2>Contatos</h2>
        <Grid container spacing={2}>
          <Grid item xs={4}>
            <TextField
              id="emailClient"
              label="Email"
              variant="outlined"
              onChange={getText}
              name="email"
              value={client?.email}
              InputLabelProps={{
                shrink: client?.email ? true : false,
              }}
            />
          </Grid>

          <Grid item xs={4}>
            <TextField
              id="celularClient"
              label="Celular"
              variant="outlined"
              onChange={getText}
              name="phone"
              value={client?.phone}
              InputLabelProps={{
                shrink: client?.phone ? true : false,
              }}
            />
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
          </Grid>
        </Grid>
      </form>
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

      {showModal ? (
        <Modal
          text={feedback.message}
          type={feedback.type ? "modalSucess" : "modalError"}
        />
      ) : (
        ""
      )}
    </div>
  );
};

export default RegisterClient;
