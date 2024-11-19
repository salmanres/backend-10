import React, { Fragment, useEffect, useState } from 'react'
import axios from 'axios'

function RegisterPage() {

    const [data, setData] = useState();
    const data1 = { "username": "ravi", "password": "12345" };

    // const getdata = async () => {
    //     try {
    //         const response = await axios.get('http://localhost:3500/userdata');
    //         console.log(response.data);
    //         console.log("hello");
    //         setData(response.data);
    //     } catch (err) {
    //         console.log(err);
    //     }
    // }

    const getdata = async () => {
        try {
            const response = await axios.post('http://localhost:3500/login', {
                "username":"rav",
                "password":"12345"
            });
            console.log(response);
            alert(response.status);
            alert(response.data.message);
                       
        } catch (err) {
            console.log(err);
        }
    }

    useEffect(() => {
        getdata();
    }, []);

    return (
        <Fragment>
            <div className='container-fluid'>
                <div className='row justify-content-center'>
                    <div className='col-lg-5 col-md-6 col-sm-7 col-11 justify-content-center text-center register-wrapper shadow border mt-5'>
                        <div className='form-group p-3'>
                            <input type='text' placeholder='Full Name' className='form-control mt-4 ' />
                            <input type='email' placeholder='Email' className='form-control mt-3' />
                            <input type='password' placeholder='Password' className='form-control mt-3' />
                            <input type='password' placeholder='Confirm Password' className='form-control mt-3' />
                            <input type='date' placeholder='Date of Birth' className='form-control mt-3' />
                            <input type='text' placeholder='Address' className='form-control mt-3' />
                            <select className='form-control mt-3'>
                                <option>Gender</option>
                                <option>Male</option>
                                <option>Female</option>
                            </select>
                            <button className='btn btn-primary mt-3 w-100 p-2'><b>REGISTER</b></button>
                        </div>
                    </div>
                </div>
            </div>
        </Fragment>
    )
}

export default RegisterPage