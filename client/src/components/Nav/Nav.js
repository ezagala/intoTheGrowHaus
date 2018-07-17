import React from "react";
import "./Nav.css";


const Nav = (prop) => (
  <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
    <a className="navbar-brand" href="/">
      NYT Article Curator
    </a>

    <button className="btn btn-light">
      <a href="/Saved">
        Saved
            </a>
    </button>
  </nav>
);

export default Nav;
