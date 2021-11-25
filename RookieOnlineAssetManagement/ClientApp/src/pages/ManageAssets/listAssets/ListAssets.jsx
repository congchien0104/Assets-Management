import React from "react";
import { Modal, Table, Button, FormControl, InputGroup } from "react-bootstrap";
import { MdEdit, MdOutlineCancelPresentation } from "react-icons/md";
import { CgCloseO } from "react-icons/cg";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { GetAssetsPaging, GetAssetState, GetAllCategories, Delete } from "../../../services/assetService";
import { MultiSelect } from "react-multi-select-component";
import { HiFilter } from 'react-icons/hi';
import { BsSearch } from 'react-icons/bs';
import Pagination from 'react-responsive-pagination';
import queryString from "query-string";

const ListAssets = () => {

  const [states, setStates] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedState, setSelectedState] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState([]);
  const [assets, setAssets] = useState([]);
  const [isDeleting, setIsDeleting] = useState(false);
  const [isDeletingError, setIsDeletingError] = useState(false);
  const [idDeletingAsset, setIdDeletingAsset] = useState();
  const { search } = useLocation();
  const { IsSortByCreateDate, IsSortByUpdatedDate } = queryString.parse(search);

  useEffect(() => {
    GetAssetState()
      .then((response) => {
        const arrState = response.map(x => ({value: x.value, label: x.name}));
        setStates(arrState)
      })
      .catch((error) => console.log(error));

    GetAllCategories()
      .then((response) => {
        const arrCategory = response.map(x => ({value: x.code, label: x.name}));
        setCategories(arrCategory)
      })
      .catch((error) => console.log(error));
    
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
  const handleDelete = () => {
    var asset = assets.find((a) => a.id === idDeletingAsset);
    console.log(asset);
    if (asset.histories === null) {
      Delete(idDeletingAsset)
        .then((res) => {
          GetAssetsPaging()
            .then((response) => setAssets([...response.items]))
            .catch((error) => console.log(error));
        })
        .catch((error) => {
          setIsDeleting(false);
          setIsDeletingError(true);
        });
      setIsDeleting(false);
    } else {
      setIsDeleting(false);
      setIsDeletingError(true);
    }
  };
  return (
    <React.Fragment>
      <div style={{ padding: "120px" }}>
        <div
          style={{ color: "#dc3545", fontSize: "25px", fontWeight: "bold", marginBottom: '25px' }}
        >
          Asset List
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: 'center',
            width: "1000px",
            paddingBottom: "20px",
          }}
        >
          
          <div style={{ width: '200px' }}>
            <MultiSelect
              options={states}
              value={selectedState}
              onChange={setSelectedState}
              labelledBy="State"
              disableSearch={true}
              valueRenderer={() => 'State'}
              ArrowRenderer={() => 
                <div style={{ borderLeft: '1px solid #ccc', height: '40px', paddingLeft: '10px' }}>
                  <HiFilter style={{ fontSize: '18px', marginTop: '12px' }} />
                </div>}
              ClearSelectedIcon={() => ''}
            />
          </div>

          <div style={{ width: '200px' }}>
            <MultiSelect
              options={categories}
              value={selectedCategory}
              onChange={setSelectedCategory}
              labelledBy="Category"
              disableSearch={true}
              valueRenderer={() => 'Category'}
              ArrowRenderer={() => 
                <div style={{ borderLeft: '1px solid #ccc', height: '40px', paddingLeft: '10px' }}>
                  <HiFilter style={{ fontSize: '18px', marginTop: '12px' }} />
                </div>}
              ClearSelectedIcon={() => ''}
            />
          </div>

          <InputGroup style={{ width: '250px' }}>
            <FormControl
              type="search"
              placeholder="Search"
            />
            <Button style={{ backgroundColor: '#FFF', borderColor: '#ced4da' }}><BsSearch style={{ color: '#000', marginBottom: '3px' }} /></Button>
          </InputGroup>

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
                          StateToString(asset.state) === "Assigned"
                            ? "/assets"
                            : "/asset/edit/" + asset.id
                        }`,
                      }}
                    >
                      <MdEdit
                        style={{
                          color: `${
                            StateToString(asset.state) === "Assigned"
                              ? "#808080"
                              : "#000"
                          }`,
                          fontSize: "20px",
                          marginRight: "20px",
                          cursor: `${
                            StateToString(asset.state) === "Assigned"
                              ? "default"
                              : "pointer"
                          }`,
                        }}
                      />
                    </Link>
                    <CgCloseO
                      onClick={(e) => {
                        setIdDeletingAsset(asset.id);
                        setIsDeleting(true);
                      }}
                      value={asset.id}
                      style={{
                        color: `${
                          StateToString(asset.state) === "Assigned"
                            ? "#f2a7ac"
                            : "#dc3545"
                        }`,
                        fontSize: "20px",
                        cursor: `${
                          StateToString(asset.state) === "Assigned"
                            ? "default"
                            : "pointer"
                        }`,
                      }}
                    />
                  </td>
                </tr>
              ))}
          </tbody>
        </Table>
        <div style={{
            display: 'flex',
            justifyContent: 'flex-end',
            width: '1000px',
            marginTop: '30px'
        }}>
          <Pagination
            current={1}
            total={3}
            onPageChange={() => {}}
            previousLabel="Previous"
            nextLabel="Next"
          />
        </div>
      </div>
      <Modal show={isDeleting} centered>
        <Modal.Header style={{ backgroundColor: "#DDE1E5" }}>
          <Modal.Title
            style={{
              fontSize: "20px",
              fontWeight: "bold",
              color: "#dc3545",
              marginLeft: "20px",
            }}
          >
            Are you sure?
          </Modal.Title>
        </Modal.Header>

        <Modal.Body
          style={{
            marginLeft: "20px",
          }}
        >
          <p>Do you want to delete this asset</p>
        </Modal.Body>

        <Modal.Footer
          style={{ justifyContent: "flex-start", marginLeft: "20px" }}
        >
          <Button
            style={{
              backgroundColor: "#dc3545",
              border: "1px solid #dc3545",
              borderRadius: "4px",
            }}
            onClick={(e) => handleDelete(e)}
          >
            Delete
          </Button>
          <Button
            style={{
              backgroundColor: "#FFF",
              border: "1px solid rgb(89 86 86)",
              borderRadius: "4px",
              color: "black",
              marginLeft: "20px",
            }}
            onClick={() => {
              setIsDeleting(false);
            }}
          >
            Cancel
          </Button>
        </Modal.Footer>
      </Modal>
      <Modal show={isDeletingError} centered>
        <Modal.Header style={{ backgroundColor: "#DDE1E5" }}>
          <Modal.Title
            style={{
              fontSize: "20px",
              fontWeight: "bold",
              color: "#dc3545",
              marginLeft: "20px",
            }}
          >
            Cannot Delete Asset
          </Modal.Title>
          <MdOutlineCancelPresentation
            onClick={() => {
              setIsDeletingError(false);
            }}
            style={{
              color: "#dc3545",
              fontSize: "20px",
              cursor: "pointer",
            }}
          />
        </Modal.Header>

        <Modal.Body
          style={{
            marginLeft: "20px",
            display: "inline",
          }}
        >
          <p
            style={{
              display: "inline",
            }}
          >
            Cannot delete the asset because it belongs to one or more historical
            assignments.
            <br />
            If the asset is not able to be used anymore, please update its state
            in&nbsp;
            <Link
              style={{
                display: "inline",
              }}
              to={{
                pathname: `${"/asset/edit/" + idDeletingAsset}`,
              }}
            >
              Edit Asset Page
            </Link>
          </p>
        </Modal.Body>
      </Modal>
    </React.Fragment>
  );
};

export default ListAssets;
