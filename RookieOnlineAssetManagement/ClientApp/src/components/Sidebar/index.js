import React from "react";
import logo from "../../assets/img/Logo.png";

function index(props) {
  return (
    <div>
      <img src={logo} alt="..." className="img-thumbnail" />
      <h6>
        <span className="text-danger">Online Asset Management</span>
      </h6>
      <div className="list-group" id="list-tab" role="tablist">
        <a
          className="list-group-item list-group-item-action"
          id="list-home-list"
          data-toggle="list"
          href="#list-home"
          role="tab"
          aria-controls="home"
        >
          Home
        </a>
        <a
          className="list-group-item list-group-item-action"
          id="list-profile-list"
          data-toggle="list"
          href="#list-profile"
          role="tab"
          aria-controls="profile"
        >
          Manage User
        </a>
        <a
          className="list-group-item list-group-item-action active"
          id="list-messages-list"
          data-toggle="list"
          href="#list-messages"
          role="tab"
          aria-controls="messages"
        >
          Manage Assets
        </a>
        <a
          className="list-group-item list-group-item-action"
          id="list-settings-list"
          data-toggle="list"
          href="#list-settings"
          role="tab"
          aria-controls="settings"
        >
          Manage Assignment
        </a>
        <a
          className="list-group-item list-group-item-action"
          id="list-messages-list"
          data-toggle="list"
          href="#list-messages"
          role="tab"
          aria-controls="messages"
        >
          Request for Returning
        </a>
        <a
          className="list-group-item list-group-item-action"
          id="list-settings-list"
          data-toggle="list"
          href="#list-settings"
          role="tab"
          aria-controls="settings"
        >
          Report
        </a>
      </div>
    </div>
  );
}

export default index;
