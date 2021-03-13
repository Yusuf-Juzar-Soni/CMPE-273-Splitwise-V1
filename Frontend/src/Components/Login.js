import { React, useState } from "react";
import axios from "axios";
import alert from "alert";
import Navbar from "react-bootstrap/Navbar";
import Button from "react-bootstrap/Button";
import { useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import Nav from "react-bootstrap/esm/Nav";
import logged from "../actions";
import bg_image0 from "./assets/login_logo.png";

function Login() {
  const [email, emailChangeHandler] = useState("");
  const [password, passwordChangeHandler] = useState("");
  const history = useHistory();

  const isLogged = useSelector((state) => state.isLogged);
  const dispatch = useDispatch();

  const loadSuccessful = () => {
    history.push("/dash");
  };

  const onLogin = (e) => {
    e.preventDefault();
    console.log("inside function");
    axios
      .post("http://localhost:3001/login", {
        email,
        password,
      })
      .then((response) => {
        console.log(response.data.result[0]);
        console.log(response.data.result[0].username);
        console.log(response.data.result[0].user_email);
        loadSuccessful();
        dispatch(
          logged(
            response.data.result[0].username,
            response.data.result[0].user_email
          )
        );
      })
      .catch((err) => {
        if (err.response && err.reponse.data) {
          alert(err.response.data.message);
        }
      });
  };
  return (
    <div>
      <Navbar bg="success" expand="lg">
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
                WELCOME TO SPLITWISE
              </h4>
              <form>
                <div class="form-group Login">
                  <label for="InputEmail">Email address</label>
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
                  <label for="InputPassword">Password</label>
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
                <Button variant="danger" type="submit" onClick={onLogin}>
                  LOGIN
                </Button>
              </form>
            </center>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
