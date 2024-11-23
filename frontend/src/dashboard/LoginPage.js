import axios from 'axios';
import React, { Fragment, useState } from 'react'

function LoginPage() {

    const [data, setData] = useState();

    const getdata = (e) => {
        setData({
            ...data,
            [e.target.name]: e.target.value
        })
        console.log(data);
    };

    const handlelogin = async () => {
        try {
            const response = await axios.post('http://localhost:3500/login', data);
            console.log(response.data);
            if (response.status === 350) {
                alert("login successful");
            } else {
                alert('invalid username/password');
            }
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
                            <input type='email' placeholder='Email' className='form-control mt-4' name='email' onChange={getdata} />
                            <input type='password' placeholder='Password' className='form-control mt-3' name='password' onChange={getdata} />
                            <button className='btn btn-primary mt-3' onClick={handlelogin}>Login</button>
                        </div>
                    </div>
                </div>
            </div>
        </Fragment>
    )
}

export default LoginPage