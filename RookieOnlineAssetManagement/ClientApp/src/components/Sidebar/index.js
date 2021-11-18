import React from "react";
import logo from "../../assets/img/Logo.png";
import { Link } from 'react-router-dom';

function index(props) {
  return (
    <div>
      <img src={logo} alt="..." className="img-thumbnail" />
      <h6>
        <span className="text-danger">Online Asset Management</span>
      </h6>
      <div className="list-group" id="list-tab" role="tablist">
        <Link to='/' className="list-group-item list-group-item-action">Home</Link>

        <Link to='/users' className="list-group-item list-group-item-action">Manage Users</Link>

        <Link to='/assets' className="list-group-item list-group-item-action">Manage Assets</Link>

        <Link to='/assignments' className="list-group-item list-group-item-action">Manage Assignments</Link>

        <Link to='/request-for-returning' className="list-group-item list-group-item-action">Request for Returning</Link>

        <Link to='/report' className="list-group-item list-group-item-action">Report</Link>
      </div>
    </div>
  );
}

export default index;
