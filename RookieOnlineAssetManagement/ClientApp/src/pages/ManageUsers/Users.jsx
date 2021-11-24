import React from 'react';
import { Table, Button } from 'react-bootstrap';
import { MdEdit } from 'react-icons/md';
import { CgCloseO } from 'react-icons/cg';
import { Link } from "react-router-dom";

const Users = () => {
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
                <tr>
                <td>SD0011</td>
                <td>Default: userId = 11</td>
                <td>Default: userId = 11</td>
                <td>Default: userId = 11</td>
                <td>Default: userId = 11</td>
                <td>
                    <Link
                      to={{
                        pathname: "/users/11",
                      }}
                    >
                        <MdEdit style={{ color: '#808080', fontSize: '20px', marginRight: '20px', cursor: 'pointer' }} />
                    </Link>
                    <CgCloseO style={{ color: '#dc3545', fontSize: '20px', cursor: 'pointer' }} />
                </td>
                </tr>
            </tbody>
            </Table>
        </div>
    </React.Fragment>
    )
}

export default Users
