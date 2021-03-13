import { React, useState } from "react";
import axios from "axios";
import Navbar from "react-bootstrap/Navbar";
import Button from "react-bootstrap/Button";
import { useHistory } from "react-router-dom";
import Nav from "react-bootstrap/esm/Nav";
import MyGroupList from "../MyGroupList"

function LeftNavBar(){



    return (
        <div>
          <div>
          <Nav defaultActiveKey="/home" className="flex-column">
            <Nav.Link href="/dash">Dashboard</Nav.Link>
            <Nav.Link >Groups</Nav.Link>
            <MyGroupList/>

            </Nav>
          </div>
          </div>
          )
          }
export default LeftNavBar;