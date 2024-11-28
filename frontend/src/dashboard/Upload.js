import axios from 'axios';
import React, { Fragment, useEffect, useState } from 'react'

function Upload() {

    const [files, setfiles] = useState([]);
    const [data, setdata] = useState([]);

    const getfiles = (e) => {
        setfiles(e.target.files);
        if (e.target.files.length > 10) {
            alert('limit exceeded');
        }
    }

    console.log(files);

    const handleupload = async () => {
        const formdata = new FormData();
        Array.from(files).forEach(element => {
            formdata.append('files', element);
        });
        try {
            const response = await axios.post('http://localhost:3500/upload', formdata);
            console.log(response);
            getdata();
        } catch (err) {
            console.log(err);
        }
    }

    const getdata = async () => {
        try {
            const response = await axios.get('http://localhost:3500/getfiles');
            console.log(response.data);
            setdata(response.data);
        } catch (err) {
            console.log(err);
        }
    }

    useEffect(() => {
        getdata();
    }, []);

    return (
        <Fragment>
            <h1>Upload</h1>
            <input type="file" accept='image/*' onChange={getfiles} multiple />
            <button onClick={handleupload}>upload</button>

            {data ? data.map((e) => (
                <div>
                    <h1>jdhf</h1>
                    <img src={`http://localhost:3500${e.path}`} />
                </div>

            )) : <p>loadind</p>}
        </Fragment>
    )
}

export default Upload