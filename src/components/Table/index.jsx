import "./style.css";
import { BiSolidEdit } from "react-icons/bi";

const Table = ({ dados }) => {
  return (
    <table className="tableComponent">
      <thead>
        <tr>
          <th>ID</th>
          <th>Nome</th>
          <th>Responsável</th>
        </tr>
      </thead>
      <tbody>
        {Array.isArray(dados) ? (
          dados.map((p, index) => (
            <tr key={index}>
              <td>{p.id}</td>
              <td>{p.Name}</td>
              <td>{p.Seller}</td>
            </tr>
          ))
        ) : (
          <tr>
            <td colSpan="3">Nenhum dado disponível</td>
          </tr>
        )}
      </tbody>
    </table>
  );
};

export default Table;
