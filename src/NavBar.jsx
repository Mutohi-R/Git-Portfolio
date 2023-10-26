import { useState } from "react";
import { Outlet, Link } from "react-router-dom";
import PropTypes from 'prop-types'
import { FaBars, FaMoon, FaSun } from "react-icons/fa";

import "./Styles/navbar.css";

const NavBar = ({isDarkMode, toggleDarkMode}) => {

  const [isMenuOpen, setIsMenuOpen] = useState(false)

  

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  return (
    <header>
      <nav className={isDarkMode ? 'nav-dark' : 'nav-light'}>
        
        <h1 className={`prevent-select ${isDarkMode ? 'logo-dark' : 'logo'}`}>My Git Repos</h1>
        <FaBars className={isDarkMode ? 'hamburger-dark' : 'hamburger'} onClick={toggleMenu}/>
        <aside className={isDarkMode ? 'links-dark' : 'links'}>
          <Link to="/" className={isDarkMode ? 'link-dark' : 'link'}>
            Home
          </Link>
          <Link to="/repolist" className={isDarkMode ? 'link-dark' : 'link'}>
            Repos
          </Link>
          <Link to="/errorpage" className={isDarkMode ? 'link-dark' : 'link'}>
            Errors
          </Link>
        </aside>
        {isMenuOpen ? <aside className={isDarkMode ? 'links-menu-dark' : 'links-menu'}>
          <Link to="/" className={isDarkMode ? 'link1-dark' : 'link1'} onClick={closeMenu}>
            Home
          </Link>
          <Link to="/repolist" className={isDarkMode ? 'link1-dark' : 'link1'} onClick={closeMenu}>
            Repos
          </Link>
          <Link to="/errorpage" className={isDarkMode ? 'link1-dark' : 'link1'} onClick={closeMenu}>
            Errors
          </Link>
        </aside> : null}
      </nav>
      {!isDarkMode ? <FaMoon onClick={toggleDarkMode} className="mode" style={{color: '#48216c'}}/> : <FaSun onClick={toggleDarkMode} className="mode" style={{color:'#b269f5'}}/>}
      <Outlet />
    </header>
  );
};

NavBar.propTypes = {
  isDarkMode: PropTypes.bool.isRequired, // isDarkMode is a required boolean prop
  toggleDarkMode: PropTypes.func.isRequired, // toggleDarkMode is a required function prop
};

export default NavBar;
