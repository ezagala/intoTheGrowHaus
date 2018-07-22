import React from "react";
import "./Nav.css";
import Logo from "../../assets/growHausLogo.png"
import LogOut from "../../assets/signOut.png"
import Upload from "../../assets/upload.png"


const Nav = (prop) => (
  <nav className="navbar navbar-expand-lg">
    <img src={Upload} height="40" width="40" className="icon" />
    <img src={LogOut} height="40" width="40" className="icon" />
  </nav>
);

export default Nav;
