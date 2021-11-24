import React, { useEffect, useState } from "react";
import { Table, Button } from 'react-bootstrap';
import { MdEdit } from 'react-icons/md';
import { CgCloseO } from 'react-icons/cg';
import { Link } from "react-router-dom";

import userService from "../../services/user.service";

const Users = () => {
    const [users , setUsers] = useState([]);
    useEffect(() => {
        userService.getUserFilter()
            .then((response) =>{
                setUsers(response.data.items);
                console.log(response.data.items);
            })
            .catch((e) => {
                console.log(e);
              });
      }, []);
    return (
        <React.Fragment>
        <div style={{ padding: '120px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', width: '1000px', paddingBottom: '20px' }}>
            <div style={{ color: '#dc3545', fontSize: '25px', fontWeight: 'bold' }}>Asset List</div>
            <Link to="/users/add">
                <Button variant="danger">Create new User</Button>
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
                        <tr key={index}>
                            <td>{user.code}</td>
                            <td>{user.firstName}</td>
                            <td>{user.userName}</td>
                            <td>{user.joinedDate}</td>
                            <td>{user.type}</td>
                            <td>
                                <Link
                                to={`/users/${index + 1}`}
                                >
                                    <MdEdit style={{ color: '#808080', fontSize: '20px', marginRight: '20px', cursor: 'pointer' }} />
                                </Link>
                                <CgCloseO style={{ color: '#dc3545', fontSize: '20px', cursor: 'pointer' }} />
                            </td>
                        </tr>
                    ))
                }
            </tbody>
            </Table>
        </div>
    </React.Fragment>
    )
}

export default Users
