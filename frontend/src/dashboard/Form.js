import axios from 'axios';
import React, { Fragment, useState } from 'react'

function Form() {

    const [data, setdata] = useState();

    const getdata = (e) => {
        setdata({
            ...data,
            [e.target.name]: e.target.value
        })
        console.log(data);
    }

    const sendemail = async () => {
        try {
            const response = await axios.post('http://localhost:3500/sendemail', data);
            console.log(response);
        } catch (err) {
            console.log(err);
        }
    }

    return (
        <Fragment>
            <input type='text' placeholder='email' onChange={getdata} name='email' />
            <br />
            <input type='text' placeholder='subject' onChange={getdata} name='subject' />
            <br />
            <input type='text' placeholder='message' onChange={getdata} name='message' />
            <br />
            <button onClick={sendemail}>send</button>
        </Fragment>
    )
}

export default Form