import { NavLink } from "react-router-dom";

const Navbar = () => {
  return (
    <nav>
      <div className="navbar">
        <div>
          <NavLink to="/">
            <img src="/images/logo.png" />
          </NavLink>
        </div>
        <div className="navbar-items">
          <NavLink to="/register">Register</NavLink>
          <NavLink to="/login">Login</NavLink>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
