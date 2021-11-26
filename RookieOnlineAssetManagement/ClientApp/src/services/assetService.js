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
export async function GetAssetsPagingDefault(afterCreated, affterUpdated) {
  var query = afterCreated ? `${"&IsSortByCreatedDate=" + afterCreated}` : "";
  query += affterUpdated ? `${"&IsSortByUpdatedDate=" + affterUpdated}` : "";
  return await axios
    .get(API_URL + "paging?pageSize=10" + query)
    .then((response) => response.data);
}
export async function GetAssetsPagingFilter(filter) {
  console.log("filter start");
  var query = filter.keyword ? `${"&keyword=" + filter.keyword}` : "";
  query += filter.statesFilter
    ? `${"&statesFilter=" + filter.statesFilter}`
    : "";
  query += filter.categoriesFilter
    ? `${"&categoriesFilter=" + filter.categoriesFilter}`
    : "";
  query += filter.sortBy ? `${"&sortBy=" + filter.sortBy}` : "";
  query += filter.IsSortByCreatedDate
    ? `${"&IsSortByCreatedDate=" + filter.IsSortByCreatedDate}`
    : "";
  query += filter.IsSortByUpdatedDate
    ? `${"&IsSortByUpdatedDate=" + filter.IsSortByUpdatedDate}`
    : "";
  query += filter.pageIndex ? `${"&pageIndex=" + filter.pageIndex}` : "";
  query += filter.sortBy ? `${"&sortBy=" + filter.sortBy}` : "";
  query += filter.isAscending ? `${"&isAscending=" + filter.isAscending}` : "";
  return await axios
    .get(API_URL + "paging?pageSize=10" + query)
    .then((response) => response.data);
}
