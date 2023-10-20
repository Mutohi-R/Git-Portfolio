import { Outlet, Link } from "react-router-dom";

import "./Styles/navbar.css";

const NavBar = () => {
  return (
    <section>
      <nav>
        <h1 className="logo prevent-select">My Git Repos</h1>
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
      </nav>
      <Outlet />
    </section>
  );
};

export default NavBar;
