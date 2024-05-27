import Card from "../../components/Card";
import "./style.css";
import { Link } from "react-router-dom";
import Button from "../../components/Button";
import { BiSolidTrashAlt } from "react-icons/bi";
import { useEffect, useState } from "react";
import { API_URL, USER_ID } from "../../config/api";

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const URL = API_URL;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          URL + `/product/company/${USER_ID.id_company}`
        );
        if (!response.ok) {
          throw new Error("Erro ao obter os Dados");
        }
        const jsonData = await response.json();
        setProducts(jsonData);
      } catch (e) {
        console.log(e);
      }
    };

    fetchData();
  }, []);

  return (
    <>
      <div className="head">
        <h1>Produtos</h1>
        <Link to="registerProduct">
          <Button text="Cadastrar Novo Produto" />
        </Link>
      </div>

      <div className="productList">
        {products.map((product) => (
          <Card
            key={product.id}
            title={product.name}
            textBtn="Editar"
            iconBtn={<BiSolidTrashAlt />}
          />
        ))}
      </div>
    </>
  );
};

export default ProductList;
