import { Link } from "react-router-dom";
import "./Header.css";

export default function Header() {
  return (
    <header className="site-header">
      <div className="header-container">
        <div className="logo">
          <Link to="/">Aerolíneas</Link>
        </div>
        <nav className="nav-links">
          <Link to="/">Home</Link>
          <Link to="/vuelos">Vuelos</Link>
          <Link to="/hoteles">Hoteles</Link>
          <Link to="/paquetes">Paquetes</Link>
          <Link to="/login">Login</Link>
        </nav>
      </div>
    </header>
  );
}
