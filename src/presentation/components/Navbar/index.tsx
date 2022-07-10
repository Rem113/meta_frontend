import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import * as classes from './Navbar.module.scss'

const Navbar: React.FC<null> = () => {
    const location = useLocation()
    const path = location.pathname

    return (
        <div className={classes.container}>
            <Link className={classes.logo} to={'/'}>
                Meta
            </Link>
            <nav>
                <Link
                    className={`${
                        path.startsWith('/environments') ? classes.active : ''
                    }`}
                    to={'/environments'}
                >
                    Environments
                </Link>
                <Link
                    className={`${
                        path.startsWith('/images') ? classes.active : ''
                    }`}
                    to={'/images'}
                >
                    Images
                </Link>
                <Link
                    className={`${
                        path.startsWith('/scenarios') ? classes.active : ''
                    }`}
                    to={'/scenarios'}
                >
                    Scenarios
                </Link>
                <Link
                    className={`${
                        path.startsWith('/suites') ? classes.active : ''
                    }`}
                    to={'/suites'}
                >
                    Suites
                </Link>
            </nav>
        </div>
    )
}

export default Navbar
