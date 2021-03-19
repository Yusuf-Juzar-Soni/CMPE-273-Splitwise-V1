import React, { useEffect, useState } from "react";
import LeftNavBar from "./LeftNavBar/LeftNavBar";
import Navbar from "react-bootstrap/Navbar";
import bg_image0 from "./assets/login_logo.png";
import Nav from "react-bootstrap/Nav";
import { useSelector } from "react-redux";
import NavDropdown from "react-bootstrap/NavDropdown";
import Dropdown from "react-bootstrap/Dropdown";
import Select from "react-select";
import { useHistory } from "react-router-dom";
const queryString = require("query-string");
import Axios from "axios";
import TopNavBar from "./TopNavBar";
import backendServer from "../webConfig";
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
import "./CreateGroup.css";

function CreateGroup() {
  const isLogged = useSelector((state) => state.isLogged.username);
  const history = useHistory();
  const parsed = queryString.parse(location.search);
  let email = parsed;
  const [form, setForm] = useState([]);
  const [group, setGroup] = useState("");
  const [flag, setFlag] = useState(false);
  const [user, setUsers] = useState([]);
  const [members, setMembers] = useState([]);
  const [alert, setAlert] = useState([]);
  const [count, setCount] = useState(0);
  const [emailId, setEmail] = useState([email.email]);

  useEffect(() => {
    console.log(email.email);
    Axios.get(`${backendServer}/allUsers/` + email.email)
      .then((response) => {
        console.log(response);
        let data = [];

        response.data.forEach((ele) => {
          console.log(ele);

          data.push({
            label: ele.username + " ( " + ele.user_email + " )",
            value: ele.user_email,
          });
          setUsers(data);
        });
      })
      .catch((e) => {
        console.log(e);
      });
    console.log(user);
  }, []);

  const handleClickDashboard = () => {
    history.push({
      pathname: "/dash",
      search: "?email=" + parsed.email,
    });
  };

  const dashboard = () => {
    handleClickDashboard();
  };

  const onSubmit = (e) => {
    e.preventDefault();
    console.log(members);
    let finalMembers = [];
    finalMembers = members.map((member) => member.value);

    Axios.post("http://localhost:3001/createGroup", {
      groupName: group,
      user: emailId,
      members: finalMembers,
    })
      .then((response) => {
        console.log(response);
        // setUsers(response.data);
      })
      .catch((e) => {
        if (e.response && e.response.data) {
          console.log(e.response.data.message); // some reason error message
          setAlert(e.response.data.message);
        }
      });
    dashboard();
  };

  const onChange = (opt) => {
    if (opt == null || opt == "undefined") {
      opt = "";
    }
    setMembers((prev) => [...opt]);
    console.log(members);
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
            <div className="row">
              <div className="col-md-10">
                <div className="mytitle" style={{ fontSize: 30 }}>
                  <center>
                    <b>ADD A GROUP</b>
                  </center>
                </div>
                <form>
                  <div className="form-group inputLogin">
                    <label for="groupName">
                      <b>Group Name</b>
                    </label>
                    <input
                      type="text"
                      class="form-control"
                      id="groupName"
                      aria-describedby="emailHelp"
                      placeholder="Enter Group Name"
                      onChange={(e) => {
                        setGroup(e.target.value);
                      }}
                    />
                  </div>
                  <div className="form-group inputLogin">
                    <label for="emailOfGroupMembers">
                      <b>Email ID of group members</b>
                    </label>
                    <Select
                      onChange={(opt) => onChange(opt)}
                      options={user}
                      isMulti
                    />
                  </div>
                  <Button className="button-create" onClick={onSubmit}>
                    Create a group
                  </Button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CreateGroup;
