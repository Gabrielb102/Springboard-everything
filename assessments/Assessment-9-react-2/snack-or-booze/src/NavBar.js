import React from "react";
import "./static/NavBar.css";
import { NavLink } from "react-router-dom";
import { Navbar, Nav, NavItem } from "reactstrap";

function NavBar({options}) {

  const links = []

  let n = 0;

  for (let option of options) {
    const path = `/${option}`
    links.push(
      <NavItem>
        <NavLink to={path}>{option}</NavLink>
      </NavItem>

    )
  }

  return (
    <div>
      <Navbar expand="md">
        <NavLink exact to="/" className="navbar-brand">
          Snack or Booze
        </NavLink>

        <Nav className="ml-auto" navbar>
          {links}
        </Nav>
      </Navbar>
    </div>
  );
}

export default NavBar;
