import { IoExitOutline } from "react-icons/io5";
import { BiSolidHome } from "react-icons/bi";
import { FaCartShopping } from "react-icons/fa6";
import { BiMenu } from "react-icons/bi";
import { useState } from "react";
import { FaX } from "react-icons/fa6";
import { Link } from "react-router-dom";
import { BiSolidTruck } from "react-icons/bi";
import { FaUser } from "react-icons/fa6";
import { BiSolidUserDetail } from "react-icons/bi";

import "./style.css";

const NavBar = () => {
  let [showMenu, setShowMenu] = useState(true);

  const handleShowMenu = () => {
    setShowMenu = !showMenu;
  };

  return (
    <>
      <input type="checkbox" id="navShow" className="navShow" />
      <div className="navBar">
        <label
          htmlFor="navShow"
          className="menuIcon"
          checked={showMenu}
          onChange={handleShowMenu}
        >
          {showMenu ? <BiMenu /> : <FaX />}
        </label>
        <ul>
          <Link to="/">
            <li>
              <span className="navIcon">
                <BiSolidHome />
              </span>
              <span className="navDesc">Home</span>
            </li>
          </Link>
          <Link to="/ClientList">
            <li>
              <span className="navIcon">
                <FaUser />
              </span>
              <span className="navDesc">Clientes</span>
            </li>
          </Link>
          <Link to="/ProductList">
            <li>
              <span className="navIcon">
                <FaCartShopping />
              </span>
              <span className="navDesc">Produtos</span>
            </li>
          </Link>
          <Link to="/Orders">
            <li>
              <span className="navIcon">
                <BiSolidTruck />
              </span>
              <span className="navDesc">Pedidos</span>
            </li>
          </Link>
          <Link to="/User">
            <li>
              <span className="navIcon">
                <BiSolidUserDetail />
              </span>
              <span className="navDesc">Perfil</span>
            </li>
          </Link>

          <li>
            <span className="navIcon">
              <IoExitOutline />
            </span>
            <span className="navDesc">Sair</span>
          </li>
        </ul>
      </div>
    </>
  );
};

export default NavBar;
