import { Link } from "react-router-dom";
import "./navbar.scss";

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="title">
        <h1>Supa Smoothies</h1>
      </div>
      <div className="links">
        <Link to="/">Home</Link>
        <Link to="/create">Create New Smoothie</Link>
      </div>
    </nav>
  );
};

export default Navbar;
