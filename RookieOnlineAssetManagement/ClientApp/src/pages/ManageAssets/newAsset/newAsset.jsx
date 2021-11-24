import React, { useEffect, useState } from "react";
import { Create, GetAllCategories } from "../../../services/assetService";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { useHistory } from "react-router-dom";
import {
  DropdownToggle,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  FormGroup,
  Col,
  Input,
} from "reactstrap";
export default function NewAsset(props) {
  let history = useHistory();
  const [categories, setCategories] = useState([]);
  useEffect(() => {
    GetAllCategories()
      .then((response) => setCategories([...response]))
      .catch((error) => console.log(error));
  }, []);
  const {
    register,
    handleSubmit,
    formState: { isDirty, isValid },
  } = useForm({ mode: "onChange" });
  const onHandleSubmit = (data) => {
    const fd = new FormData();
    for (var key in data) {
      fd.append(key, data[key]);
    }
    Create(fd)
      .then((response) => {
        if (response.status) {
          console.log(response);
          history.push("/assets");
        }
      })
      .catch((error) => console.log(error));

    console.log(fd);
  };
  return (
    <div className="container">
      <div class="mx-auto">
        <h2>Create New asset</h2>
        <form onSubmit={handleSubmit(onHandleSubmit)}>
          <div class="form-group row my-3">
            <label htmlFor="name" class="col-sm-2 col-form-label">
              Name
            </label>
            <div class="col-sm-4">
              <input
                type="text"
                class="form-control"
                {...register("name", { required: true })}
              />
            </div>
          </div>
          <div class="form-group row my-3">
            <label htmlFor="name" class="col-sm-2 col-form-label">
              Category
            </label>
            <div class="col-sm-4">
              <select
                class="form-control form-select"
                {...register("categoryId", { required: true })}
              >
                <option value=""></option>
                {categories &&
                  categories.map((categories) => (
                    <option value={categories.id}>{categories.name}</option>
                  ))}
                <option>create new category</option>
              </select>
            </div>
          </div>
          <div class="form-group row my-3">
            <label htmlFor="specification" class="col-sm-2 col-form-label">
              Specification
            </label>
            <div class="col-sm-4">
              <textarea
                type="text"
                class="form-control"
                {...register("specification", { required: true })}
              />
            </div>
          </div>
          <div class="form-group row my-3 mt-4">
            <label htmlFor="doB" class="col-sm-2 col-form-label">
              Installed Date
            </label>
            <div class="col-sm-4">
              <input
                type="date"
                class="form-control"
                {...register("installedDate", { required: true })}
              />
            </div>
          </div>
          <div class="form-group row mt-4">
            <label htmlFor="isAvailable" class="col-sm-2 col-form-label">
              State
            </label>
            <div class="col-sm-4">
              <div class="form-check form-check">
                <input
                  class="form-check-input "
                  type="radio"
                  value={true}
                  {...register("isAvailable", { required: true })}
                />
                <label class="form-check-label" for="isAvailable">
                  Available
                </label>
              </div>
              <div class="form-check form-check">
                <input
                  class="form-check-input"
                  type="radio"
                  value={false}
                  {...register("isAvailable", { required: true })}
                />
                <label class="form-check-label" for="isAvailable">
                  Not Available
                </label>
              </div>
            </div>
          </div>
          <div class="form-group row my-3 mt-4">
            <div class="col-sm-4"></div>
            <div class="col-sm-4">
              <button
                type="submit"
                class="btn btn-danger mr-4"
                disabled={!isDirty || !isValid}
              >
                Save
              </button>
              <Link
                to={{
                  pathname: "/assets",
                }}
              >
                <button class="btn btn-light">Cancel</button>
              </Link>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
