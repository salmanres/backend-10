import axios from 'axios';
import React, { Fragment, useEffect, useState } from 'react'
import { Link } from 'react-router-dom';

function UserList() {

    const [data, setData] = useState();

    const getData = async () => {
        try {
            const response = await axios.get('http://localhost:3500/getdata');
            setData(response.data);
        } catch (e) {
            console.log(e);
        }
    }

    const deletedata = async (id) => {
        console.log(id);
        try {
            const response = await axios.delete(`http://localhost:3500/deletedata`, id);
            console.log(response.data);

        } catch (err) {
            console.log(err);
        }
    }


    useEffect(() => {
        getData();
    }, [])

    return (
        <Fragment>
            <h1>USER LIST</h1>
            <table>
                <thead>
                    <tr>
                        <th>
                            <td>fullname</td>
                            <td>gender</td>
                            <td>dob</td>
                            <td>email</td>
                            <td>address</td>
                            <td>action</td>
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {data ? data.map((d) => (
                        <tr>
                            <td>{d.username}</td>
                            <td>{d.gender}</td>
                            <td>{d.dob}</td>
                            <td>{d.email}</td>
                            <td>{d.address}</td>
                            <td>
                                <Link to={`/editdata/${d._id}`} className='btn btn-primary ms-2'>edit</Link>
                                <button onClick={() => deletedata(d._id)} className='btn btn-primary ms-2' >delete</button>
                            </td>
                        </tr>
                    )) : <p>loading</p>}
                </tbody>
            </table>
        </Fragment>
    )
}

export default UserList