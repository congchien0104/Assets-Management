import React, { useState, useEffect } from "react";
import axios from "axios";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Header from "./components/Header";
import SideBar from "./components/Sidebar";
import { Switch, Route } from "react-router-dom";
import Home from "./pages/Home/Home";
import ListAssets from "./pages/ManageAssets/listAssets/ListAssets";
import NewAsset from "./pages/ManageAssets/newAsset/newAsset";
import EditAsset from "./pages/ManageAssets/editAsset/editAsset";
import Users from "./pages/ManageUsers/Users";
import Asignments from "./pages/ManageAssignments";
import RequestForReturning from "./pages/RequestForReturning";
import Reports from "./pages/Reports";
import { Modal, Button } from 'react-bootstrap';

axios.interceptors.request.use((config) => {
  return config;
});
axios.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (401 === error.response.status) {
      window.location.href = "/Identity/Account/Login?returnUrl=" + window.location.pathname;
      
    } else {
      return Promise.reject(error);
    }
  }
);

function App() {

  const [isIncorrectPassword, setIsIncorrectPassword] = useState(false);
  const [isBothSamePassword, setIsBothSamePassword] = useState(false)
  const [isDisable, setIsDisable] = useState(true);
  const [passwordChange, setPasswordChange] = useState({oldPassword: '', newPassword: ''})
  const [openModalChangePasswordSuccess, setOpenModalChangePasswordSuccess] = useState(false);
  const [openModalChangePassword, setOpenModalChangePassword] = useState(false)
  const [openModalLogout, setOpenModalLogout] = useState(false)
  const [userData, setUserData] = useState({});

  const toggleModalChangePassword = () => {
    setOpenModalChangePassword(!openModalChangePassword)
    setPasswordChange({oldPassword: '', newPassword: ''});
    setIsBothSamePassword(false);
    setIsIncorrectPassword(false);
  }
  
  const toggleModalLogout = () => {
    setOpenModalLogout(!openModalLogout)
  }

  const handleLogout = () => {
    axios.get("/api/users/Logout")
      .then((response) => {
        if(response.data.isLogout) {
          window.location.href = "/Identity/Account/Login?returnUrl=" + window.location.pathname;
        }
      })
  }

  const handleChangePassword = () => {
    if(passwordChange.oldPassword == '' && passwordChange.newPassword == '') {
      alert("New password can not be empty!");
    }
    else if(passwordChange.oldPassword == passwordChange.newPassword) {
      setIsBothSamePassword(true)
      setIsIncorrectPassword(false)
    }
    else {
      axios.put("/api/users/ChangePassword", {
        userId: userData.id,
        passwordOld: passwordChange.oldPassword,
        passwordNew: passwordChange.newPassword
      })
        .then((response) => {
          toggleModalChangePassword();
          setOpenModalChangePasswordSuccess(true);
        })
        .catch((error) => {
          if(error.message != '') {
            setIsIncorrectPassword(true);
          }
        })
      setIsBothSamePassword(false)
    }
  }

  const handleChangePasswordFirstTime = () => {
    if(passwordChange.newPassword == '') {
      alert("New password can not be empty!");
    }
    else {
      axios.put("/api/users/ChangePasswordFirstTime", {
        userId: userData.id,
        passwordNew: passwordChange.newPassword
      }).then((response) => {
        alert(response.data.message);
        window.location.href = window.location.pathname;
      });
    }
  }

  useEffect(() => {
    if(passwordChange.newPassword != '' && passwordChange.oldPassword != '') {
      setIsDisable(false);
    }
    else {
      setIsDisable(true);
    }

  }, [passwordChange])

  useEffect(() => {
    axios.get("/api/users/GetUserLogin").then((response) => setUserData(response.data));

  }, [])

  return (
    <div className="container-fluid" style={{ padding: 0 }}>
      <Header fullName={userData.fullName} toggleModalLogout={toggleModalLogout} toggleModalChangePassword={toggleModalChangePassword}/>
      <div className="row">
        <div className="col-sm-2" style={{ padding: "0 30px" }}>
          <SideBar type={userData.type} />
        </div>
        <div className="col-sm-10">
          <Switch>
                      
                      <Route exact path="/assets" component={() => <ListAssets />} />
                      <Route
                          exact
                          path="/asset/edit/:id"
                          component={() => <EditAsset />}
                      />
                      <Route exact path="/" component={() => <Home />} />
            <Route exact path="/assets" component={() => <Assets />} />
            <Route exact path="/users" component={() => <Users />} />
            <Route exact path="/assignments" component={() => <Asignments />} />
            <Route
              exact
              path="/request-for-returning"
              component={() => <RequestForReturning />}
            />
            <Route exact path="/report" component={() => <Reports />} />
            <Route path="*" component={() => <div>404 Not Found!</div>} />
          </Switch>
        </div>
      </div>
      {
        userData.type == 0 ?
        /* Modal for Change Password First Time */
        <Modal show={true}>
          <Modal.Header style={{ backgroundColor: '#DDE1E5', paddingLeft: '40px' }}>
            <Modal.Title style={{ fontSize: '20px', fontWeight: 'bold', color: '#dc3545' }}>Change password</Modal.Title>
          </Modal.Header>

          <Modal.Body style={{ padding: '20px', paddingLeft: '40px' }}>
            <div>This is the first time you logged in.</div>
            <div>You have to change your password to continue.</div>
            <div style={{ display: 'flex', padding: '10px 0' }}>
              <div style={{ paddingRight: '10px' }}>New password</div>
              <input id="newPassword" type="password" value={passwordChange.newPassword} onChange={(e) => setPasswordChange({oldPassword: e.target.value, newPassword: e.target.value})}/>
            </div>
          </Modal.Body>

          <Modal.Footer>
            <Button style={{ backgroundColor: '#dc3545', border: '1px solid #dc3545', borderRadius: '4px' }} onClick={handleChangePasswordFirstTime} disabled={isDisable}>Save</Button>
          </Modal.Footer>
        </Modal>
        :
        ''
      }

      { /* Modal for logout */}
      <Modal show={openModalLogout}>
        <Modal.Header style={{ backgroundColor: '#DDE1E5' }}>
          <Modal.Title style={{ fontSize: '20px', fontWeight: 'bold', color: '#dc3545' }}>Are you sure?</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <p>Do you want to log out?</p>
        </Modal.Body>

        <Modal.Footer>
          <Button style={{ backgroundColor: '#dc3545', border: '1px solid #dc3545', borderRadius: '4px' }} onClick={handleLogout}>Log out</Button>
          <Button style={{ backgroundColor: '#FFF', border: '1px solid #808080', borderRadius: '4px', color: '#808080' }} onClick={toggleModalLogout}>Cancel</Button>
        </Modal.Footer>
      </Modal>

      { /* Modal for change password */}
      <Modal show={openModalChangePassword}>
        <Modal.Header style={{ backgroundColor: '#DDE1E5', paddingLeft: '40px' }}>
          <Modal.Title style={{ fontSize: '20px', fontWeight: 'bold', color: '#dc3545' }}>Change password</Modal.Title>
        </Modal.Header>

        <Modal.Body style={{ padding: '20px', paddingLeft: '40px' }}>
          {isBothSamePassword ? <div style={{ color: 'red', fontSize: '15px', paddingBottom: '10px' }}>Your new password cannot be the same as your old password</div> : ''}
          <div style={{ display: 'flex', padding: '10px 0' }}>
            <div style={{ paddingRight: '15px' }}>Old password</div>
            <div>
              <input 
                id="oldPassword"
                type="password" 
                value={passwordChange.oldPassword} 
                onChange={(e) => setPasswordChange({...passwordChange, oldPassword: e.target.value})}
                style={isBothSamePassword || isIncorrectPassword ? { border: "1px solid red", borderRadius: '2px' } : {}}
                />
              {isIncorrectPassword ? <div style={{ color: 'red', fontSize: '14px' }}>Password is incorrect</div> : ''}
            </div>
          </div>
          <div style={{ display: 'flex', padding: '10px 0' }}>
            <div style={{ paddingRight: '10px' }}>New password</div>
            <input 
              id="newPassword"
              type="password" 
              value={passwordChange.newPassword} 
              onChange={(e) => setPasswordChange({...passwordChange, newPassword: e.target.value})}
              style={isBothSamePassword ? { border: "1px solid red", borderRadius: '2px' } : {}}
            />
          </div>
        </Modal.Body>

        <Modal.Footer>
          <Button style={{ backgroundColor: '#dc3545', border: '1px solid #dc3545', borderRadius: '4px' }} onClick={handleChangePassword} disabled={isDisable}>Save</Button>
          <Button style={{ backgroundColor: '#FFF', border: '1px solid #808080', borderRadius: '4px', color: '#808080' }} onClick={toggleModalChangePassword}>Cancel</Button>
        </Modal.Footer>
      </Modal>

      { /* Modal to message change password successfully */}
      <Modal show={openModalChangePasswordSuccess}>
        <Modal.Header style={{ backgroundColor: '#DDE1E5', paddingLeft: '40px' }}>
          <Modal.Title style={{ fontSize: '20px', fontWeight: 'bold', color: '#dc3545' }}>Change password</Modal.Title>
        </Modal.Header>

        <Modal.Body style={{ padding: '20px', paddingLeft: '40px' }}>
          <p>Your password has been changed successfully!</p>
        </Modal.Body>

        <Modal.Footer>
          <Button style={{ backgroundColor: '#FFF', border: '1px solid #808080', borderRadius: '4px', color: '#808080' }} onClick={() => setOpenModalChangePasswordSuccess(false)}>Cancel</Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default App;
