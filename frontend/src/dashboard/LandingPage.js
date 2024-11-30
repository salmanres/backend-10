import axios from 'axios'
import React, { Fragment, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

function LandingPage() {



    return (
        <Fragment>
            <Link to='/register'>REGISTER</Link>
            <br />
            <Link to='/login'>login</Link>
            <br />
            <Link to='/userlist'>user list</Link>
            <br />
            <Link to='/whatsapp'>whatsapp</Link>
            <br />
            <Link to='/upload'>upload</Link>\
            <br />
            <Link to='/form'>upload</Link>
        </Fragment>
    )
}

export default LandingPage