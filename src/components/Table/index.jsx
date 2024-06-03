import "./style.css";
import { BiSolidEdit } from "react-icons/bi";

const Table = ({ dados, headers }) => {
  return (
    <table className="tableComponent">
      <thead>
        <tr>
          {Array.isArray(headers) ? (
            headers.map((header, index) => <th key={index}>{header}</th>)
          ) : (
            <td colSpan="3">Nenhum Header Informado</td>
          )}
        </tr>
      </thead>
      <tbody>
        {Array.isArray(dados) && dados.length > 0 ? (
          dados.map((p, index) => (
            <tr key={index}>
              <td>{p.name}</td>
              <td>{p.amount}</td>
              <td>{p.price}</td>
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
