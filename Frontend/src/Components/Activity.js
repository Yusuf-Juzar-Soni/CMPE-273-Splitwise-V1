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
import TopNavBar from "./TopNavBar";
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

const Activity = () => {
  const location = useLocation();
  const isLogged = useSelector((state) => state.isLogged.username);
  const [activity, setActivity] = useState([]);
  const parsed = queryString.parse(location.search);
  const email = parsed.email;
  
  useEffect(() => {
    Axios.get("http://localhost:3001/Activity/" + email)
      .then((response) => {
        console.log(response);
        setActivity(response.data);
        console.log(activity)
      })
      .catch((e) => {
        console.log(e);
      });
  }, [location]);

  return (
    <div>
        <div>
          <TopNavBar />
        </div>
        <h4>Recent Activity</h4>   
       <br></br> 
        <div className="row">
      <ListGroup>
        {activity.map((activity) => (
          <ListGroup.Item
            // key={bill.amount}
            className="links-acttivity-groups"
          >
             
            {activity.created_by} &nbsp;paid&nbsp; {activity.bill_amount}&nbsp; in &nbsp; {activity.bill_group}&nbsp;for&nbsp; {activity.bill_desc}&nbsp;on&nbsp;{activity.bill_timestamp} <br></br>
            

          </ListGroup.Item>
        ))}
      </ListGroup>
      </div>
    </div>
  );
};

export default Activity;
