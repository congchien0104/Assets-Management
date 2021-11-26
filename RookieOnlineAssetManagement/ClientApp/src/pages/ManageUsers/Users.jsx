import React, { useEffect, useState } from "react";
import { Table, Button, Modal, ButtonGroup, Dropdown } from 'react-bootstrap';
import { MdEdit } from 'react-icons/md';
import { CgCloseO } from 'react-icons/cg';
import { Link } from "react-router-dom";
import Pagination from 'react-responsive-pagination';


import userService from "../../services/user.service";

const Users = () => {
    const [users , setUsers] = useState([]);
    const [isDeleting, setIsDeleting] = useState(false);
    const [isDeletingError, setIsDeletingError] = useState(false);
    const [idDeletingUser, setIdDeletingUser] = useState();

    // Pagination
    const totalPages = 5;
    const [currentPage, setCurrentPage] = useState(1);

    function handlePageChange(page) {
        setCurrentPage(page);
        // ... do something with `page`
        console.log(page);
    }


    useEffect(() => {
        userService.getUserFilter(currentPage)
            .then((response) =>{
                setUsers(response.data.items);
                console.log(response.data.items);
            })
            .catch((e) => {
                console.log(e);
              });
      }, [currentPage]);


    const handleDisabled = () => {
        var user = users.find((a) => a.id === idDeletingUser);
        if (user.isHistory) {
            userService.disabled(user.id)
                .then((response) =>{
                    setIsDeleting(false);
                    console.log(response.data);
                })
                .catch((e) => {
                    setIsDeleting(false);
                    setIsDeletingError(true);
                });
            setIsDeleting(false);
        } else {
            setIsDeleting(false);
            setIsDeletingError(true);
        }
    }
    const showDetails = (user) =>{
        console.log(user);
    }
    return (
        <React.Fragment>
        <div style={{ padding: '120px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', width: '1000px', paddingBottom: '20px' }}>
            <div style={{ color: '#dc3545', fontSize: '25px', fontWeight: 'bold' }}>User List</div>
            <Link to="/users/add">
                <Button variant="danger">Create New User</Button>
            </Link>
            </div>
            <Table style={{ width: '1000px' }}>
                <thead>
                    <tr>
                    <th>Staff Code</th>
                    <th>Full Name</th>
                    <th>Username</th>
                    <th>Joined Date</th>
                    <th>Type</th>
                    </tr>
                </thead>
                <tbody>
                    { users &&
                        users.map((user, index) => (
                            <tr key={index} onClick={showDetails(user)}>
                                <td>{user.code}</td>
                                <td>{user.firstName} {user.lastName}</td>
                                <td>{user.userName}</td>
                                <td>{formatDate(user.joinedDate)}</td>
                                <td>{user.type === 1 ? "Staff" : "Admin"}</td>
                                <td>
                                    <Link
                                    to={`/users/${user.id}`}
                                    >
                                        <MdEdit style={{ color: '#808080', fontSize: '20px', marginRight: '20px', cursor: 'pointer' }} />
                                    </Link>
                                    <CgCloseO onClick={(e) => {
                                                    setIdDeletingUser(user.id);
                                                    setIsDeleting(true);
                                                }}
                                        style={{ color: '#dc3545', fontSize: '20px', cursor: 'pointer' }} />
                                </td>
                            </tr>
                        ))
                    }
                </tbody>
            </Table>
            <div style={{
                display: 'flex',
                justifyContent: 'flex-end',
                width: '1000px',
                marginTop: '30px'
            }}>
                <Pagination
                    total={totalPages}
                    current={currentPage}
                    previousLabel="Previous"
                    nextLabel="Next"
                    onPageChange={page => handlePageChange(page)}
                />
            </div>
        </div>
        <Modal show={isDeleting} centered>
                <Modal.Header style={{ backgroundColor: "#DDE1E5" }}>
                    <Modal.Title
                        style={{ fontSize: "20px", fontWeight: "bold", color: "#dc3545" }}
                    >
                        Are you sure?
                    </Modal.Title>
                </Modal.Header>

                <Modal.Body>
                    <p>Do you want to diable this user ?</p>
                </Modal.Body>

                <Modal.Footer>
                    <Button
                        style={{
                        backgroundColor: "#dc3545",
                        border: "1px solid #dc3545",
                        borderRadius: "4px",
                        }}
                        onClick={() => handleDisabled()}
                    >
                        Disable
                    </Button>
                    <Button
                        style={{
                        backgroundColor: "#FFF",
                        border: "1px solid #808080",
                        borderRadius: "4px",
                        color: "#808080",
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
                <Modal.Header
                style={{ backgroundColor: "#DDE1E5", paddingLeft: "40px" }}
                >
                <Modal.Title
                    style={{ fontSize: "20px", fontWeight: "bold", color: "#dc3545" }}
                >
                    Can not disable user
                </Modal.Title>
                <CgCloseO  onClick={() => setIsDeletingError(false)} style={{ color: '#dc3545', fontSize: '20px', cursor: 'pointer' }} />
                </Modal.Header>

                <Modal.Body style={{ padding: "20px", paddingLeft: "40px" }}>
                <p>There are valid assignments belonging to this user. Please close all assignments before disabling user.</p>
                </Modal.Body>
            </Modal>
    </React.Fragment>
    )
}


const formatDate = (date) => {
    var d = new Date(date),
      month = "" + (d.getMonth() + 1),
      day = "" + d.getDate(),
      year = d.getFullYear();

    if (month.length < 2) month = "0" + month;
    if (day.length < 2) day = "0" + day;

    return [day, month, year].join("/");
};

export default Users