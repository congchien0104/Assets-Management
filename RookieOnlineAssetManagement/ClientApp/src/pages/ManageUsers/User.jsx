import React, { useEffect, useState } from "react";
import userService from "../../services/user.service";

function User(props) {
    const initialUserState = {
        id: null,
        firstName: "",
        lastName: "",
        doB: new Date(),
        gender: true,
        joinedDate: new Date(),
        type: null,
    };

    const [currentUser, setCurrentUser] = useState(initialUserState);
    const [btn, setBtn] = useState(true);

    const getUser = (id) => {
        userService.getUser(id)
          .then((response) => {
            setCurrentUser(response.data);
            console.log(response.data);
          })
          .catch((e) => {
            console.log(e);
          });
      };

    useEffect(() => {
        getUser(10);
        //console.log(props.match.params.id);
      }, []);

    const handleInputChange = (event) => {
        var target = event.target;
        var name = target.name;
        var value = target.value;
        if(name === 'gender'){
            value = target.value === 'false' ? false : true;
        }
        if(name === 'type'){
            value = target.value === '1' ? 1 : 2;
        }
        setCurrentUser({ ...currentUser, [name]: value });
        console.log(currentUser);
    };

    const submitForm = (event) => {
        event.preventDefault();
        userService.update(currentUser)
        .then((response) => {
            console.log("Update User");
          })
          .catch((e) => {
            console.log(e);
          });
    }
    return (
        <div className="container">
            <h2>Create New User</h2>
            <form onSubmit={submitForm}>
                <div class="form-group row">
                    <label htmlFor="firstName" class="col-sm-2 col-form-label">FirstName</label>
                    <div class="col-sm-4">
                        <input type="text" class="form-control" id="firstName" 
                            required onChange={handleInputChange} name="firstName" value={currentUser.firstName} readonly/>
                    </div>
                </div>
                <div class="form-group row mt-4">
                    <label htmlFor="lastName" class="col-sm-2 col-form-label">LastName</label>
                    <div class="col-sm-4">
                        <input type="text" class="form-control" id="lastName" 
                            required onChange={handleInputChange} name="lastName" value={currentUser.lastName} readonly/>
                    </div>
                </div>
                <div class="form-group row mt-4">
                    <label htmlFor="doB" class="col-sm-2 col-form-label">Date of Birth</label>
                    <div class="col-sm-4">
                        <input type="date" class="form-control" id="doB" 
                            required onChange={handleInputChange} name="doB" value={currentUser.doB}/>
                    </div>
                </div>
                <div class="form-group row mt-4">
                    <label htmlFor="gender" class="col-sm-2 col-form-label">Gender</label>
                    <div class="col-sm-4">
                        <div class="form-check form-check-inline">
                                <input class="form-check-input" type="radio" name="gender" id="gender" 
                                    value={true} checked={currentUser.gender === true} onChange={handleInputChange}/>
                                <label class="form-check-label" for="gender">Female</label>
                            </div>
                            <div class="form-check form-check-inline">
                                <input class="form-check-input" type="radio" name="gender" id="gender" 
                                    value={false} checked={currentUser.gender === false} onChange={handleInputChange}/>
                                <label class="form-check-label" for="gender">Male</label>
                        </div>
                    </div>
                </div>
                <div class="form-group row mt-4">
                    <label htmlFor="joinedDate" class="col-sm-2 col-form-label">Joined Date</label>
                    <div class="col-sm-4">
                        <input type="date" class="form-control" id="joinedDate" 
                            required onChange={handleInputChange} name="joinedDate" value={currentUser.joinedDate}/>
                    </div>
                </div>
                <div class="form-group row mt-4">
                    <label htmlFor="type" class="col-sm-2 col-form-label">Type</label>
                    <div class="col-sm-4">
                        <select id="type" class="form-control" 
                            required name="type" onChange={handleInputChange} value={currentUser.type}>
                            <option></option>
                            <option value={1}>Staff</option>
                            <option value={2}>Admin</option>
                        </select>
                    </div>
                </div>
                <div class="form-group row mt-4">
                    <div class="col-sm-4">
                    </div>
                    <div class="col-sm-4">
                        <button type="submit" class={btn ? "btn btn-danger mr-4" : "btn btn-danger mr-4 disabled"}>Save</button>
                        <button type="submit" class="btn btn-light">Cancel</button>
                    </div>
                </div>
            </form>
        </div>
    );
}

export default User;