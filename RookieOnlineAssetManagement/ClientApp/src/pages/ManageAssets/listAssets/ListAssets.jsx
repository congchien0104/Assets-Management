import React from "react";
import { Table, Button } from "react-bootstrap";
import { MdEdit } from "react-icons/md";
import { CgCloseO } from "react-icons/cg";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { GetAssetsPaging, GetAssetState } from "../../../services/assetService";
const ListAssets = () => {
  const [states, setStates] = useState([]);
  const [assets, setAssets] = useState([]);
  useEffect(() => {
    GetAssetsPaging()
      .then((response) => setAssets([...response.items]))
      .catch((error) => console.log(error));
  }, []);
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
        return "WaitingForRecycling";
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
      <div style={{ padding: "120px" }}>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            width: "1000px",
            paddingBottom: "20px",
          }}
        >
          <div
            style={{ color: "#dc3545", fontSize: "25px", fontWeight: "bold" }}
          >
            Asset List
          </div>
          <Link to="/asset/new">
            <Button variant="danger">Create new asset</Button>
          </Link>
        </div>
        <Table style={{ width: "1000px" }}>
          <thead>
            <tr>
              <th>Asset Code</th>
              <th>Asset Name</th>
              <th>Category</th>
              <th>State</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {assets &&
              assets.map((asset) => (
                // <option value={categories.id}>{categories.name}</option>
                <tr>
                  <td>{asset.code}</td>
                  <td>{asset.name}</td>
                  <td>{asset.category.name}</td>
                  <td>{StateToString(asset.state)}</td>
                  <td>
                    <Link
                      to={{
                        pathname: `${
                          asset.state === 1
                            ? "/assets"
                            : "/asset/edit/" + asset.id
                        }`,
                      }}
                    >
                      <MdEdit
                        style={{
                          color: "#808080",
                          fontSize: "20px",
                          marginRight: "20px",
                          cursor: `${
                            asset.state === 1 ? "default" : "pointer"
                          }`,
                        }}
                      />
                    </Link>

                    <CgCloseO
                      style={{
                        color: "#dc3545",
                        fontSize: "20px",
                        cursor: "pointer",
                      }}
                    />
                  </td>
                </tr>
              ))}
          </tbody>
        </Table>
      </div>
    </React.Fragment>
  );
};

export default ListAssets;
