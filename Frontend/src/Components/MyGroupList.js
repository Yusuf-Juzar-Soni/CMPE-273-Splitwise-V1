import { React, useEffect, useState } from "react";
import Nav from "react-bootstrap/Nav";
//import LeftNavBar from "../LeftNavBar/LeftNavBar";
import axios from "axios";
import { useHistory } from "react-router-dom";
import { ListGroup, Button } from "react-bootstrap";
import { useSelector } from "react-redux";

function MyGroupList() {
  const history = useHistory();
  const emailID = useSelector((state) => state.isLogged.email);
  console.log(emailID);
  const [group_names, group_namesChange] = useState([]);

  function retriveGroups() {
    const user_email = { email:"abc@hotmail.com" };
    axios
      .post("http://localhost:3001/dashboard", user_email)
      .then((response) => {
        console.log(response.data)
        group_namesChange(response.data)
        console.log(group_names)
      })
      .catch((err) => {
        if (err.response && err.response.data) {
          alert(err.response.data.message);
        }
      });
  }
  useEffect(() => {
    retriveGroups();
  }, []);

  return (
    <div>
      <ListGroup>
        {group_names.map((item) => (
          <Button value={item} key={item}>
            {item}
          </Button>
        ))}
      </ListGroup>
    </div>
  );
}

export default MyGroupList;
