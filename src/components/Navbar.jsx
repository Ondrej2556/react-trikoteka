import { NavLink } from "react-router-dom";
import { useState } from "react";

const Navbar = ({isAdmin}) => {
  const [isLoggedIn, setIsLoggedIn] = useState(true);

  return (
    <nav>
      <div className="navbar">
        <div>
          <NavLink to="/">
            <img src="/images/logo.png" />
          </NavLink>
        </div>
        <div className="navbar-items">
          {isLoggedIn ? (
            <>
            <NavLink to="/product">Produkty</NavLink>
            <NavLink to="/commission">Provize</NavLink>
            {isAdmin && <NavLink to="/product-approval">Produkty na schválení</NavLink>}
            </>
          ) : (
            <>
            <NavLink to="/register">Register</NavLink>
            <NavLink to="/login">Login</NavLink>
            </>
          )
          }
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
