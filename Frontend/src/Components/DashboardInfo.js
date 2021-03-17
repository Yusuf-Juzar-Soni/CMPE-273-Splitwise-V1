import React, { useEffect, useState } from "react";
const queryString = require("query-string");
import Axios from "axios";
import { useHistory, useLocation } from "react-router-dom";
import { Button, Grid, Row, Col, ListGroup } from "react-bootstrap";

function DashboardInfo() {
  const location = useLocation();
  const parsed = queryString.parse(location.search);
  const email = parsed.email;
  console.log(email);
  const [amounts, setFinalAmounts] = useState([" "]);
  const [owe, setOwe] = useState([]);
  const [owed, setOwed] = useState([]);
  const [balance, setBalance] = useState(0);

  let amountsIOwe = [" "];
  let amountsIAmOwed = [" "];

  // const [show, setShow] = useState(false);
  // const [groups, setGroups] = useState([]);
  // const [amount, setAmount] = useState(0);
  // const [description, setDescription] = useState("");
  // const [bills, setBills] = useState([]);

  useEffect(() => {
    console.log();
    // const getFinalAmounts = async () => {
    Axios.get("http://localhost:3001/amount/" + email).then((response) => {
      console.log(response);
      setFinalAmounts(response.data);
      setSplit(response.data);
    });
    // console.log("This is res", res);

    // getFinalAmounts();
    console.log(amounts);
  }, [location]);

  const setSplit = (amounts1) => {
      console.log(amounts1)
    // for (let i = 0; i < amounts1.length; i++) {
    //   if (amounts1[i].amt > 0) {
    //       amountsIOwe[i].amt = amounts1[i].amt
    //       amountsIOwe[i].user_email = amounts1[i].user_email
    //     }
    //   else if (amounts1[i].amt < 0) amountsIAmOwed[i] = amounts1[i];
    //   else console.log("not needed");
    // }

    let negative = amounts1.filter((amt) =>  amt.amt < 0)
    let positive = amounts1.filter((amt) =>  amt.amt > 0)
    console.log(negative)
    console.log(positive)
    setOwe(negative);
    setOwed(positive);
    // findAmounts(amountsIOwe, amountsIAmOwed);
    //    setOwe(amountsIOwe)
    //    setOwed(amountsIAmOwed)
  };

  const findAmounts = (test1, test2) => {
    console.log(test1);
    let IOwe = 0;
    let Owed = 0;
    let balanced = 0;

    for (let j = 0; j < test1.length; j++) {
      if (test1[j] !== undefined) {
        IOwe = IOwe + test1[j].amt;
      }
    }
    if (IOwe == NaN) IOwe = 0;

    for (let k = 0; k < test2.length; k++) {
        if (test2[k] !== undefined) {
      Owed = Owed + test2[k].amt;
        }
    }
    if (Owed == NaN) Owed = 0;

    balanced = Owed - IOwe;
    if (balanced < 0) balanced = 0;

    console.log(IOwe);
    console.log(Owed);
    console.log(balanced);
  };

  return (
    <div>
      <h2>This is the info page</h2>
      <Row>
        {/* <Col md={4}>YOU OWE:{IOwe}</Col>
        <Col md={4}>YOU ARE OWED:{Owed}</Col>
        <Col md={4}>BALANCE: {balanced}</Col> */}
      </Row>

      <Row className="show-grid">
        <Col md={6}>
          <p>YOU OWE</p>
          <ListGroup>
            {owe.map((amt) => (
              <ListGroup.Item className="links-acttivity-groups">
                {amt.email} {amt.amt}
                <br></br>
              </ListGroup.Item>
            ))}
          </ListGroup>
        </Col>
        <Col md={6}>
          <p>YOU ARE OWED</p>
          <ListGroup>
            {owed.map((amount) => (
              <ListGroup.Item className="links-acttivity-groups">
                {amount.email} &nbsp;amount&nbsp; {amount.amt}
                <br></br>
              </ListGroup.Item>
            ))}
          </ListGroup>
        </Col>
      </Row>
    </div>
  );
}

export default DashboardInfo;
