import axios from "axios";

const API_URL = "/api/returnRequests/";

export async function GetDetail(id) {
    return await axios.get(API_URL + `${id}`).then((response) => response.data);
}
export async function GetRequestState() {
    return await axios.get(API_URL + "states").then((response) => response.data);
}
export async function GetReturnRequestPagingFilter(filter) {
    var query = filter.pageIndex ? `${"&pageIndex=" + filter.pageIndex}` : "";
    query += filter.isAscending === false ? `${"&isAscending=false"}` : "";
    query += filter.keyword ? `${"&keyword=" + filter.keyword}` : "";
    query += filter.statesFilter
        ? `${"&statesFilter=" + filter.statesFilter}`
        : "";
    query += (filter.returnedDateFilter !== undefined && filter.returnedDateFilter !== null)
        ? `${"&returnedDateFilter=" + filter.returnedDateFilter}`
        : "";
    query += filter.sortBy ? `${"&sortBy=" + filter.sortBy}` : "";
    return await axios
        .get(API_URL + "paging?pageSize=10" + query)
        .then((response) => response.data);
}