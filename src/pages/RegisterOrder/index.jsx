//Icons:
import { BiSolidUser } from "react-icons/bi";
import { BiPlusMedical } from "react-icons/bi";

//Components:
import Input from "../../components/Input";
import { useEffect, useState } from "react";
import Button from "../../components/Button";
import Table from "../../components/Table";

//Config:
import { API_URL, USER_ID } from "../../config/api";
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";

const RegisterOrder = () => {
  const URL = API_URL;

  //Estado para os itens que irão vir da API
  const [productBd, setProductBd] = useState([]);
  const [clientBd, setClientBd] = useState([]);

  // Estados para os objetos selecionados
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [selectedAmount, setSelectedAmount] = useState(null);
  const [selectedClient, setSelectedClient] = useState(null);

  // Produtos No Pedido:
  const [productOrder, setProductOrder] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch(
          URL + `/product/company/${USER_ID.id_company}`
        );

        const jsonData = await response.json();
        setProductBd(jsonData);
      } catch (error) {
        return console.log(error);
      }
    };

    const fetchClients = async () => {
      try {
        const response = await fetch(
          URL + `/client/company/${USER_ID.id_company}`
        );
        const jsonData = await response.json();
        setClientBd(jsonData);
      } catch (error) {
        console.log(error);
      }
    };

    fetchClients();
    fetchProducts();
  }, []);

  const handleClientChange = (event, newValue) => {
    if (newValue != null) {
      setSelectedClient(newValue);
      console.log(newValue.id);
      setOrder({ ...order, id_client: newValue.id });
    } else {
      console.log("Nada Selecionado");
    }
  };

  const [order, setOrder] = useState({});
  const [product, setProduct] = useState([]);

  // Função para atualizar o produto selecionado
  const handleProductChange = (event, newValue) => {
    if (newValue != null) {
      setSelectedProduct({
        ...selectedProduct,
        id_product: newValue.id,
        name: newValue.name,
      });
    } else {
      console.log("Nada Selecionado");
    }
  };

  const getAmount = (event) => {
    setSelectedAmount({ amount: event.target.value });
  };

  const addProduct = (event) => {
    event.preventDefault();
    if (selectedProduct && selectedAmount) {
      const newProduct = { ...selectedProduct, ...selectedAmount };
      setProduct((prevList) => [...prevList, newProduct]); // Adiciona o novo produto à lista
    }
  };

  const saveOrder = (event) => {
    event.preventDefault();
    console.log("Pedido Salvo", product);
  };

  // Input: icon, inptType, inptId, min, textLbl, getDados, name, value
  return (
    <div className="containerBox">
      <form>
        <h1>Registrar Pedido</h1>
        <br />
        <hr />
        <h3>Dados do Pedido</h3>
        <div>
          <Autocomplete
            id="product"
            options={clientBd}
            getOptionLabel={(client) =>
              client && client.name ? client.name : ""
            }
            value={selectedClient}
            onChange={handleClientChange}
            renderInput={(params) => (
              <TextField {...params} label="Cliente" variant="outlined" />
            )}
          />
        </div>

        <hr />
        <h3>Produtos do Pedido</h3>

        <div>
          <Autocomplete
            id="product"
            options={productBd}
            getOptionLabel={(product) =>
              product && product.name ? product.name : ""
            }
            value={selectedProduct}
            onChange={handleProductChange}
            renderInput={(params) => (
              <TextField {...params} label="Produto" variant="outlined" />
            )}
          />
        </div>

        <Input
          icon={<BiPlusMedical />}
          inptType="number"
          min="1"
          inptId="amount"
          textLbl="Quantidade"
          name="amount"
          getDados={getAmount}
        />
        <div className="buttonsForm">
          <Button text="Adicionar" event={addProduct} />
          <Button text="Salvar" event={saveOrder} />
        </div>
      </form>

      <br />
      <div>
        <Table dados={product} headers={["Nome", "Quantidade", "Ação"]} />
      </div>
    </div>
  );
};

export default RegisterOrder;
