import axios from "axios";

const API_URL = "/api/assets/";

export async function Create(data) {
  return await axios.post(API_URL, data);
}
export async function CreateCategory(data) {
  return await axios.post(API_URL + "category/", data);
}
export async function Update(id, data) {
  return await axios.put(API_URL + `${id}`, data);
}

export async function GetDetail(id) {
  return await axios.get(API_URL + `${id}`).then((response) => response.data);
}
export async function GetAllCategories() {
  return await axios
    .get(API_URL + "categories")
    .then((response) => response.data);
}
export async function GetAssetState() {
  return await axios.get(API_URL + "states").then((response) => response.data);
}
export async function Delete(id) {
  return axios.delete(API_URL + `${id}`);
}
export async function GetAssetsPaging() {
  return await axios
    .get(API_URL + "paging?pageSize=10")
    .then((response) => response.data);
}
