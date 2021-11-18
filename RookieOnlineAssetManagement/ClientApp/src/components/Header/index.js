import React from "react";
import { Link } from "react-router-dom";

function index(props) {
  return (
    <nav className="navbar navbar-dark bg-danger">
      <Link to="/" className="navbar-brand" style={{ paddingLeft: "15px" }}>
        Home
      </Link>
    </nav>
  );
}

export default index;
