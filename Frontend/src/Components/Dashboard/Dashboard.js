import { React } from "react";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import { useSelector } from "react-redux";
import NavDropdown from "react-bootstrap/NavDropdown";
import Dropdown from "react-bootstrap/Dropdown";
import "./Dashboard.css";
import bg_image0 from "../assets/login_logo.png";
import LeftNavBar from "../LeftNavBar/LeftNavBar";
import TopNavBar from "../TopNavBar";
import DashboardInfo from "../DashboardInfo";

const Dashboard = function () {
  const isLogged = useSelector((state) => state.isLogged.username);
  console.log("hello");
  return (
    <div className="dashboard">
      <div>
        <TopNavBar />
      </div>
      
      <div className="row">
        <div div className="col-md-2">
          <LeftNavBar />
        </div>
        <div div className="col-md-10">
         <DashboardInfo/>
        </div>
        
      </div>
    </div>
  );
};

export default Dashboard;
