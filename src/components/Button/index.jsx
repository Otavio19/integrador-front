import "./style.css";

function Button(props) {
  return (
    <button className="btn" onClick={props.event}>
      {props.text}
    </button>
  );
}

export default Button;
