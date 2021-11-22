import React from "react";
import { Link } from "react-router-dom";
import { NavDropdown } from 'react-bootstrap';
import { FaUserCircle } from 'react-icons/fa';

function index(props) {
  return (
    <nav className="navbar navbar-dark bg-danger">
      <Link to="/" className="navbar-brand" style={{ paddingLeft: "15px" }}>
        Home
      </Link>
      
      <NavDropdown title={
        <div>
          <FaUserCircle style={{ fontSize: '25px', color: '#FFF' }}/>
          <span style={{ paddingLeft: '10px', color: '#FFF' }}>{props.fullName}</span>
        </div>
      }>
        <NavDropdown.Item>Profile</NavDropdown.Item>
        <NavDropdown.Item onClick={props.toggleModalChangePassword}>Change password</NavDropdown.Item>
        <NavDropdown.Item onClick={props.toggleModalLogout}>Logout</NavDropdown.Item>
      </NavDropdown>
    </nav>
  );
}

export default index;
