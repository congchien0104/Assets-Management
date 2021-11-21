import axios from "axios";

const API_URL = "https://localhost:44303/api";

const create = (data) => {
  return axios.post(API_URL + "/users", data);
};

const update = (id, data) => {
  return axios.put(API_URL + `/users/${id}`, data);
};

const getUser = (id) => {
  return axios.get(API_URL + `/users/${id}`);
};

// eslint-disable-next-line import/no-anonymous-default-export
export default {
  getUser,
  create,
  update,
};
