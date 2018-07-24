import React from "react";
import "./Nav.css";
// import Logo from "../../assets/growHausLogo.png"
import LogOut from "../../assets/signOut.png"
import Upload from "../../assets/upload.png"


const Nav = (prop) => (
  <nav className="navbar navbar-expand-lg">
    <img src={Upload} alt="" height="40" width="40" className="icon" />
    <a href="/">
      <img src={LogOut} alt="" height="40" width="40" className="icon" />
    </a> 
  </nav>
);

export default Nav;
