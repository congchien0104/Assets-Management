import axios from "axios";

const API_URL = "/api/reports";
export async function GetReport(sortBy, isAscending) {
    var query = sortBy !== null ? `${"?sortBy=" + sortBy}` : "?sortBy=category";
    query += isAscending === false ? `${"&isAscending=false"}` : "";
    return await axios
        .get(API_URL + query)
        .then((response) => response.data);
}
