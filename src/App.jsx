import "./App.css";
import NavBar from "./components/NavBar";
import { Outlet } from "react-router-dom";
import Auth from "./pages/Auth";
import { useState } from "react";

function App() {
  const [login, setLogin] = useState(false);
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
        <Auth setLogin={setLogin} />
      )}
    </div>

    // <div className="container">
    //   <NavBar />
    //   <div className="content">
    //     <Outlet />
    //   </div>
    // </div>
  );
}

export default App;
