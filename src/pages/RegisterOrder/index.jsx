//Icons:
import { BiPlusMedical } from "react-icons/bi";
import { FaUser } from "react-icons/fa6";
import { FaRegUser } from "react-icons/fa6";

//Components:
import Input from "../../components/Input";
import { useEffect, useState } from "react";
import Button from "../../components/Button";
import Table from "../../components/Table";
import { Grid } from "@mui/material";
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";

//Config:
import { API_URL, USER_ID } from "../../config/api";
import { Link, useParams } from "react-router-dom";

const RegisterOrder = () => {
  const { id } = useParams();
  //Pedido completo:
  const [orderComplete, setOrderComplete] = useState({});

  useEffect(() => {
    const fetchOrder = async () => {
      if (id) {
        fetch(`${API_URL}/orderProduct/products/${id}`)
          .then((response) => {
            if (!response.ok) {
              throw new Error("API Não Respondendo (Pedido Completo)");
            }
            return response.json();
          })
          .then((order) => {
            setOrderComplete(order);
          });
      } else {
        console.log("SEM ID NA URL: ", id);
      }
    };

    fetchOrder();
  }, []);

  //Produtos e Clientes no Banco
  const [productsBd, setProductsBd] = useState([]);
  const [clientsBd, setClientsBd] = useState([]);
  const [sellersBd, setSellersBd] = useState([]);

  const userLogged = localStorage.getItem("user");
  const userJson = JSON.parse(userLogged);

  //Dados do Formúlario
  const [selectedClient, setSelectedClient] = useState();
  const [selectedSeller, setSelectedSeller] = useState();
  const [selectedProduct, setSelectedProduct] = useState();
  const [selectedAmount, setSelectedAmount] = useState();
  const [price, setPrice] = useState(0);

  //Lista de Produto no pedido
  const [listProduct, setListProduct] = useState([]);
  const [orderInfo, setOrderInfo] = useState();

  useEffect(() => {
    const fetchClient = async () => {
      fetch(`${API_URL}/client/company/${userJson.id_company}`)
        .then((response) => {
          if (!response.ok) {
            throw new Error("API Não Respondendo (Clientes)");
          }
          return response.json();
        })
        .then((clients) => {
          setClientsBd(clients.filter((client) => client.active === true));
        })
        .catch((error) => console.error("(Clientes) Erro: ", error));
    };

    const fetchProduct = () => {
      fetch(`${API_URL}/product/company/${USER_ID.id_company}`)
        .then((response) => {
          if (!response.ok) {
            throw new Error("API não Respondendo (Produtos)");
          }
          return response.json();
        })
        .then((products) => setProductsBd(products))
        .catch((error) => console.error("(Produtos) Erro: ", error));
    };

    const fetchSeller = () => {
      fetch(`${API_URL}/user/company/${USER_ID.id_company}`)
        .then((response) => {
          if (!response.ok) {
            console.error("API Não Respondendo (Vendedores)");
          }
          return response.json();
        })
        .then((seller) => setSellersBd(seller))
        .catch((error) => console.error(error));
    };

    fetchSeller();
    fetchClient();
    fetchProduct();
  }, []);

  const handleClientChange = (event, client) => {
    if (client != null) {
      setSelectedClient(client.id);
    }
  };

  const handleSellerChange = (event, seller) => {
    if (seller != null) {
      setSelectedSeller(seller.id);
    }
  };

  const handleProductChange = (event, product) => {
    if (product != null) {
      setSelectedProduct({
        id_product: product.id,
        price: product.price,
        name: product.name,
      });
    }
  };

  const getAmount = (event) => {
    setSelectedAmount(event.target.value);
  };

  const addProduct = (event) => {
    event.preventDefault();
    const newList = [...listProduct];

    newList.push({
      id_product: selectedProduct.id_product,
      price: selectedProduct.price * selectedAmount,
      amount: selectedAmount,
      name: selectedProduct.name,
    });

    var newPrice = price + selectedProduct.price * selectedAmount;
    setPrice(newPrice);
    setListProduct(newList);
  };

  const saveOrder = (event) => {
    event.preventDefault();

    const user = JSON.parse(localStorage.getItem("user"));

    setOrderInfo({
      id_seller: selectedSeller,
      id_client: selectedClient,
      id_company: user.id_company,
      price: price,
      source: "system",
    });
  };

  useEffect(() => {
    const newOrdem = { info: orderInfo, products: listProduct };

    fetch(`${API_URL}/orderProduct`, {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(newOrdem),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not Ok");
        }
        return response.json();
      })
      .then((data) => {
        console.log("Pedido Inserido:", data);
      })
      .catch((error) => {
        console.log("Erro", error);
      });
  }, [orderInfo]);

  return (
    <form className="containerBox">
      <h1>Novo Pedido</h1>
      <br />
      <Grid container spacing={2} sx={{ minWidth: 750 }}>
        <Grid item xs={4}>
          {id ? (
            <Input
              textLbl="Cliente"
              value={orderComplete?.info?.name ?? ""}
              icon={<FaRegUser />}
            />
          ) : (
            <Autocomplete
              id="client"
              options={clientsBd}
              getOptionLabel={(client) => client?.client_name ?? ""}
              value={selectedClient}
              onChange={handleClientChange}
              renderInput={(params) => (
                <TextField {...params} label="Cliente" variant="outlined" />
              )}
            />
          )}
        </Grid>
        <Grid item xs={4}>
          {id ? (
            <Input
              textLbl="Vendedor"
              icon={<FaUser />}
              value={orderComplete?.info?.name ?? ""}
            />
          ) : (
            <Autocomplete
              id="seller"
              options={sellersBd}
              getOptionLabel={(seller) => seller?.name ?? ""}
              value={selectedSeller}
              onChange={handleSellerChange}
              renderInput={(params) => (
                <TextField {...params} label="Vendedor" variant="outlined" />
              )}
            />
          )}
        </Grid>
      </Grid>
      <br />
      <h2>Produto:</h2>
      <br />
      {id ? (
        ""
      ) : (
        <div>
          <Grid container spacing={2}>
            <Grid item xs={4}>
              <Autocomplete
                id="product"
                options={productsBd}
                getOptionLabel={(product) =>
                  product && product.name ? product.name : ""
                }
                value={selectedProduct}
                onChange={handleProductChange}
                renderInput={(params) => (
                  <TextField {...params} label="Produto" variant="outlined" />
                )}
              />
            </Grid>

            <Grid item xs={4}>
              <TextField
                id="outlined-basic"
                label="Quantidade"
                variant="outlined"
                onChange={getAmount}
                value={selectedAmount}
              />
            </Grid>
          </Grid>
          <br />
          <Button text="Adicionar Produto" event={addProduct} />
        </div>
      )}

      <br />
      {id ? (
        <Table
          headers={["Nome", "Quantidade", "Preço"]}
          dados={orderComplete?.products}
        />
      ) : (
        <Table headers={["Nome", "Quantidade", "Preço"]} dados={listProduct} />
      )}
      <br />
      <div>Valor Total: {id ? orderComplete?.info?.price : price}</div>
      <br />
      {!id ? (
        <Button text="Salvar Pedido" event={saveOrder} />
      ) : (
        <Link to="/Orders">
          <Button text="Voltar" />
        </Link>
      )}
    </form>
  );
};

export default RegisterOrder;
