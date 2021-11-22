import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';

import userService from "../../services/user.service";

function getAge(dateString) {
    var today = new Date();
    var birthDate = new Date(dateString);
    var age = today.getFullYear() - birthDate.getFullYear();
    var m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
        age--;
    }
    return age;
}

const getSaturdayOrSunday = (value) => {
    console.log(value.getDay());

    if(value.getDay() === 6 || value.getDay() === 0){
        return true;
    }
    return false;
}

function EditUser(props) {

    // form validation rules 
    const validationSchema = Yup.object().shape({
        firstName: Yup.string()
            .required('First Name is required'),
        lastName: Yup.string()
            .required('Last name is required'),
        doB: Yup.date()
            .required('DoB is required')
            .test("DOB", "User is under 18. Please select a different date", (value) => {
                return getAge(value) >= 18;
            }),
        joinedDate:  Yup.date()
            .required('DoB is required')
            // .default("2021-01-01")
            .min(
                Yup.ref('doB'),
                "Joined date is not later than Date of Birth. Please select a different date"
              )
            // .when("doB",
            // (doB, Yup) => doB && Yup.min(doB, "Joined date is not later than Date of Birth. Please select a different date"))
            .test("doB", "Joined date is Saturday or Sunday. Please select a different date", (value) => {
                return getSaturdayOrSunday(value) === false;
              }),
        type: Yup.string()
            .required('Type is required'),
        });
    const formOptions = { resolver: yupResolver(validationSchema) };

    // get functions to build form with useForm() hook
    const { register, handleSubmit, reset, formState, watch } = useForm(formOptions,
        {
            defaultValues: {
                firstName: 'chien',
                lastName: 'cong'
              }
        });
    const { errors } = formState;
    const watchAllFields = watch();


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


    
    
    function onSubmit(data) {
        // display form data on success
        console.log(data);
        const user = new FormData();
        for(var key in data){
            if(key==='gender'){
                var temp = data[key] === 'true' ? true : false;
                user.append(key, temp);
            }
            if(key==='doB'){
                console.log(data[key]);
                const now = getAge(data[key]);
                console.log(now);
                console.log(errors);
            }
            else{
                user.append(key, data[key]);
            }
        }
        userService.create(user)
        .then((response) => {
            //setSubmitted(true);
            console.log("Create new User");
          })
          .catch((e) => {
            console.log(e);
          });
    }
    return (
        <div className="container">
            <h2>Create New User</h2>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div class="form-group row">
                    <label htmlFor="firstName" class="col-sm-2 col-form-label">FirstName</label>
                    <div class="col-sm-4">
                        <input value={currentUser.firstName} name="firstName" type="text" {...register('firstName')} className={`form-control ${errors.firstName ? 'is-invalid' : ''}`} />
                        <div className="invalid-feedback">{errors.firstName?.message}</div>
                    </div>
                </div>
                <div class="form-group row mt-4">
                    <label htmlFor="lastName" class="col-sm-2 col-form-label">LastName</label>
                    <div class="col-sm-4">
                        <input name="lastName" type="text" {...register('lastName')} className={`form-control ${errors.lastName ? 'is-invalid' : ''}`} />
                        <div className="invalid-feedback">{errors.lastName?.message}</div>
                    </div>
                </div>
                <div class="form-group row mt-4">
                    <label htmlFor="doB" class="col-sm-2 col-form-label">Date of Birth</label>
                    <div class="col-sm-4">
                        <input name="doB" type="date" {...register('doB')} className={`form-control ${errors.doB ? 'is-invalid' : ''}`} />
                        <div className="invalid-feedback">{errors.doB?.message}</div>
                    </div>
                </div>
                <div class="form-group row mt-4">
                    <label htmlFor="gender" class="col-sm-2 col-form-label">Gender</label>
                    <div class="col-sm-4">
                        <div class="form-check form-check-inline">
                                <input name="gender" type="radio" {...register('gender')} id="gender" value={true} checked className={`form-check-input ${errors.gender ? 'is-invalid' : ''}`} />
                                <label class="form-check-label" for="gender">Female</label>
                            </div>
                            <div class="form-check form-check-inline">
                                <input name="gender" type="radio" {...register('gender')} id="gender" value={false} className={`form-check-input ${errors.gender ? 'is-invalid' : ''}`} />
                                <label class="form-check-label" for="gender">Male</label>
                        </div>
                    </div>
                </div>
                <div class="form-group row mt-4">
                    <label htmlFor="joinedDate" class="col-sm-2 col-form-label">Joined Date</label>
                    <div class="col-sm-4">
                        <input name="joinedDate" type="date" {...register('joinedDate')} className={`form-control ${errors.joinedDate ? 'is-invalid' : ''}`} />
                        <div className="invalid-feedback">{errors.joinedDate?.message}</div>
                    </div>
                </div>
                <div class="form-group row mt-4">
                    <label htmlFor="type" class="col-sm-2 col-form-label">Type</label>
                    <div class="col-sm-4">
                        <select name="type" {...register('type')} className={`form-control ${errors.type ? 'is-invalid' : ''}`}>
                            <option></option>
                            <option value={1}>Staff</option>
                            <option value={2}>Admin</option>
                        </select>
                        <div className="invalid-feedback">{errors.type?.message}</div>
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

export default EditUser;