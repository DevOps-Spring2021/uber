import React, { useContext, useState } from "react";
import { Form, Button } from "react-bootstrap";
import axios from "axios";
import {useHistory} from 'react-router-dom';
import Cookies from "js-cookie";
import UserContext from "../../context/UserContext";
const Login = () => {
    const {setIsAuthenticated} = useContext(UserContext);
    const history = useHistory();
    const [isSignUp, setIsSignUp] = useState(false);
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [firstName, setfirstName] = useState('');
    const [lastName, setlastName] = useState('');
    const handleSubmit = (e) => {
        e.preventDefault();
        if (isSignUp) {
            axios.post(`${process.env.REACT_APP_BACKEND_HOST}/register`, {
                firstName: firstName,
                lastName: lastName,
                password: password,
                username: username
            })
                .then(resp => { alert("Please login with new credentials"); history.push("/login") })
                .catch(err => alert("error while creating user"));
        }
        else {

            axios.post(`${process.env.REACT_APP_BACKEND_HOST}/login`, {
                password: password,
                username: username
            })
                .then(res => { Cookies.set('jwt', res.data.token); setIsAuthenticated(true); history.push("/") })
                .catch(err => alert("Please enter valid credentials"));
        }
    }
    return (
            <div className="login-div">
                <Form onSubmit={handleSubmit}>
                    <div className="mb-2">
                        <Button onClick={() => { setIsSignUp(false) }} className={`${isSignUp ? 'btn-light' : 'btn-dark'} w-50 rounded-0`}>Login</Button>
                        <Button onClick={() => { setIsSignUp(true) }} className={`${isSignUp ? 'btn-dark' : 'btn-light'} w-50 rounded-0`}>SignUp</Button>
                    </div>
                    <div>
                        <Form.Group>
                            <Form.Group controlId="email">
                                <Form.Control
                                    type="email"
                                    className="rounded-0"
                                    value={username}
                                    onChange={(e) => { setUsername(e.target.value) }}
                                    placeholder="Enter Email"
                                    required />
                                <Form.Text className="text-muted">
                                    We'll never share your email with anyone else.
                            </Form.Text>
                            </Form.Group>
                            <Form.Group controlId="password">
                                <Form.Control
                                    type="password"
                                    className="rounded-0"
                                    value={password}
                                    onChange={(e) => { setPassword(e.target.value) }}
                                    placeholder="Enter Password"
                                    required />
                                <Form.Text className="text-muted">
                                    Password is protected with end to end encryption
                            </Form.Text>
                            </Form.Group>
                            {isSignUp && (<div><Form.Group controlId="firstName">
                                <Form.Control
                                    type="text"
                                    className="rounded-0"
                                    value={firstName}
                                    onChange={(e) => { setfirstName(e.target.value) }}
                                    placeholder="First Name"
                                    required />
                            </Form.Group>
                                <Form.Group controlId="lastName">
                                    <Form.Control
                                        type="text"
                                        className="rounded-0"
                                        value={lastName}
                                        onChange={(e) => { setlastName(e.target.value) }}
                                        placeholder="Last name"
                                        required />
                                </Form.Group>
                            </div>)}
                        </Form.Group>
                    </div>
                    <div>
                        <Button type="submit" className="bg-dark w-100 rounded-0">{isSignUp ? 'Signup' : 'Login'}</Button>
                    </div>
                </Form>
            </div>
    )
}

export default Login;