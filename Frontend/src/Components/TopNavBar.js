import React from "react";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import Dropdown from "react-bootstrap/Dropdown";
import { useHistory } from "react-router-dom";
import { ListGroup, Button } from "react-bootstrap";
import { useSelector } from "react-redux";
const queryString = require("query-string");
import { useLocation } from "react-router-dom";
import bg_image0 from "./assets/login_logo.png";

function TopNavBar() {
  const history = useHistory();
  const location = useLocation();
  const parsed = queryString.parse(location.search);
  const isLogged = useSelector((state) => state.isLogged.username);

  function redirectToProfile(emailId) {
    history.push({
      pathname: "/profile",
      search: `?email=` + emailId,
    });
  }
  return (
    <div>
      <Navbar bg="success" expand="lg">
        <Navbar.Brand href="#home">
          <img src={bg_image0} width="50" height="50"></img>
        </Navbar.Brand>
        <Nav className="mr-auto">
          <Nav.Link href="#home" />
        </Nav>
        <Dropdown>
          <Dropdown.Toggle variant="info" id="dropdown-basic">
            {isLogged}
          </Dropdown.Toggle>
          <Dropdown.Menu>
            <Dropdown.Item onClick={(event) => redirectToProfile(parsed.email)}>
              Profile
            </Dropdown.Item>
            <Dropdown.Item href="/landing">Logout</Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      </Navbar>
    </div>
  );
}

export default TopNavBar;
