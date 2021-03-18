import { React, useState } from "react";
import axios from "axios";
import alert from "alert";
import Nav from "react-bootstrap/esm/Nav";
import { useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import "./Signup";
import logged from "../actions";
import Navbar from "react-bootstrap/Navbar";
import Button from "react-bootstrap/Button";
import bg_image0 from "./assets/login_logo.png";

function Signup() {
  const [name, nameChangeHandler] = useState("");
  const [email, emailChangeHandler] = useState("");
  const [password, passwordChangeHandler] = useState("");
  const history = useHistory();

  const isLogged = useSelector((state) => state.isLoggedIn);
  const dispatch = useDispatch();

  const loadSuccessful = () => {
    history.push("/dash");
  };

  const handleClick = (emailId) => {
    history.push({
      pathname: "/dash",
      search: `?email=${emailId}`,
    });
  };

  const onSignup = (e) => {
    e.preventDefault();

    axios.defaults.withCredentials = true;

    axios
      .post("http://localhost:3001/signup", {
        name,
        email,
        password,
      })
      .then((response) => {
        console.log(response);
        console.log(isLogged);
        loadSuccessful();
        handleClick(response.data.email);
        dispatch(logged(response.data.name, response.data.email));
        handleClick(response.data.email);
      })
      .catch((err) => {
        if (err.response && err.reponse.data) {
          alert(err.response.data.message);
        }
      });
  };
  return (
    <div>
      <Navbar className="navigator" bg="success" expand="lg">
        <Navbar.Brand>
          <img src={bg_image0} width="50" height="50"></img>
        </Navbar.Brand>
        <Nav className="mr-auto">
          <Nav.Link href="#home" />
        </Nav>
        <Button variant="success" href="./login">
          Login
        </Button>
        <Button variant="success" href="./signup">
          Signup
        </Button>{" "}
      </Navbar>

      <div className="container">
        <div className="row">
          <div className="col-sm-12 .col-md-6 .offset-md-3">
            <center>
              <h4 style={{ color: "gray", fontSize: 19, marginBottom: 22 }}>
                INTRODUCE YOURSELF
              </h4>
              <form onsubmit="">
                <div class="form-group Login">
                  <label for="InputName" style={{ fontSize: 30 }}>
                    Hi there! My name is
                  </label>
                  <input
                    type="text"
                    class="form-control"
                    id="InputName"
                    placeholder="Enter  Name"
                    onChange={(e) => {
                      nameChangeHandler(e.target.value);
                    }}
                  />
                </div>
                <div class="form-group Login">
                  <label for="InputEmail">
                    Here's my <b>email address:</b>
                  </label>
                  <input
                    type="email"
                    class="form-control"
                    id="InputEmail"
                    placeholder="Enter email"
                    onChange={(e) => {
                      emailChangeHandler(e.target.value);
                    }}
                  />
                </div>
                <div class="form-group Login">
                  <label for="InputPassword">
                    And here's my <b>password:</b>
                  </label>
                  <input
                    type="password"
                    class="form-control"
                    id="InputPassword"
                    placeholder="Password"
                    onChange={(e) => {
                      passwordChangeHandler(e.target.value);
                    }}
                  />
                </div>
                <Button variant="warning" type="submit" onClick={onSignup}>
                  SIGN UP!
                </Button>
              </form>
            </center>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Signup;
