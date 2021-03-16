// import { React, useState, useEffect } from "react";
// import axios from "axios";
// import Navbar from "react-bootstrap/Navbar";
// import Button from "react-bootstrap/Button";
// import { useHistory, useLocation } from "react-router-dom";
// import Nav from "react-bootstrap/esm/Nav";
// import MyGroupList from "../MyGroupList";

import { React, useEffect, useState } from "react";
import Nav from "react-bootstrap/Nav";
import axios from "axios";
import { useHistory } from "react-router-dom";
import { ListGroup, Button } from "react-bootstrap";
import { useSelector } from "react-redux";
const queryString = require("query-string");
import { useLocation } from "react-router-dom";

function LeftNavBar() {
  const history = useHistory();
  const emailID = useSelector((state) => state.isLogged.email);
  console.log(emailID);
  const [group_names, group_namesChange] = useState([]);
  const location = useLocation();
  const parsed = queryString.parse(location.search);
  function retriveGroups(user_email1) {
    const user_email = { email: user_email1 };
    axios
      .post("http://localhost:3001/dashboard", user_email)
      .then((response) => {
        console.log(response.data);
        group_namesChange(response.data);
        console.log(group_names);
      })
      .catch((err) => {
        if (err.response && err.response.data) {
          alert(err.response.data.message);
        }
      });
  }

  function redirectToGroup(redirectGroup, emailId) {
    history.push({
      pathname: "/groupsdisplay",
      search: `?groupname=` + redirectGroup + `&email=` + emailId,
    });
  }

  function redirectToDashboard(emailId) {
    history.push({
      pathname: "/dash",
      search: `?email=${emailId}`,
    });
  }

  function redirectToCreate(emailId) {
    history.push({
      pathname: "/creategroup",
      search: `?email=${emailId}`,
    });
  }

  function redirectToActivity(emailId) {
    history.push({
      pathname: "/activitydisplay",
      search: `?email=${emailId}`,
    });
  }

  useEffect(() => {
    retriveGroups(parsed.email);
  }, [location]);

  return (
    <div>
      <div>
        <Nav defaultActiveKey="/home" className="flex-column">
          <Nav.Link onClick={(event) => redirectToDashboard(parsed.email)}>
            Dashboard
          </Nav.Link>
          <Nav.Link onClick={(event) => redirectToActivity(parsed.email)}>
            Activity
          </Nav.Link>
          <Nav.Link>Groups</Nav.Link>
          <ListGroup>
            {group_names.map((item) => (
              <Button
                value={item}
                key={item}
                variant="link"
                onClick={(event) =>
                  redirectToGroup(event.currentTarget.value, parsed.email)
                }
              >
                {item}
              </Button>
            ))}
          </ListGroup>
          <Nav.Link onClick={(event) => redirectToCreate(parsed.email)}>
            Create Group
          </Nav.Link>
        </Nav>
      </div>
    </div>
  );
}
export default LeftNavBar;
