import axios from "axios";

const API_URL = "/api";

const create = (data) => {
  return axios.post(API_URL + "/users", data);
};

const update = (id, data) => {
  console.log(data);
  return axios.put(API_URL + `/users/${id}`, data);
};

const getUser = (id) => {
  return axios.get(API_URL + `/users/${id}`);
};

const getUserFilter = (page) => {
  return axios.get(API_URL + `/users/paging?pageIndex=${page}`);
};
const disabled = (id) => {
  console.log(id);
  return axios.patch(API_URL + `/users/${id}`);
};
// eslint-disable-next-line import/no-anonymous-default-export
export default {
  getUser,
  create,
  update,
  getUserFilter,
  disabled,
};
