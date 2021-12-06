import React, { useState, useEffect } from "react";
import { Table, Modal, Button, FormControl, InputGroup } from "react-bootstrap";
import { BsSearch } from "react-icons/bs";
import { GoTriangleDown } from "react-icons/go";
import { GetAssetsPagingFilter } from "../../services/assetService";
import Pagination from "react-responsive-pagination";
import "./style.css"

const SelectAssets = (props) => {
  const [assets, setAssets] = useState([]);
  const [selectedAssetId, setSelectedAssetId] = useState(0);
  const [isFilter, setIsFilter] = useState(false);
  const [isSearch, setIsSearch] = useState(false);
  const [isAscending, setIsAscending] = useState(true);
  const [sortBy, setSortBy] = useState("code");
  const [keyword, setKeyword] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState();
  const [searchFilterModel, setSearchFilterModel] = useState({});

  const handleSearch = () => {
    setIsSearch(true);
    setCurrentPage(1);
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleSave = () => {
    const name = assets.filter((x) => x.id == selectedAssetId)[0].name;
    props.setValue(selectedAssetId);
    props.setLabel(name);
    props.setIsOpenSelectAssets(false);
  };
  useEffect(() => {
    setSearchFilterModel({
      ...searchFilterModel,
      keyword: keyword,
      sortBy: sortBy,
      isAscending: isAscending,
      pageIndex: currentPage,
    });
    setIsFilter(true);
  }, [currentPage, isSearch, sortBy, isAscending]);

  useEffect(() => {
    GetAssetsPagingFilter(searchFilterModel)
      .then((response) => {
        setAssets([...response.items]);
        setIsFilter(false);
        setIsSearch(false);
        setTotalPages(response.pageCount);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [isFilter]);

  return (
    <Modal
      dialogClassName="custom-modal"
      show={props.isOpenSelectUsers}
      style={{ top: "100px", left: "-50px" }}
    >
      <Modal.Body style={{ padding: "20px" }}>
        <div>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              marginBottom: "20px",
            }}
          >
            <div
              style={{
                color: "#dc3545",
                fontSize: "20px",
                fontWeight: "bold",
              }}
            >
              Select Asset
            </div>
            <InputGroup style={{ width: "300px" }}>
              <FormControl
                type="search"
                placeholder="Search"
                value={keyword}
                onChange={(e) => setKeyword(e.target.value)}
              />
              <Button
                style={{ backgroundColor: "#FFF", borderColor: "#ced4da" }}
              >
                <BsSearch
                  style={{ color: "#000", marginBottom: "3px" }}
                  onClick={handleSearch}
                />
              </Button>
            </InputGroup>
          </div>
          <Table style={{ height: '500px' }}>
            <thead>
              <tr>
                <th style={{ width: "50px" }}></th>
                <th>
                  Asset Code
                  <GoTriangleDown
                    style={{ marginLeft: "5px", cursor: "pointer" }}
                    onClick={() => {
                      setIsAscending(!isAscending);
                      setSortBy("code");
                    }}
                  />
                </th>
                <th>
                  Asset Name
                  <GoTriangleDown
                    style={{ marginLeft: "5px", cursor: "pointer" }}
                    onClick={() => {
                      setIsAscending(!isAscending);
                      setSortBy("name");
                    }}
                  />
                </th>
                <th>
                  Category
                  <GoTriangleDown
                    style={{ marginLeft: "5px", cursor: "pointer" }}
                    onClick={() => {
                      setIsAscending(!isAscending);
                      setSortBy("category");
                    }}
                  />
                </th>
              </tr>
            </thead>
            <tbody>
              {assets &&
                assets.map((asset, index) => (
                  <tr key={index}>
                    <td style={{ width: "50px" }}>
                      <input
                        type="radio"
                        value={asset.id}
                        name="userId"
                        onChange={(e) => setSelectedAssetId(e.target.value)}
                      />
                    </td>
                    <td>{asset.code}</td>
                    <td>{asset.name}</td>
                    <td>{asset.category.name}</td>
                  </tr>
                ))}
            </tbody>
          </Table>
          <div
            style={{
              display: "flex",
              justifyContent: "flex-end",
              width: "100%",
              marginTop: "10px",
              marginBottom: '20px'
            }}
          >
            <Pagination
              total={totalPages}
              current={currentPage}
              previousLabel="Previous"
              nextLabel="Next"
              onPageChange={(page) => handlePageChange(page)}
            />
          </div>
          <div style={{ display: "flex", justifyContent: "end" }}>
            <Button
              style={{
                backgroundColor: "#dc3545",
                border: "1px solid #dc3545",
                borderRadius: "4px",
                marginRight: "20px",
              }}
              onClick={handleSave}
              disabled={selectedAssetId === 0 ? true : false}
            >
              Save
            </Button>
            <Button
              style={{
                backgroundColor: "#FFF",
                border: "1px solid #808080",
                borderRadius: "4px",
                color: "#808080",
              }}
              onClick={() => props.setIsOpenSelectAssets(false)}
            >
              Cancel
            </Button>
          </div>
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default SelectAssets;
