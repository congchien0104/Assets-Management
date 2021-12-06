import React from "react";
import { Table, Button } from "react-bootstrap";
import { useState, useEffect } from "react";
import { GetReport } from "../../services/reportService";
import { GoTriangleDown } from "react-icons/go";
import { Link } from "react-router-dom";
const ListReports = () => {
  const [reports, setReports] = useState([]);
  const [isAscending, setIsAscending] = useState(true);
  const [sortBy, setSortBy] = useState("category");

  useEffect(() => {
    GetReport(sortBy, isAscending)
      .then((response) => {
        setReports([...response]);
      })
      .catch((error) => console.log(error));
  }, [sortBy, isAscending]);
  const StateToString = (state) => {
    switch (state) {
      case 0:
        return "Available";
        break;
      case 1:
        return "Not Available";
        break;
      case 2:
        return "Assigned";
        break;
      case 3:
        return "Waiting For Recycling";
        break;
      case 4:
        return "Recycled";
        break;
      default:
        return "Unknown";
        break;
    }
  };

  return (
    <React.Fragment>
      <div style={{ padding: "100px 50px" }}>
        <div
          style={{
            color: "#dc3545",
            fontSize: "25px",
            fontWeight: "bold",
            marginBottom: "25px",
          }}
        >
          Report
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "flex-end",
            alignItems: "center",
            paddingBottom: "20px",
          }}
        >
          <Link to="">
            <Button variant="danger">Export</Button>
          </Link>
        </div>

        <Table
          style={{
            height: "400px",
            overflowX: "auto",
            overflowY: "hidden",
          }}
        >
          <thead>
            <tr>
              <th>
                Category
                <GoTriangleDown
                  style={{ cursor: "pointer" }}
                  onClick={() => {
                    setIsAscending(!isAscending);
                    setSortBy("category");
                  }}
                ></GoTriangleDown>
              </th>
              <th>
                Total
                <GoTriangleDown
                  style={{ cursor: "pointer" }}
                  onClick={() => {
                    setIsAscending(!isAscending);
                    setSortBy("total");
                  }}
                ></GoTriangleDown>
              </th>
              <th>
                Assigned
                <GoTriangleDown
                  style={{ cursor: "pointer" }}
                  onClick={() => {
                    setIsAscending(!isAscending);
                    setSortBy("assigned");
                  }}
                ></GoTriangleDown>
              </th>
              <th>
                Available
                <GoTriangleDown
                  style={{ cursor: "pointer" }}
                  onClick={() => {
                    setIsAscending(!isAscending);
                    setSortBy("available");
                  }}
                ></GoTriangleDown>
              </th>
              <th>
                Not Available
                <GoTriangleDown
                  style={{ cursor: "pointer" }}
                  onClick={() => {
                    setIsAscending(!isAscending);
                    setSortBy("notAvailable");
                  }}
                ></GoTriangleDown>
              </th>
              <th>
                Waiting For Recycling
                <GoTriangleDown
                  style={{ cursor: "pointer" }}
                  onClick={() => {
                    setIsAscending(!isAscending);
                    setSortBy("waitingForRecycling");
                  }}
                ></GoTriangleDown>
              </th>
              <th>
                Recycled
                <GoTriangleDown
                  style={{ cursor: "pointer" }}
                  onClick={() => {
                    setIsAscending(!isAscending);
                    setSortBy("recycled");
                  }}
                ></GoTriangleDown>
              </th>
            </tr>
          </thead>
          <tbody>
            {reports &&
              reports.map((report) => (
                <tr>
                  <td>{report.category}</td>
                  <td>{report.total}</td>
                  <td>{report.assigned}</td>
                  <td>{report.available}</td>
                  <td>{report.notAvailable}</td>
                  <td>{report.waitingForRecycling}</td>
                  <td>{report.recycled}</td>
                </tr>
              ))}
          </tbody>
        </Table>
      </div>
    </React.Fragment>
  );
};

export default ListReports;
