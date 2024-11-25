import axios from 'axios';
import React, { Fragment, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

function EditData() {

    const { id } = useParams();
    console.log(id);

    const [userData, setUserData] = useState();

    const getdata = async () => {
        try {
            const response = await axios.get(`http://localhost:3500/getsingledata/${id}`);
            console.log(response.data);
            setUserData(response.data);
        } catch (err) {
            console.log(err);
        }
        // console.log(userData);
    }

    const getnewdata = (event) => {
        setUserData({
            ...userData,
            [event.target.name]: event.target.value
        });
        console.log(userData);
    };

    const updatedata = async () => {
        try {
            const response = await axios.put(`http://localhost:3500/editdata/${id}`, userData);
            console.log(response);
        } catch (err) {
            console.log(err);
        }
    };

        useEffect(() => {
            getdata();
        }, [])

    return (
        <Fragment>
            <div className='container-fluid'>
                <div className='row justify-content-center mt-5'>
                    <div className='col-lg-5 col-md-6 col-sm-7 col-11'>
                        <h1>edit data</h1>
                        <form>
                            <input className='form-control ' type='text' placeholder='fullname' value={userData?.fullname} onChange={getnewdata} name='fullname' />
                            <input className='form-control mt-3' type='email' placeholder='email' value={userData?.email} name='email' onChange={getnewdata} />
                            <input className='form-control mt-3' type='password' placeholder='password' value={userData?.password} name='password' onChange={getnewdata} />
                            <button onClick={updatedata}>UPDATE</button>
                        </form>

                    </div>
                </div>
            </div>
        </Fragment>
    )
}

export default EditData