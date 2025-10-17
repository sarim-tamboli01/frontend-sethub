import React from "react";
import { Link } from "react-router-dom";
import "./Navbar.css"

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="nav-inner">
        <Link to="/" className="brand">
          <img
            src="https://www.github.com/images/modules/logos_page/GitHub-Mark.png"
            alt="git logo"
          />
          <h3>Sethub</h3>
        </Link>
        <ul className="menu">
          <li>
            <Link to="/create" className="menu-link">
              <span>Create a Repository</span>
            </Link>
          </li>
          <li>
            <Link to="/profile" className="menu-link">
              <span>Profile</span>
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
