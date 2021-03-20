import { Link } from 'react-router-dom';
import React, { useState } from 'react';
import { Navbar, Nav } from "react-bootstrap";



const UberNavbar = () => {
    //state to update the selection on navbar
    const [current, setCurrent] = useState('Home');
    return (
        <Navbar className="bg-dark" variant='dark' expand="lg">
            <Navbar.Brand as={Link} to="/" onClick={(e) => { setCurrent("home") }}>Uber</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="d-flex w-100" activeKey={current} onSelect={(e) => { setCurrent(e.eventKey) }}>
                    <Nav.Link as={Link} eventKey="home" to="/" className="btn">Home</Nav.Link>
                    <Nav.Link as={Link} eventKey="rides" to="/rides" className="btn">Rides</Nav.Link>
                    <Nav.Link as={Link} eventKey="testHealth" to="/testHealth" className="btn">Test Health</Nav.Link>
                    <Nav.Link as={Link} eventKey="testComms" to="/testComms" className="btn">Test Comms</Nav.Link>
                    <Nav.Link as={Link} eventKey="logout" to="/logout" className="btn ml-auto">Logout</Nav.Link>
                </Nav>
            </Navbar.Collapse>
        </Navbar>
    );
}
export default UberNavbar;