import { Link } from 'react-router-dom';
import React, { useState, useContext } from 'react';
import { Navbar, Nav, Button } from "react-bootstrap";

import { useHistory } from "react-router-dom";
import Cookies from "js-cookie";
import UserContext from "../../context/UserContext";

const UberNavbar = () => {
    const { setIsAuthenticated } = useContext(UserContext);
    //state to update the selection on navbar
    const [current, setCurrent] = useState('Book Ride');
    const history = useHistory();
    const logout = (e) => {
        e.preventDefault();
        Cookies.remove("jwt");
        setIsAuthenticated(false);
        history.push("/login");
    }
    return (
        <Navbar className="bg-dark px-0" variant='dark' expand="lg">
            <Navbar.Brand as={Link} to="/" onClick={(e) => { setCurrent("home") }}>Uber</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="d-flex w-100" activeKey={current} onSelect={(e) => { setCurrent(e.eventKey) }}>
                    <Nav.Link as={Link} eventKey="Book Ride" to="/" className="btn">Home</Nav.Link>
                    <Nav.Link as={Link} eventKey="rides" to="/rides" className="btn">Rides</Nav.Link>
                    <Nav.Link as={Link} eventKey="buses" to="/buses" className="btn">Admin</Nav.Link>
                </Nav>
                <Button onClick={logout} className="btn-light ml-auto">Logout</Button>
            </Navbar.Collapse>
        </Navbar>
    );
}
export default UberNavbar;