import React, { useEffect, useState } from "react";
import bg_image0 from "./assets/login_logo.png";
import { useSelector } from "react-redux";
import { useHistory, useLocation } from "react-router-dom";
const queryString = require("query-string");
import Axios from "axios";
import TopNavBar from "./TopNavBar";
import { Button } from "react-bootstrap";

function Profile() {
  const location = useLocation();
  const parsed = queryString.parse(location.search);
  const email = parsed.email;
  const [user, setUser] = useState([" "]);
  const [readyForRender, setReadyForRender] = useState(false);

  useEffect(() => {
    console.log("useEffect called");
    const getUser = async () => {
      try {
        const res = await Axios.post("http://localhost:3001/userdetails", {
          email: email,
        });
        console.log(res.data);
        setUser(res.data);
      } catch (e) {
        console.log(e);
      }
    };
    getUser();
    console.log(user);
    setReadyForRender(true);
  }, []);

  return (
    <div>
      <div>
        <TopNavBar />
      </div>
      <div className="container">
        <div className="row">
          <div className="col-sm-12 .col-md-6 .offset-md-3">
            <center>
              <h4 style={{ color: "gray", fontSize: 19, marginBottom: 22 }}>
                YOUR ACCOUNT
              </h4>

              <form>
                <div className="form-group Login">
                  <label for="InputUsername">Username</label>
                  <input
                    type="text"
                    class="form-control"
                    id="InputUsername"
                    placeholder={user[0].username}
                  />
                </div>
                <div className="form-group Login">
                  <label for="InputEmail">Email</label>
                  <input
                    type="email"
                    class="form-control"
                    id="InputEmail"
                    placeholder={user[0].user_email}
                    // onChange={(e) => {
                    //   passwordChangeHandler(e.target.value);
                    // }}
                  />
                </div>
                <div className="form-group Login">
                  <label for="Password">Password</label>
                  <input
                    type="password"
                    class="form-control"
                    id="InputPassword"
                    placeholder={user[0].password}
                    // onChange={(e) => {
                    //   passwordChangeHandler(e.target.value);
                    // }}
                  />
                </div>
                <div className="form-group Login">
                  <label for="InputPhone">Phone</label>
                  <input
                    type="tel"
                    class="form-control"
                    id="InputPhone"
                    placeholder={user[0].user_phone}
                    // onChange={(e) => {
                    //   passwordChangeHandler(e.target.value);
                    // }}
                  />
                </div>
                <div className="form-group Login">
                  <label for="InputTimezone">Timezone</label>
                  <select class="form-control">
                    <option value="" disabled selected hidden>
                      {user[0].user_time}
                    </option>
                    <option
                      timeZoneId="5"
                      gmtAdjustment="GMT-08:00"
                      useDaylightTime="1"
                      value="-8"
                    >
                      (GMT-08:00) Pacific Time (US & Canada)
                    </option>
                    <option
                      timeZoneId="1"
                      gmtAdjustment="GMT-12:00"
                      useDaylightTime="0"
                      value="-12"
                    >
                      (GMT-12:00) International Date Line West
                    </option>
                    <option
                      timeZoneId="2"
                      gmtAdjustment="GMT-11:00"
                      useDaylightTime="0"
                      value="-11"
                    >
                      (GMT-11:00) Midway Island, Samoa
                    </option>
                    <option
                      timeZoneId="3"
                      gmtAdjustment="GMT-10:00"
                      useDaylightTime="0"
                      value="-10"
                    >
                      (GMT-10:00) Hawaii
                    </option>
                    <option
                      timeZoneId="4"
                      gmtAdjustment="GMT-09:00"
                      useDaylightTime="1"
                      value="-9"
                    >
                      (GMT-09:00) Alaska
                    </option>

                    <option
                      timeZoneId="7"
                      gmtAdjustment="GMT-07:00"
                      useDaylightTime="0"
                      value="-7"
                    >
                      (GMT-07:00) Arizona
                    </option>

                    <option
                      timeZoneId="9"
                      gmtAdjustment="GMT-07:00"
                      useDaylightTime="1"
                      value="-7"
                    >
                      (GMT-07:00) Mountain Time (US & Canada)
                    </option>
                    <option
                      timeZoneId="10"
                      gmtAdjustment="GMT-06:00"
                      useDaylightTime="0"
                      value="-6"
                    >
                      (GMT-06:00) Central America
                    </option>
                  </select>
                </div>

                <div className="form-group Login">
                  <label for="InputCurrency">Currency</label>
                  <select id="currency" name="currency" class="form-control">
                    <option value="" disabled selected hidden>
                      {user[0].user_currency}
                    </option>
                    <option value="USD">US Dollar</option>
                    <option value="GBP">Great Britain Pound</option>
                  </select>
                </div>

                <div className="form-group Login">
                  <label for="InputLanguage">Language</label>
                  <select id="language" name="language" class="form-control">
                    <option value="English">English</option>
                  </select>
                </div>

                <Button variant="danger">Save Profile</Button>
              </form>
            </center>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;
