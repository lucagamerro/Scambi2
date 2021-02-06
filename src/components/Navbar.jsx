import React from 'react';
import { Link } from "react-router-dom";

function Navbar(props) {

    return (
        <div>
            <nav className="navbar navbar-expand-lg navbar-dark">
            <div className="container-fluid">
                <Link to="/" className="navbar-brand fs-4">Scambi</Link>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                    <li className="nav-item">
                        {props.auth ? <Link to="/" className="nav-link active">Home</Link> : <small className="nav-link">gasquemais</small>}
                    </li>
                    <li className="nav-item">
                        {props.auth ? <Link to="/new" className="nav-link">Nuovo</Link> : <p></p>}
                    </li>
                    <li className="nav-item">
                        {props.auth ? <Link to="/" className="nav-link" onClick={() =>  props.setAuth(false)}>Logout</Link> : <p></p>}
                    </li>
                </ul>
                </div>
            </div>
            </nav>
        </div>
    );
}

export default Navbar;