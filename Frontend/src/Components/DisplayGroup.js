import React, { useEffect, useState } from "react";
import LeftNavBar from "./LeftNavBar/LeftNavBar";
import Navbar from "react-bootstrap/Navbar";
import bg_image0 from "./assets/login_logo.png";
import { useSelector } from "react-redux";
import NavDropdown from "react-bootstrap/NavDropdown";
import Dropdown from "react-bootstrap/Dropdown";
import Select from "react-select";
import { useHistory, useLocation } from "react-router-dom";
const queryString = require("query-string");
import Axios from "axios";
import {
  Nav,
  Row,
  Col,
  Button,
  Card,
  Container,
  ListGroup,
  Modal,
  Form,
} from "react-bootstrap";

function DisplayGroup() {
  const location = useLocation();
  const isLogged = useSelector((state) => state.isLogged.username);
  const user_name = isLogged;
  console.log(user_name);
  const history = useHistory();
  const parsed = queryString.parse(location.search);
  const email = parsed.email;
  const groupName = parsed.groupname;
  console.log(email);
  console.log(groupName);
  const [member_names, setMembers] = useState([]);

  const [show, setShow] = useState(false);
  const [groups, setGroups] = useState([]);
  const [amount, setAmount] = useState(0);
  const [description, setDescription] = useState("");
  const [bills, setBills] = useState([]);
  const no_of_members = member_names.length;
  console.log(no_of_members);

  const handleClose = () => {
    setShow(false);
  };

  const handleSaveChanges = () => {
    AddBill(email, groupName, no_of_members);
  };

  const AddBill = (email, group, membercount) => {
    Axios.post("http://localhost:3001/addBill", {
      user: email,
      billData: description,
      amount: amount,
      group: group,
      members: member_names,
    })
      .then((response) => {
        // eslint-disable-next-line no-console
        console.log(response.data);
        // fetchBills(group).then((result) => {
        //   console.log(result);
        //   setBills([]);
        //   setBills(result);
        // });
        setShow(false);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  // function fetchBills(group) {
  //   return new Promise((resolve, reject) => {
  //     Axios.get("http://localhost:3001/fetchBills/" + group)
  //       .then((response) => {
  //         // eslint-disable-next-line no-console
  //         console.log(response.data);
  //         resolve(response.data);
  //       })
  //       .catch((e) => {
  //         console.log(e);
  //       });
  //   });
  // }

  const handleShow = () => setShow(true);

  useEffect(() => {
    Axios.post("http://localhost:3001/allMembers", {
      groupname: groupName,
      email: email,
    })
      .then((response) => {
        console.log(response);
        let values = [];
        // response.data.forEach((ele) => {
        //   console.log(ele);
        //   values.push(ele.email);

        // });
        setMembers(response.data);
      })
      .catch((e) => {
        console.log(e);
      });
    console.log(member_names);

    // fetchBills(groupName).then((result) => {
    //   console.log(result);
    //   setBills([]);
    //   setBills(result);
    // });
  }, [location]);

  return (
    <div>
      <div className="displaygroup">
        <Navbar bg="success" expand="lg">
          <Navbar.Brand href="#home">
            <img src={bg_image0} width="50" height="50"></img>
          </Navbar.Brand>
          <Nav className="mr-auto">
            <Nav.Link href="#home" />
          </Nav>
          <Dropdown>
            <Dropdown.Toggle variant="info" id="dropdown-basic">
              {user_name}
            </Dropdown.Toggle>
            <Dropdown.Menu>
              <Dropdown.Item href="/landing">Logout</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </Navbar>
        {/* <NavDropdown variant="info" title={isLogged} id="basic-nav-dropdown">
          <NavDropdown.Item href="/landing">Logout</NavDropdown.Item>
        </NavDropdown> */}
        {/* <div className="row">
          <center>
            <h1>Groups Page {groupName}</h1>
          </center>
        </div> */}
        <div className="row">
          <Card
            bg="light"
            className="display_modal_bar"
            style={{ width: "100rem" }}
          >
            <Card.Header>
              <div className="row">
                <div className="col-md-11">
                  <h3>Group Name {groupName}</h3>
                </div>
                <div className="col-md-1">
                  <Button variant="primary" onClick={handleShow}>
                    Add Bill
                  </Button>
                </div>
              </div>
            </Card.Header>
          </Card>
        </div>
        <br></br>
        <br></br>
        <div className="row">
          <ListGroup>
            {member_names.map((item) => (
              <ListGroup.Item>{item.user_email}</ListGroup.Item>
            ))}
          </ListGroup>
        </div>
        <div className="row">
          <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
              <Modal.Title>Add a Bill</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <Form>
                <Form.Group controlId="formBasicEmail">
                  <Form.Label>Description</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter description"
                    onChange={(e) => {
                      setDescription(e.target.value);
                    }}
                  />
                </Form.Group>
                <Form.Group controlId="formBasicEmail">
                  <Form.Label>Amount</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter amount"
                    onChange={(e) => {
                      setAmount(e.target.value);
                    }}
                  />
                </Form.Group>
              </Form>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={handleClose}>
                Close
              </Button>
              <Button variant="primary" onClick={handleSaveChanges}>
                Save Changes
              </Button>
            </Modal.Footer>
          </Modal>
          <ListGroup>
            {bills.map((bill) => (
              <ListGroup.Item
                key={bill.amount}
                className="links-dashboard-groups"
              >
                amt:{bill.amount}
              </ListGroup.Item>
            ))}
          </ListGroup>
        </div>
      </div>
    </div>
  );
}

export default DisplayGroup;
