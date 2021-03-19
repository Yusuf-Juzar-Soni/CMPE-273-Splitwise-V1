import React, { useEffect, useState } from "react";
import LeftNavBar from "./LeftNavBar/LeftNavBar";
import Navbar from "react-bootstrap/Navbar";
import bg_image0 from "./assets/login_logo.png";
import Nav from "react-bootstrap/Nav";
import { useSelector } from "react-redux";
import NavDropdown from "react-bootstrap/NavDropdown";
import Dropdown from "react-bootstrap/Dropdown";
import Select from "react-select";
import { useHistory, useLocation } from "react-router-dom";
const queryString = require("query-string");
import Axios from "axios";
import TopNavBar from "./TopNavBar";
import {
  Button,
  Grid,
  Row,
  Col,
  ListGroup,
  Form,
  Card,
  Modal,
} from "react-bootstrap";

function Invites() {
  const location = useLocation();
  const isLogged = useSelector((state) => state.isLogged.username);
  const history = useHistory();
  const parsed = queryString.parse(location.search);
  const email = parsed.email;
  const [inviteList, SetInviteList] = useState([]);
  const [inviteMessage, SetInviteMessage] = useState("");
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = (groupName) => {
    localStorage.setItem("selectedGroupName", groupName);
    setShow(true);
  };
  const loadSuccessful = (email) => {
    history.push({
      pathname: "/dash",
      search: `?email=${email}`,
    });
  };

  //

  useEffect(() => {
    function getInviteList() {
      Axios.get("http://localhost:3001/getInvites/" + email).then(
        (response) => {
          console.log(response.data.group_list.length);
          if (response.data.group_list.length === 0) {
            console.log("NO INVITES");
            SetInviteMessage("NO INVITATIONS");
          }
          SetInviteList(response.data.group_list);
        }
      );
    }
    getInviteList();
  }, [location]);

  const handleAccept = (e) => {
    const selectedgroup = localStorage.getItem("selectedGroupName");

    console.log(selectedgroup);

    e.preventDefault();

    console.log("hello");
    Axios.post("http://localhost:3001/acceptInvite", {
      user: email,
      selectedgroup: selectedgroup,
    }).then((response) => {
      console.log(response.data);
      setShow(false);
      loadSuccessful(email);
    });
  };

  return (
    <div>
      <div className="creategroup">
        <div>
          <TopNavBar />
        </div>
        <div className="row">
          <div div className="col-md-2">
            <LeftNavBar />
          </div>
          <div div className="col-md-10">
            <div class="container">
              <h3>YOU ARE INVITED TO FOLLOWING GROUPS</h3>
              {inviteMessage}
              {inviteList.map((item) => (
                <div>
                  <Button
                    onClick={(e) => handleShow(e.currentTarget.value)}
                    variant="warning"
                    value={item}
                    key={item}
                  >
                    {item}
                    <br />
                  </Button>

                  <Modal show={show} onHide={handleClose}>
                    <Modal.Header closeButton>
                      <Modal.Title>INVITATION</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                      Accept the invite to this group
                      {localStorage.getItem("selectedGroupName")}
                    </Modal.Body>
                    <Modal.Footer>
                      <Button
                        variant="primary"
                        value={item}
                        type="submit"
                        onClick={(e) => handleAccept(e)}
                      >
                        ACCEPT
                      </Button>
                    </Modal.Footer>
                  </Modal>

                  <br />
                  <br />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Invites;
