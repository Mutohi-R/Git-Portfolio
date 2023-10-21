import { useState } from "react";
import { Outlet, Link } from "react-router-dom";
import { FaBars } from "react-icons/fa";

import "./Styles/navbar.css";

const NavBar = () => {

  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  return (
    <header>
      <nav>
        <h1 className="logo prevent-select">My Git Repos</h1>
        <FaBars className="hamburger" onClick={toggleMenu}/>
        <aside className="links">
          <Link to="/" className="link">
            Home
          </Link>
          <Link to="/repolist" className="link">
            Repos
          </Link>
          <Link to="/errorpage" className="link">
            Errors
          </Link>
        </aside>
        {isMenuOpen ? <aside className="links-menu">
          <Link to="/" className="link1" onClick={closeMenu}>
            Home
          </Link>
          <Link to="/repolist" className="link1" onClick={closeMenu}>
            Repos
          </Link>
          <Link to="/errorpage" className="link1" onClick={closeMenu}>
            Errors
          </Link>
        </aside> : null}
      </nav>
      <Outlet />
    </header>
  );
};

export default NavBar;
