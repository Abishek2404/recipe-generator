import { Link, useLocation } from "react-router-dom";

function Navbar() {
  const location = useLocation();

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/" className="navbar-logo">
          <span className="logo-icon"></span>
          AI Recipe Generator
        </Link>
        <div className="navbar-links">
          <Link to="/" className={`nav-link${location.pathname === "/" ? "active" : ""}`}>
            Home
          </Link>
          <Link to="/saved" className={`nav-link${location.pathname === "/saved" ? "active" : ""}`}>
            Saved Recipes
          </Link>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;