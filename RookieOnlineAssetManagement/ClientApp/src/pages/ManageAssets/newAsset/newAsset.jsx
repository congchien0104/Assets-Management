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
export default function AddAsset(props) {
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
              {/* <ul
                class="form-control form-select"
                {...register("categoryId", { required: true })}
              >
                <li value=""></li>
                {categories &&
                  categories.map((categories) => (
                    <li value={categories.id}>{categories.name}</li>
                  ))}
                <option>create new category</option>
              </ul> */}

              <Dropdown isOpen={true} toggle={function noRefCheck() {}}>
                <DropdownToggle caret>Dropdown</DropdownToggle>
                <DropdownMenu>
                  {categories &&
                    categories.map((categories) => (
                      <DropdownItem value={categories.id}>
                        {categories.name}
                      </DropdownItem>
                    ))}
                  <DropdownItem divider />
                  <DropdownItem className="asset_form_category">
                    <div>
                      <FormGroup row>
                        <Col md={5}>
                          <Input
                            input="text"
                            placeholder="Input name"
                            // onChange={(e) =>
                            //   onChangeNewCategory(
                            //     "categoryName",
                            //     e.target.value
                            //   )
                            // }
                            // value={newCategory.categoryName}
                          />
                          <p className="error">
                            {/* {validateCategoryError.nameError} */}
                          </p>
                        </Col>
                        <Col md={5}>
                          <Input
                            input="text"
                            placeholder="Input prefix"
                            // onChange={(e) =>
                            //   onChangeNewCategory("categoryId", e.target.value)
                            // }
                            // value={newCategory.categoryId}
                          />
                          <p className="error">
                            {/* {validateCategoryError.prefixError} */}
                          </p>
                        </Col>
                        <Col md="1">
                          <div
                          // onClick={handleSubmitCategory}
                          // className="asset_form_categorySaveBtn"
                          // disabled={isCategoryFormSubmiting}
                          >
                            <svg
                              aria-hidden="true"
                              focusable="false"
                              data-prefix="fas"
                              data-icon="check"
                              className="svg-inline--fa fa-check fa-w-16"
                              role="img"
                              xmlns="http://www.w3.org/2000/svg"
                              viewBox="0 0 512 512"
                            >
                              <path
                                fill="red"
                                d="M173.898 439.404l-166.4-166.4c-9.997-9.997-9.997-26.206 0-36.204l36.203-36.204c9.997-9.998 26.207-9.998 36.204 0L192 312.69 432.095 72.596c9.997-9.997 26.207-9.997 36.204 0l36.203 36.204c9.997 9.997 9.997 26.206 0 36.204l-294.4 294.401c-9.998 9.997-26.207 9.997-36.204-.001z"
                              ></path>
                            </svg>
                          </div>
                        </Col>
                        <Col md="1">
                          <div
                            // onClick={() => {
                            //   setIsCreateNewCategory(false);
                            //   setValidateCategoryError({
                            //     nameError: "",
                            //     prefixError: "",
                            //   });
                            // }}
                            className="asset_form_categoryCancelBtn"
                          >
                            <svg
                              aria-hidden="true"
                              focusable="false"
                              data-prefix="fas"
                              data-icon="times"
                              className="svg-inline--fa fa-times fa-w-11"
                              role="img"
                              xmlns="http://www.w3.org/2000/svg"
                              viewBox="0 0 352 512"
                            >
                              <path
                                fill="black"
                                d="M242.72 256l100.07-100.07c12.28-12.28 12.28-32.19 0-44.48l-22.24-22.24c-12.28-12.28-32.19-12.28-44.48 0L176 189.28 75.93 89.21c-12.28-12.28-32.19-12.28-44.48 0L9.21 111.45c-12.28 12.28-12.28 32.19 0 44.48L109.28 256 9.21 356.07c-12.28 12.28-12.28 32.19 0 44.48l22.24 22.24c12.28 12.28 32.2 12.28 44.48 0L176 322.72l100.07 100.07c12.28 12.28 32.2 12.28 44.48 0l22.24-22.24c12.28-12.28 12.28-32.19 0-44.48L242.72 256z"
                              ></path>
                            </svg>
                          </div>
                        </Col>
                      </FormGroup>
                    </div>
                  </DropdownItem>
                </DropdownMenu>
              </Dropdown>
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
                <button type="submit" class="btn btn-light">
                  Cancel
                </button>
              </Link>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
