import React, { Fragment, useEffect, useState } from 'react'
import axios from 'axios'

function RegisterPage() {

    const [user, setUser] = useState();

    const getData = (event) => {
        setUser({
            ...user,
            [event.target.name]: event.target.value
        })
        console.log(user);
    };

    const submitData = async () => {
        try {
            const response = await axios.post('http://localhost:3500/register', user);
            console.log(response.data);
            alert(response.data.message);
        } catch (err) {
            console.log(err);
        }
    }

    return (
        <Fragment>
            <div className='container-fluid'>
                <div className='row justify-content-center'>
                    <div className='col-lg-5 col-md-6 col-sm-7 col-11 justify-content-center text-center register-wrapper shadow border mt-5'>
                        <div className='form-group p-3'>
                            <input type='text' placeholder='Full Name' className='form-control mt-4' name='fullname' onChange={getData} />
                            <input type='email' placeholder='Email' className='form-control mt-3' name='email' onChange={getData} />
                            <input type='password' placeholder='Password' className='form-control mt-3' name='password' onChange={getData} />
                            <input type='date' placeholder='Date of Birth' className='form-control mt-3' name='dob' onChange={getData} />
                            <input type='text' placeholder='Address' className='form-control mt-3' name='address' onChange={getData} />
                            <select className='form-control mt-3' name='gender' onChange={getData}>
                                <option>Gender</option>
                                <option>Male</option>
                                <option>Female</option>
                            </select>
                            <button className='btn btn-primary mt-3 w-100 p-2' onClick={submitData}><b>REGISTER</b></button>
                        </div>
                    </div>
                </div>
            </div>
        </Fragment>
    )
}

export default RegisterPage