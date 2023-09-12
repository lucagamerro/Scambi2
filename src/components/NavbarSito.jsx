import React from 'react';
import { Link } from "react-router-dom";
import { Navbar, Nav, Container } from 'react-bootstrap';

function NavbarSito(props) {
    return (
        <Navbar expand="lg" className="navbar-light">
        <Container fluid>
            <Link to="/" className="navbar-brand fs-4">Scambi</Link>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="navbarSupportedContent">
            <Nav>
                <li className="nav-item">
                    {props.auth ? <Link to="/" className="nav-link">Annunci</Link> : <small className="nav-link">gasquemais</small>}
                </li>
                <li className="nav-item">
                    {props.auth ? <Link to="/contatti" className="nav-link">Contatti</Link> : <p></p>}
                </li>
                <li className="nav-item">
                    {props.auth ? <Link to="/" className="nav-link" onClick={() =>  props.setAuth(false)}>Logout</Link> : <p></p>}
                </li>
            </Nav>
            </Navbar.Collapse>
        </Container>
        </Navbar>
    );
}

export default NavbarSito;