import React from "react";
import { Link } from 'react-router-dom';

function index(props) {
  return (
    <nav class="navbar navbar-dark bg-danger">
      <Link to="/" class="navbar-brand" style={{ paddingLeft: '15px' }}>
        Home
      </Link>
    </nav>
  );
}

export default index;
