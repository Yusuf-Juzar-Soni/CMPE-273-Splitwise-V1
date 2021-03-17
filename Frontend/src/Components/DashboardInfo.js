import React, { useEffect, useState } from "react";
const queryString = require("query-string");
import Axios from "axios";
import { useHistory, useLocation } from "react-router-dom";
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

function DashboardInfo() {
  const location = useLocation();
  const parsed = queryString.parse(location.search);
  const email = parsed.email;
  console.log(email);
  const [amounts, setFinalAmounts] = useState([" "]);
  const [owe, setOwe] = useState([]);
  const [owed, setOwed] = useState([]);
  const [bal, setBal] = useState(0);
  const [lena, setLena] = useState(0);
  const [dena, setDena] = useState(0);
  const [selectUser, setSelectUser] = useState(" ");
  const [show, setShow] = useState(false);
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
    console.log(amounts1);

    let negative = amounts1.filter((amt) => amt.amt < 0);
    let positive = amounts1.filter((amt) => amt.amt > 0);

    console.log(positive);
    console.log(negative);

    let negative_final = negative.map(function (item) {
      item.amt = item.amt * -1;
      return item;
    });

    setOwe(negative_final);
    setOwed(positive);

    findAmounts(negative_final, positive);
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
    console.log(IOwe);
    if (IOwe == NaN) IOwe = 0;

    for (let k = 0; k < test2.length; k++) {
      if (test2[k] !== undefined) {
        Owed = Owed + test2[k].amt;
      }
    }
    console.log(Owed);
    if (Owed == NaN) Owed = 0;

    balanced = IOwe - Owed;
    if (balanced < 0) balanced = 0;

    setDena(IOwe);
    setLena(Owed);
    setBal(balanced);
  };

  const handleShow = () => setShow(true);

  const handleClose = () => {
    setShow(false);
  };

  console.log(selectUser);

  const handleSettleUp = () => {
    SettleUp(parsed.email, selectUser);
  };

  // const selectedPayee = (e) => {
  //   console.log(e.target.value);
  // };

  const SettleUp = (email, senderemail) => {
    Axios.post("http://localhost:3001/settleUp", {
      user: email,
      sender: senderemail,
    })
      .then((response) => {
        if (response.status == 200) {
          console.log(response.data);
          setShow(false);
        }
      })
      .catch((e) => {
        console.log(e);
      });
  };

  return (
    <div>
      <div className="row">
        <Card
          bg="light"
          className="display_modal_bar"
          style={{ width: "100rem" }}
        >
          <Card.Header>
            <div className="row">
              <div className="col-md-11">
                <h3>DASHBOARD</h3>
              </div>
              <div className="col-md-1">
                <Button variant="primary" onClick={handleShow}>
                  SETTLE UP
                </Button>
              </div>
            </div>
          </Card.Header>
        </Card>
      </div>
      <br></br>
      <br></br>
      <Row>
        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>SettleUp Modal</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
              <Form.Group>
                <Form.Label>Select Who You Want to Settle Up With :</Form.Label>
                <Form.Control
                  as="select"
                  onChange={(e) => {
                    setSelectUser(e.target.value);
                  }}
                >
                  <option selected disabled hidden>
                    choose here
                  </option>
                  {owe.map((amount) => (
                    <option value={amount.email}>
                      {amount.email} &nbsp;&nbsp; {amount.amt}
                    </option>
                  ))}
                </Form.Control>
              </Form.Group>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>

            <Button variant="primary" onClick={handleSettleUp}>
              SettleUp
            </Button>
          </Modal.Footer>
        </Modal>
      </Row>

      <Row>
        <Col md={4}>YOU OWE:{dena}</Col>
        <Col md={4}>YOU ARE OWED:{lena}</Col>
        <Col md={4}>BALANCE: {bal}</Col>
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
                {amount.email} &nbsp;&nbsp; {amount.amt}
                <br></br>
              </ListGroup.Item>
            ))}
          </ListGroup>
        </Col>
      </Row>
      <Row>
        <div></div>
      </Row>
    </div>
  );
}

export default DashboardInfo;
