import "./App.css";
import NavBar from "./components/NavBar";
import { Outlet } from "react-router-dom";
import Auth from "./pages/Auth";
import Index from "./pages/Index";
import { useState, useEffect } from "react";

function App() {
  const [login, setLogin] = useState(false);

  useEffect(() => {
    // Verificar se há informações de autenticação no localStorage
    const storedToken = localStorage.getItem("token");
    if (storedToken) {
      // Definir login como true se houver informações de autenticação armazenadas
      setLogin(true);
    }
  }, []);

  return (
    <div>
      {login ? (
        <div className="container">
          <NavBar />
          <div className="content">
            <Outlet />
          </div>
        </div>
      ) : (
        <Index />
      )}
    </div>
  );
}

export default App;
