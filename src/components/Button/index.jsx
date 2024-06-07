import "./style.css";

function Button({ event, text }) {
  return (
    <button className="btn" onClick={event}>
      {text}
    </button>
  );
}

export default Button;
