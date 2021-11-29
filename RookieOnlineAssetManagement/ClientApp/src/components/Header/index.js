import React from "react";
import { Link, useLocation } from "react-router-dom";
import { NavDropdown } from "react-bootstrap";
import { FaUserCircle } from "react-icons/fa";
import { useState, useEffect } from "react";
function Index(props) {
  const location = useLocation();
  const [headerName, setHeaderName] = useState("Home");
  useEffect(() => {
    switch (location.pathname) {
      case "/users":
        setHeaderName("Manage User");
        break;
      case "/assets":
        setHeaderName("Manage Asset");
        break;
      case "/users/add":
        setHeaderName("Manage User > Create New User");
        break;
      case "/asset/add":
        setHeaderName("Manage Asset > Create New Asset");
        break;
      default:
        setHeaderName("Home");
        break;
    }
    if (location.pathname.includes("/home")) setHeaderName("Home");
    else if (location.pathname.includes("/users/add")) setHeaderName("Manage User > Create New User");
    else if (location.pathname.includes("/users/")) setHeaderName("Manage User > Edit User");
    else if (location.pathname.includes("/users")) setHeaderName("Manage User");
    else if (location.pathname.includes("/asset/new")) setHeaderName("Manage Asset > Create New Asset");
    else if (location.pathname.includes("/asset/")) setHeaderName("Manage Asset > Edit Asset");
    else if (location.pathname.includes("/assets")) setHeaderName("Manage Asset");
    else if (location.pathname.includes("/assignments")) setHeaderName("Manage Assignment");
    // if (location.pathname.includes("/request-for-returning")) setHeaderName(5);
    // if (location.pathname.includes("/report")) setHeaderName(5);
  }, [location]);
  return (
    <nav className="navbar navbar-dark bg-danger">
      <Link
        to="/"
        className="navbar-brand"
        style={{ paddingLeft: "15px", fontWeight: "bold" }}
      >
        {headerName}
      </Link>
      <NavDropdown
        title={
          <div>
            <FaUserCircle style={{ fontSize: "25px", color: "#FFF" }} />
            <span style={{ paddingLeft: "10px", color: "#FFF" }}>
              {props.fullName}
            </span>
          </div>
        }
      >
        <NavDropdown.Item>Profile</NavDropdown.Item>
        <NavDropdown.Item onClick={props.toggleModalChangePassword}>
          Change password
        </NavDropdown.Item>
        <NavDropdown.Item onClick={props.toggleModalLogout}>
          Logout
        </NavDropdown.Item>
      </NavDropdown>
    </nav>
  );
}

export default Index;
