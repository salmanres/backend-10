import React, { Fragment, useEffect } from 'react'
import { Link } from 'react-router-dom'

function LandingPage() {

    

    return (
        <Fragment>
            <Link to='/register'>REGISTER</Link>
            <Link to='/login'>login</Link>
        </Fragment>
    )
}

export default LandingPage