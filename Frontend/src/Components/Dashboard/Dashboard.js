import { React } from "react";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import { useSelector } from "react-redux";
import NavDropdown from "react-bootstrap/NavDropdown";
import Dropdown from "react-bootstrap/Dropdown";
import "./Dashboard.css";
import bg_image0 from "../assets/login_logo.png";
import LeftNavBar from "../LeftNavBar/LeftNavBar";
import TopNavBar from "../TopNavBar";

const Dashboard = function () {
  const isLogged = useSelector((state) => state.isLogged.username);
  console.log("hello");
  return (
    <div className="dashboard">
      <div>
        <TopNavBar />
      </div>

      {/* <Navbar bg="success" expand="lg">
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
            <Dropdown.Item href="/landing">Logout</Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      </Navbar> */}
      
      <div className="row">
        <div div className="col-md-4">
          <LeftNavBar />
        </div>
        <div div className="col-md-4">
          Column 2
        </div>
        <div div className="col-md-4">
          Column 3
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
